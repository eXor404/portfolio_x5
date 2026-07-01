/* Central config — every tunable comes from the environment so no secret or
   host-specific value is ever committed. Sensible, safe defaults for local dev. */
import 'dotenv/config';
import { randomBytes } from 'node:crypto';

const bool = (v, fallback) => (v == null ? fallback : /^(1|true|yes|on)$/i.test(v));
const int = (v, fallback) => {
  const n = parseInt(v ?? '', 10);
  return Number.isFinite(n) ? n : fallback;
};

const isProd = (process.env.NODE_ENV || 'development') === 'production';

// Resolve a security secret. In production we NEVER fall back to a predictable
// value: a guessable IP salt makes the stored hash reversible (defeating the
// pseudonymization the privacy notice promises) and a guessable token secret
// lets bots forge form tokens and skip every spam gate. If the env var is
// missing in prod we mint a strong random one at boot (rotates per restart,
// which is fine — form tokens live ~1h and IP hashes need not survive reboots)
// and warn loudly. Dev/test keep a stable, readable default for convenience.
const resolveSecret = (value, devFallback) => {
  if (value) return value;
  if (isProd) {
    console.warn(
      `[config] a required secret was not set in the environment; generating a ` +
        `random one for this process. Set it explicitly for stable behaviour.`,
    );
    return randomBytes(32).toString('base64url');
  }
  return devFallback;
};

// Comma-separated allowlist of browser origins permitted to call the API.
const origins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: int(process.env.PORT, 8080),
  // The app sits behind a reverse proxy (compose/Traefik/nginx) in production,
  // so trust the first proxy hop to read the real client IP for rate limiting.
  trustProxy: int(process.env.TRUST_PROXY, 1),
  allowedOrigins: origins,

  // Spam thresholds.
  rateLimit: {
    windowMs: int(process.env.RATE_WINDOW_MS, 15 * 60 * 1000), // 15 min
    max: int(process.env.RATE_MAX, 5), // submissions per window per IP
  },
  // Reject forms submitted faster than a human could fill them (ms).
  minFillMs: int(process.env.MIN_FILL_MS, 2500),
  // Reject stale form tokens (ms) — limits replay of a captured timestamp.
  maxFormAgeMs: int(process.env.MAX_FORM_AGE_MS, 60 * 60 * 1000), // 1h

  // SMTP delivery. If unset, the server logs messages instead of sending
  // (handy for local dev without a mail account).
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: int(process.env.SMTP_PORT, 587),
    secure: bool(process.env.SMTP_SECURE, false), // true for port 465
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
  // Recipient/sender come from the environment — no address is committed to the
  // repo. Set MAIL_TO (and MAIL_FROM) in the deploy env.
  mail: {
    from: process.env.MAIL_FROM || 'portfolio@localhost',
    to: process.env.MAIL_TO || '',
  },

  // Append-only JSONL backup of every accepted message (set empty to disable).
  // Prod writes to the Docker volume at /data; dev keeps it inside the project.
  storeFile:
    process.env.STORE_FILE ??
    ((process.env.NODE_ENV || 'development') === 'production' ? '/data/messages.jsonl' : './data/messages.jsonl'),
  // DSGVO storage limitation: drop backup records older than this many days.
  // 0 disables pruning (keep forever).
  retentionDays: int(process.env.RETENTION_DAYS, 180),

  // Secret that pseudonymizes IPs before storage. Random per-process in prod if
  // unset, so a known salt can never make the hash reversible.
  ipSalt: resolveSecret(process.env.IP_SALT, `${process.env.NODE_ENV || 'development'}:dev-ip-salt`),
  // Secret that signs anti-spam form tokens. Prefers its own var, then IP_SALT,
  // then a random per-process value in prod (never a predictable default).
  formTokenSecret: resolveSecret(
    process.env.FORM_TOKEN_SECRET || process.env.IP_SALT,
    `${process.env.NODE_ENV || 'development'}:dev-form-token`,
  ),
};

export const smtpConfigured = Boolean(config.smtp.host && config.smtp.user);
