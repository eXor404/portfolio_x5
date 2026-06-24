/* Contact — split layout: big invite + mono channels left, form right.
   Interactive submit → success state. Composes Input / TextArea / Button. */
const { Input, TextArea, Button, SectionLabel, Badge } = window.MauriceDPpenDesignSystem_3628c1;

function Contact() {
  const [sent, setSent] = React.useState(false);
  const channels = [
    { icon: 'mail', label: 'maurice@daeppen.dev' },
    { icon: 'github', label: 'github.com/mdaeppen' },
    { icon: 'linkedin', label: 'in/maurice-daeppen' },
    { icon: 'key-round', label: 'PGP · 0xA1F4 9C22' },
  ];
  React.useEffect(() => { window.lucide && window.lucide.createIcons(); });

  return (
    <section id="contact" className="section bp-grid">
      <SectionLabel index="05" accent>Contact</SectionLabel>
      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 6vw, 88px)', marginTop: 64, alignItems: 'start' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(44px, 6vw, 84px)', lineHeight: 0.96, letterSpacing: '-0.04em', margin: 0, color: 'var(--ink-0)' }}>
            Let's build<br />something<br /><span style={{ color: 'var(--accent)' }}>solid.</span>
          </h2>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 28 }}>
            <Badge tone="ok" solid>Available Q3 2026</Badge>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-2)' }}>Replies &lt; 48h</span>
          </div>
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 2, borderTop: '1.5px solid var(--ink-0)' }}>
            {channels.map((c) => (
              <a key={c.label} href="#contact" style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '16px 4px',
                borderBottom: '1px solid var(--line-0)', color: 'var(--ink-1)', textDecoration: 'none',
                fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.02em',
              }}>
                <i data-lucide={c.icon} style={{ width: 17, height: 17, color: 'var(--accent)' }}></i>
                {c.label}
                <i data-lucide="arrow-up-right" style={{ width: 15, height: 15, marginLeft: 'auto', color: 'var(--ink-3)' }}></i>
              </a>
            ))}
          </div>
        </div>

        <div style={{ border: '1.5px solid var(--ink-0)', background: 'var(--surface-card)', padding: 28, boxShadow: 'var(--shadow-hard)' }}>
          {sent ? (
            <div style={{ padding: '48px 8px', textAlign: 'center' }}>
              <i data-lucide="check-circle-2" style={{ width: 40, height: 40, color: 'var(--ok)' }}></i>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 26, letterSpacing: '-0.02em', margin: '16px 0 8px' }}>Message sent</h3>
              <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 14 }}>I'll get back to you within 48 hours.</p>
              <Button variant="outline" mono style={{ marginTop: 24 }} onClick={() => setSent(false)}>Send another</Button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Input label="Name" placeholder="Ada Lovelace" required />
                <Input label="Email" type="email" placeholder="you@domain.com" required />
              </div>
              <Input label="Subject" placeholder="Platform engineering role" />
              <TextArea label="Message" rows={5} placeholder="What are you building, and where do I fit?" required />
              <Button variant="accent" size="lg" full type="submit"
                iconRight={<i data-lucide="send" style={{ width: 17, height: 17 }}></i>}>
                Send message
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Contact });
