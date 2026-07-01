/* Integration tests for the contact API. Boots the real server in a child
   process with test-friendly env, then exercises every security gate over HTTP.
   Run: npm test (from server/). Exits non-zero on the first failure. */
import { spawn } from 'node:child_process';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const PORT = 8099;
const ORIGIN = 'http://localhost:5173';
const BASE = `http://localhost:${PORT}`;

let passed = 0;
const failures = [];
function check(name, cond) {
  if (cond) { passed++; console.log(`  ok  ${name}`); }
  else { failures.push(name); console.log(`FAIL  ${name}`); }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function startServer(env) {
  const child = spawn('node', ['src/index.js'], {
    env: { ...process.env, NODE_ENV: 'test', ALLOWED_ORIGINS: ORIGIN, MIN_FILL_MS: '300', STORE_FILE: '', SMTP_HOST: '', ...env },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('server did not start')), 5000);
    child.stdout.on('data', (d) => { if (d.toString().includes('listening')) { clearTimeout(t); resolve(child); } });
  });
}

async function post(body, origin = ORIGIN, port = PORT) {
  const res = await fetch(`http://localhost:${port}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: origin },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json };
}
const getToken = async (port = PORT) => (await (await fetch(`http://localhost:${port}/api/form-token`)).json()).token;
const base = () => ({ name: 'Real Person', email: 'real@person.com', subject: 'Hi', message: 'A long enough message.', consent: true });

async function main() {
  const dir = await mkdtemp(join(tmpdir(), 'contact-test-'));
  const storeFile = join(dir, 'messages.jsonl');

  // Main functional server: high rate limit so the gate under test is the one
  // each case targets, not the limiter.
  const child = await startServer({ PORT: String(PORT), RATE_MAX: '1000', STORE_FILE: storeFile });

  try {
    // health
    const h = await fetch(`${BASE}/health`);
    check('health returns ok', h.status === 200 && (await h.json()).ok === true);

    // valid submit (wait past MIN_FILL_MS)
    let tok = await getToken();
    await sleep(400);
    let r = await post({ ...base(), token: tok });
    check('valid submission accepted', r.status === 200 && r.json.ok === true);

    // honeypot -> silent ok
    tok = await getToken();
    await sleep(400);
    r = await post({ ...base(), token: tok, company: 'Acme' });
    check('honeypot silently accepted (200 ok)', r.status === 200 && r.json.ok === true);

    // too-fast -> silent ok, not stored
    tok = await getToken();
    r = await post({ ...base(), token: tok }); // no sleep
    check('too-fast silently accepted (200 ok)', r.status === 200 && r.json.ok === true);

    // reused token -> rejected
    tok = await getToken();
    await sleep(400);
    await post({ ...base(), token: tok });
    r = await post({ ...base(), token: tok });
    check('reused token rejected (400)', r.status === 400 && r.json.ok === false);

    // forged/garbage token -> rejected
    await sleep(400);
    r = await post({ ...base(), token: 'not.a.real-token' });
    check('forged token rejected (400)', r.status === 400);

    // bad email
    tok = await getToken();
    await sleep(400);
    r = await post({ ...base(), email: 'nope', token: tok });
    check('bad email rejected (400)', r.status === 400 && r.json.errors?.some((e) => e.field === 'email'));

    // missing consent
    tok = await getToken();
    await sleep(400);
    r = await post({ ...base(), consent: false, token: tok });
    check('missing consent rejected (400)', r.status === 400 && r.json.errors?.some((e) => e.field === 'consent'));

    // CRLF injection sanitized in stored record
    tok = await getToken();
    await sleep(400);
    await post({ ...base(), name: 'Eve\r\nBcc: victim@evil.com', email: 'eve@x.com', token: tok });
    const stored = (await readFile(storeFile, 'utf8')).trim().split('\n').map((l) => JSON.parse(l));
    const eve = stored.find((m) => m.email === 'eve@x.com');
    check('CRLF stripped from name', !!eve && !/[\r\n]/.test(eve.name) && eve.name.includes('Eve'));

    // bad origin -> 403
    r = await post({ ...base(), token: await getToken() }, 'http://evil.com');
    check('disallowed origin rejected (403)', r.status === 403);

  } finally {
    child.kill();
  }

  // Rate limiting: dedicated server with a low cap on its own port.
  const rlPort = PORT + 1;
  const rlChild = await startServer({ PORT: String(rlPort), RATE_MAX: '3' });
  try {
    let got429 = false;
    for (let i = 0; i < 8; i++) {
      const rr = await post({ ...base(), email: `rl${i}@x.com`, token: await getToken(rlPort) }, ORIGIN, rlPort);
      if (rr.status === 429) { got429 = true; break; }
    }
    check('rate limit enforced (429)', got429);
  } finally {
    rlChild.kill();
  }

  // Retention pruning: seed an old + a recent record, boot with RETENTION_DAYS=1,
  // and confirm only the recent record survives.
  const retFile = join(dir, 'retention.jsonl');
  const old = new Date(Date.now() - 3 * 86400_000).toISOString();
  const recent = new Date().toISOString();
  await writeFile(
    retFile,
    JSON.stringify({ name: 'Old', email: 'old@x.com', receivedAt: old }) + '\n' +
      JSON.stringify({ name: 'New', email: 'new@x.com', receivedAt: recent }) + '\n',
    'utf8',
  );
  const retChild = await startServer({ PORT: String(PORT + 2), STORE_FILE: retFile, RETENTION_DAYS: '1' });
  try {
    await sleep(500); // let the boot prune run
    const remaining = (await readFile(retFile, 'utf8')).trim().split('\n').filter(Boolean).map((l) => JSON.parse(l));
    check('retention prunes old record only', remaining.length === 1 && remaining[0].email === 'new@x.com');
  } finally {
    retChild.kill();
  }

  console.log(`\n${passed} passed, ${failures.length} failed`);
  if (failures.length) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
