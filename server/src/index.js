/* Secure contact API for the portfolio.
   Pipeline per request: CORS -> helmet -> JSON cap -> rate limit -> validate
   -> spam gates -> email + JSONL backup. Bots are answered with a quiet 200. */
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { createHash } from 'node:crypto';

import { config } from './config.js';
import { validateContact } from './validate.js';
import { issueToken, verifyToken } from './token.js';
import { sendContactMail, verifyMailer } from './mailer.js';
import { storeMessage, pruneStore } from './store.js';

const app = express();

// Behind a reverse proxy: needed so req.ip is the real client, not the proxy.
app.set('trust proxy', config.trustProxy);
app.disable('x-powered-by');

app.use(helmet());

// Lock cross-origin access to the known portfolio origin(s).
app.use(
  cors({
    origin(origin, cb) {
      // Allow same-origin / curl (no Origin header) and the configured list.
      if (!origin || config.allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error('Origin not allowed'));
    },
    methods: ['POST', 'GET'],
    maxAge: 86400,
  }),
);

// Small body cap — a contact form never needs more than this, and it blunts
// memory-exhaustion payloads.
app.use(express.json({ limit: '16kb' }));

// Salt the IP before hashing so stored records hold a pseudonymous token, not
// a raw address (GDPR data minimization). Salt rotates per-deploy if unset.
const ipSalt = process.env.IP_SALT || `${config.env}:${config.port}`;
const hashIp = (ip) => createHash('sha256').update(ipSalt + (ip || '')).digest('hex').slice(0, 16);

const contactLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, errors: [{ field: 'form', message: 'Too many messages. Please try again later.' }] },
});

// Lighter limit on token issuance — one per form view, with headroom for reloads.
const tokenLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max * 6,
  standardHeaders: true,
  legacyHeaders: false,
});

app.get('/health', (_req, res) => res.json({ ok: true, env: config.env }));

// Issue a signed, expiring form token for the client to return on submit.
app.get('/api/form-token', tokenLimiter, (_req, res) => res.json({ token: issueToken() }));

app.post('/api/contact', contactLimiter, async (req, res) => {
  const result = validateContact(req.body);

  if (!result.ok) {
    // Spam (honeypot): act successful so bots get no useful signal.
    if (result.silent) return res.status(200).json({ ok: true });
    return res.status(result.status).json({ ok: false, errors: result.errors });
  }

  // Server-authoritative timing + replay gate.
  const tok = verifyToken(result.data.token);
  if (!tok.ok) {
    // Too-fast looks like a bot: stay silent. Expired/reused/bad: ask to reload.
    if (tok.reason === 'too-fast') return res.status(200).json({ ok: true });
    return res
      .status(400)
      .json({ ok: false, errors: [{ field: 'form', message: 'Your form session expired. Please reload and try again.' }] });
  }

  const { name, email, subject, message } = result.data;
  const meta = { receivedAt: new Date().toISOString(), ipHash: hashIp(req.ip) };

  try {
    await sendContactMail({ name, email, subject, message, meta });
  } catch (err) {
    console.error('[contact] mail delivery failed:', err.message);
    return res
      .status(502)
      .json({ ok: false, errors: [{ field: 'form', message: 'Could not send right now. Please try again or email directly.' }] });
  }

  // Backup is best-effort and runs after a successful send. We record proof of
  // consent (DSGVO accountability) alongside the message.
  await storeMessage({ name, email, subject, message, consent: true, consentAt: meta.receivedAt, ...meta });

  return res.status(200).json({ ok: true });
});

// Generic JSON error handler — never leak stack traces to clients.
app.use((err, _req, res, _next) => {
  if (err?.message === 'Origin not allowed') {
    return res.status(403).json({ ok: false, errors: [{ field: 'origin', message: 'Origin not allowed' }] });
  }
  console.error('[error]', err?.message || err);
  return res.status(400).json({ ok: false, errors: [{ field: 'form', message: 'Bad request' }] });
});

app.listen(config.port, () => {
  console.log(`[contact-api] listening on :${config.port} (${config.env})`);
  console.log(`[contact-api] allowed origins: ${config.allowedOrigins.join(', ') || '(none)'}`);
  verifyMailer();
  // Enforce the retention window at boot, then daily while running.
  pruneStore();
  setInterval(() => pruneStore(), 24 * 60 * 60 * 1000).unref();
});
