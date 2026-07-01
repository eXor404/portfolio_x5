/* /contact — split invite + channels left, interactive form right.
   The form POSTs to the secure contact backend (see /server). */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Linkedin, KeyRound, ArrowUpRight, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { Input, TextArea, Button, Badge, RotatingWord } from '../ds/index.js';
import { CONTACT_CHANNELS } from '../data.js';

const ICONS = { mail: Mail, github: Github, linkedin: Linkedin, 'key-round': KeyRound };

// Same-origin in production (reverse proxy); overridable for split deploys.
const API_BASE = import.meta.env.VITE_CONTACT_API || '';

const EMPTY = { name: '', email: '', subject: '', message: '', consent: false, company: '' };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errors, setErrors] = useState({}); // field -> message
  const [formError, setFormError] = useState('');
  // Server-signed token gating spam/timing; fetched on mount and after a reset.
  const token = useRef('');

  const fetchToken = () =>
    fetch(`${API_BASE}/api/form-token`)
      .then((r) => r.json())
      .then((d) => { token.current = d.token || ''; })
      .catch(() => { token.current = ''; });

  useEffect(() => { fetchToken(); }, []);

  // Shorten the subject placeholder on phones so it doesn't get clipped.
  const [isNarrow, setIsNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 540px)');
    const sync = () => setIsNarrow(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setFormError('');
    setStatus('idle');
    fetchToken();
  };

  // Cheap client-side checks so obvious mistakes never hit the network. The
  // server re-validates everything regardless.
  function clientValidate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'A valid email is required';
    if (form.message.trim().length < 10) e.message = 'Please write at least a sentence';
    if (!form.consent) e.consent = 'Please tick the consent box';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'sending') return;

    const clientErrors = clientValidate();
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      setFormError('Please fix the highlighted fields.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrors({});
    setFormError('');
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, token: token.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus('sent');
        return;
      }
      // Map field errors back onto the inputs; keep a general line too.
      const fieldErrs = {};
      (data.errors || []).forEach((er) => {
        if (er.field && er.field !== 'form') fieldErrs[er.field] = er.message;
      });
      setErrors(fieldErrs);
      const general = (data.errors || []).find((er) => !er.field || er.field === 'form');
      setFormError(general?.message || (Object.keys(fieldErrs).length ? 'Please fix the highlighted fields.' : 'Something went wrong. Please try again.'));
      setStatus('error');
      fetchToken(); // token may be spent/expired; get a fresh one for the retry
    } catch {
      setFormError('Network error. Please check your connection or email directly.');
      setStatus('error');
      fetchToken();
    }
  }

  const sending = status === 'sending';

  return (
    <>
      <PageHeader
        index="04" path="/contact" title="Get in " accentWord="touch."
        lead="Hiring, collaborating, or just want to compare notes on breaking systems? The inbox is open."
        meta={[['Status', 'Open to interesting work'], ['Reply', '< 48h'], ['Base', 'Bern, CH']]}
      />

      <section className="shell section" style={{ paddingTop: 'clamp(48px, 7vh, 88px)' }}>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 6vw, 88px)', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(44px, 6vw, 84px)', lineHeight: 0.96, letterSpacing: '-0.04em', color: 'var(--ink-0)' }}>
              Let's build<br />something<br /><RotatingWord />
            </h2>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 28 }}>
              <Badge tone="ok" solid>Open to interesting work</Badge>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-2)' }}>Replies &lt; 48h</span>
            </div>
            <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 2, borderTop: '1.5px solid var(--ink-0)' }}>
              {CONTACT_CHANNELS.map((c) => {
                const Icon = ICONS[c.icon];
                return (
                  <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '16px 4px',
                    borderBottom: '1px solid var(--line-0)', color: 'var(--ink-1)',
                    fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.02em',
                  }}>
                    <Icon size={17} style={{ color: 'var(--accent)' }} />
                    {c.label}
                    <ArrowUpRight size={15} style={{ marginLeft: 'auto', color: 'var(--ink-3)' }} />
                  </a>
                );
              })}
            </div>
          </div>

          <div style={{ border: '1.5px solid var(--ink-0)', background: 'var(--surface-card)', padding: 28, boxShadow: 'var(--shadow-hard)' }}>
            {status === 'sent' ? (
              <div style={{ padding: '48px 8px', textAlign: 'center' }}>
                <CheckCircle2 size={40} style={{ color: 'var(--ok)' }} />
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 26, letterSpacing: '-0.02em', margin: '16px 0 8px' }}>Message sent</h3>
                <p style={{ color: 'var(--ink-2)', fontSize: 14 }}>I'll get back to you within 48 hours.</p>
                <Button variant="outline" mono style={{ marginTop: 24 }} onClick={reset}>Send another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div className="field-row">
                  <Input label="Name" placeholder="Pete Mitchell" required autoComplete="name"
                    value={form.name} onChange={set('name')} error={errors.name} disabled={sending} aria-invalid={!!errors.name} />
                  <Input label="Email" type="email" placeholder="you@domain.com" required autoComplete="email"
                    value={form.email} onChange={set('email')} error={errors.email} disabled={sending} aria-invalid={!!errors.email} />
                </div>
                <Input label="Subject" placeholder={isNarrow ? 'You seem pretty awesome :D' : 'You seem pretty awesome, wanna connect? :D'}
                  value={form.subject} onChange={set('subject')} error={errors.subject} disabled={sending} />
                <TextArea label="Message" rows={5} placeholder="How's it going?" required
                  value={form.message} onChange={set('message')} error={errors.message} disabled={sending} aria-invalid={!!errors.message} />

                {/* Honeypot — hidden from humans, irresistible to bots. */}
                <input
                  type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"
                  value={form.company} onChange={set('company')}
                  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                />

                <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer',
                  fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.5, color: 'var(--ink-2)' }}>
                  <input type="checkbox" checked={form.consent} onChange={set('consent')} disabled={sending}
                    style={{ marginTop: 2, width: 16, height: 16, accentColor: 'var(--accent)', flexShrink: 0 }} />
                  <span>
                    I agree that my details may be used to respond to my enquiry. See the{' '}
                    <Link to="/privacy" className="ul-link" style={{ color: 'var(--ink-1)' }}>privacy notice</Link>.
                  </span>
                </label>
                {errors.consent && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--danger)', marginTop: -8 }}>{errors.consent}</span>
                )}

                {formError && (
                  <div role="alert" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px',
                    border: '1.5px solid var(--danger)', borderRadius: 'var(--radius-control)',
                    fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--danger)' }}>
                    <AlertCircle size={15} style={{ flexShrink: 0 }} />{formError}
                  </div>
                )}

                <Button variant="accent" size="lg" full type="submit" disabled={sending}
                  iconRight={sending ? <Loader2 size={17} className="spin" /> : <Send size={17} />}>
                  {sending ? 'Sending…' : 'Send message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
