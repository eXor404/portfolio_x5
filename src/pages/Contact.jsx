/* /contact — split invite + channels left, interactive form right. */
import { useState } from 'react';
import { Mail, Github, Linkedin, KeyRound, ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { Input, TextArea, Button, Badge, RotatingWord } from '../ds/index.js';
import { CONTACT_CHANNELS } from '../data.js';

const ICONS = { mail: Mail, github: Github, linkedin: Linkedin, 'key-round': KeyRound };

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader
        index="05" path="/contact" title="Get in " accentWord="touch."
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
            {sent ? (
              <div style={{ padding: '48px 8px', textAlign: 'center' }}>
                <CheckCircle2 size={40} style={{ color: 'var(--ok)' }} />
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 26, letterSpacing: '-0.02em', margin: '16px 0 8px' }}>Message sent</h3>
                <p style={{ color: 'var(--ink-2)', fontSize: 14 }}>I'll get back to you within 48 hours.</p>
                <Button variant="outline" mono style={{ marginTop: 24 }} onClick={() => setSent(false)}>Send another</Button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div className="field-row">
                  <Input label="Name" placeholder="Pete Mitchell" required />
                  <Input label="Email" type="email" placeholder="you@domain.com" required />
                </div>
                <Input label="Subject" placeholder="You seem pretty awesome, wanna connect? :D" />
                <TextArea label="Message" rows={5} placeholder="How's it going?" required />
                <Button variant="accent" size="lg" full type="submit" iconRight={<Send size={17} />}>
                  Send message
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
