/* Request validation + the honeypot heuristic. Strict shape/length via Zod.
   The timing gate now lives in token.js (server-signed), so it is no longer a
   forgeable client field here. */
import { z } from 'zod';

// Single-line fields (name, email, subject): strip ALL control chars including
// newlines. This is what stops CRLF email-header injection at the source.
const cleanLine = (s) =>
  s
    .replace(/[\x00-\x1F\x7F]/g, ' ') // control chars -> space
    .replace(/[ \t]{2,}/g, ' ')
    .trim();

// Multi-line body: keep newlines, normalize CRLF, drop other control chars,
// and collapse excessive blank-line runs.
const cleanBlock = (s) =>
  s
    .replace(/\r\n?/g, '\n')
    .replace(/[\x00-\x09\x0B-\x1F\x7F]/g, '') // strip controls but keep \n (\x0A)
    .replace(/\n{4,}/g, '\n\n\n')
    .trim();

export const contactSchema = z.object({
  name: z.string().transform(cleanLine).pipe(z.string().min(1, 'Name is required').max(120)),
  email: z
    .string()
    .transform((s) => cleanLine(s).toLowerCase())
    .pipe(z.string().email('A valid email is required').max(254)),
  subject: z.string().transform(cleanLine).pipe(z.string().max(160)).optional().default(''),
  message: z.string().transform(cleanBlock).pipe(z.string().min(10, 'Message is too short').max(5000)),
  // GDPR: explicit, unbundled consent to process the contact data.
  consent: z.literal(true, { errorMap: () => ({ message: 'Consent is required' }) }),
  // Server-signed form token (verified separately, see token.js).
  token: z.string().min(1, 'Form token missing').max(256),

  // Honeypot: a field hidden from humans. We ACCEPT any value here (so the
  // schema never reveals it as the trip wire) and drop it silently below.
  company: z.string().max(200).optional().default(''),
});

// Returns { ok: true, data } or { ok: false, status, errors } or
// { ok: false, silent: true } when we want to swallow a bot quietly.
export function validateContact(body) {
  const parsed = contactSchema.safeParse(body ?? {});
  if (!parsed.success) {
    const errors = parsed.error.issues.map((i) => ({ field: i.path.join('.'), message: i.message }));
    return { ok: false, status: 400, errors };
  }
  const data = parsed.data;

  // Honeypot tripped — report success upstream so the bot learns nothing.
  if (data.company) return { ok: false, status: 200, silent: true };

  return { ok: true, data };
}
