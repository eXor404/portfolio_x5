/* Email delivery via SMTP. When SMTP isn't configured (local dev) we log the
   message instead of throwing, so the endpoint still works end-to-end. */
import nodemailer from 'nodemailer';
import { config, smtpConfigured } from './config.js';

let transporter = null;
if (smtpConfigured) {
  transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    // On non-secure ports (587) demand STARTTLS rather than accepting it only
    // if offered — the privacy notice promises delivery over an encrypted
    // connection, so refuse to send in the clear.
    requireTLS: true,
    auth: { user: config.smtp.user, pass: config.smtp.pass },
  });
}

// Verify SMTP credentials at boot so misconfig surfaces in logs immediately
// rather than on the first visitor's submission.
export async function verifyMailer() {
  if (!transporter) {
    console.warn('[mailer] SMTP not configured — messages will be logged, not emailed.');
    return;
  }
  if (!config.mail.to) {
    console.warn('[mailer] MAIL_TO is not set — sends will fail. Set MAIL_TO in the environment.');
  }
  try {
    await transporter.verify();
    console.log('[mailer] SMTP connection verified.');
  } catch (err) {
    console.error('[mailer] SMTP verification failed:', err.message);
  }
}

export async function sendContactMail({ name, email, subject, message, meta }) {
  const subjectLine = `[Portfolio] ${subject || 'New message'} — ${name}`;
  const text = [
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Subject: ${subject || '(none)'}`,
    `When:    ${meta.receivedAt}`,
    `IP hash: ${meta.ipHash}`,
    '',
    '--- Message ---',
    message,
  ].join('\n');

  if (!transporter) {
    console.log('[mailer] (dev) would send:\n' + text);
    return { delivered: false, dev: true };
  }

  await transporter.sendMail({
    from: config.mail.from,
    to: config.mail.to,
    // Let the owner hit "reply" and answer the visitor directly. The visitor's
    // address is already sanitized to a single line by validation.
    replyTo: `${name} <${email}>`,
    subject: subjectLine,
    text,
  });
  return { delivered: true };
}
