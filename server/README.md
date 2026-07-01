# Portfolio Contact API

Small, hardened Express service that receives contact-form submissions, emails
them to the site owner, and keeps a local JSONL backup. Designed to run in
Docker behind a TLS-terminating reverse proxy.

## How messages reach you

1. Visitor submits the form → browser `POST`s JSON to `/api/contact`.
2. The API validates + spam-checks the payload.
3. On success it **emails you** (`MAIL_TO`) via SMTP with the visitor set as
   `Reply-To`, so you just hit reply.
4. A copy is appended to `STORE_FILE` (`/data/messages.jsonl`) as a backup.

No database, no dashboard — your inbox is the inbox.

## Security model

| Layer | What it does |
|-------|--------------|
| `helmet` | Secure HTTP response headers |
| CORS allowlist | Only your portfolio origin(s) may call the API |
| Rate limit | 5 submissions / 15 min / IP (configurable) |
| Honeypot field | Hidden `company` field; any value ⇒ silent drop |
| Signed form token | Server-issued HMAC token, expiring + single-use ⇒ no forged/replayed timing |
| Timing gate | Rejects forms filled faster than a human (enforced via the token) |
| Body cap (16 kb) | Blocks oversized payloads |
| Input sanitization | Strips control chars ⇒ no CRLF email-header injection |
| Zod schema | Strict types + length bounds on every field |
| Non-root container | Runs as `node`, read-only FS, `no-new-privileges` |
| IP pseudonymization | Stores a salted hash, never the raw IP (GDPR) |
| Retention pruning | Backup records past `RETENTION_DAYS` are deleted (GDPR storage limitation) |
| Consent proof | Each stored record carries `consent` + `consentAt` (GDPR accountability) |

Bots that trip the honeypot or timing gate get a `200 { ok: true }` so they
learn nothing.

## Run locally

```bash
cd server
cp .env.example .env        # leave SMTP_HOST empty for log-only dev mode
npm install
npm run dev                 # http://localhost:8080/health
```

In dev/log mode submissions are printed to the console instead of emailed.

## Run in Docker

```bash
cp server/.env.example server/.env   # fill in SMTP + ALLOWED_ORIGINS + IP_SALT
docker compose up -d --build
curl localhost:8080/health
```

## Configuration

All config is environment-driven — see `.env.example`. Key vars:
`ALLOWED_ORIGINS`, `SMTP_*`, `MAIL_TO`, `IP_SALT`, `RATE_MAX`.

## Run tests

```bash
cd server
npm test    # boots the server and exercises every gate over HTTP
```

## Endpoints

- `GET /health` → `{ ok: true }`
- `GET /api/form-token` → `{ token }` — fetch on form load, return it on submit.
- `POST /api/contact` → `{ ok: true }` on success, `{ ok: false, errors: [...] }`
  on validation failure.
