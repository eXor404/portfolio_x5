/* Signed form tokens. The browser fetches one when the form mounts and returns
   it on submit. Because the issue time is HMAC-signed by the server, a bot can
   no longer forge or replay the timing gate by faking a client timestamp.

   token = base64url(issuedAtMs) "." base64url(nonce) "." base64url(hmac)

   Single use is enforced in-memory for the token's lifetime, so a captured
   token cannot be replayed even within the validity window. */
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { config } from './config.js';

const SECRET = process.env.FORM_TOKEN_SECRET || process.env.IP_SALT || `${config.env}:form-token`;

const b64 = (buf) => Buffer.from(buf).toString('base64url');
const sign = (issuedAt, nonce) =>
  createHmac('sha256', SECRET).update(`${issuedAt}.${nonce}`).digest('base64url');

// Map of consumed token signature -> expiry ms. Swept lazily on use.
const consumed = new Map();
function sweep(now) {
  for (const [sig, exp] of consumed) if (exp <= now) consumed.delete(sig);
}

export function issueToken() {
  const issuedAt = Date.now();
  const nonce = b64(randomBytes(9));
  const mac = sign(issuedAt, nonce);
  return `${b64(String(issuedAt))}.${nonce}.${mac}`;
}

// Returns { ok: true } or { ok: false, reason }.
export function verifyToken(token) {
  if (typeof token !== 'string' || token.length > 256) return { ok: false, reason: 'missing' };
  const parts = token.split('.');
  if (parts.length !== 3) return { ok: false, reason: 'malformed' };

  const [issuedB64, nonce, mac] = parts;
  let issuedAt;
  try {
    issuedAt = parseInt(Buffer.from(issuedB64, 'base64url').toString('utf8'), 10);
  } catch {
    return { ok: false, reason: 'malformed' };
  }
  if (!Number.isFinite(issuedAt)) return { ok: false, reason: 'malformed' };

  // Constant-time signature check.
  const expected = sign(issuedAt, nonce);
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return { ok: false, reason: 'bad-signature' };

  const now = Date.now();
  const age = now - issuedAt;
  if (age < config.minFillMs) return { ok: false, reason: 'too-fast' };
  if (age > config.maxFormAgeMs) return { ok: false, reason: 'expired' };

  // Single use.
  sweep(now);
  if (consumed.has(mac)) return { ok: false, reason: 'reused' };
  consumed.set(mac, issuedAt + config.maxFormAgeMs);

  return { ok: true };
}
