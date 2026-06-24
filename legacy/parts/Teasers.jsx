/* Home teasers — curated subsets that link to the full pages. */
const { Tag, SectionLabel, Button } = window.MauriceDPpenDesignSystem_3628c1;

function MoreLink({ href, children }) {
  return (
    <a href={href} style={{
      fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
      color: 'var(--ink-1)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
      borderBottom: '1.5px solid var(--ink-0)', paddingBottom: 4,
    }}>
      {children} <i data-lucide="arrow-right" style={{ width: 15, height: 15 }}></i>
    </a>
  );
}

function WorkTeaser() {
  const projects = window.PROJECTS.slice(0, 3);
  return (
    <section className="section">
      <SectionLabel index="01" accent>Selected work</SectionLabel>
      <p style={{ maxWidth: '54ch', margin: '32px 0 64px', fontSize: 18, lineHeight: 1.6, color: 'var(--ink-1)' }}>
        A few systems I designed, shipped, and kept alive in production.
      </p>
      <div className="work-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        {projects.map((p) => <window.ProjectCard key={p.n} p={p} featured={p.featured} />)}
      </div>
      <div style={{ marginTop: 56, display: 'flex', justifyContent: 'flex-end' }}>
        <MoreLink href="work.html">View all projects</MoreLink>
      </div>
    </section>
  );
}

function WritingTeaser() {
  const articles = window.ARTICLES.slice(0, 2);
  return (
    <section className="section bp-ruled">
      <SectionLabel index="02" accent>Recent writing</SectionLabel>
      <div style={{ borderTop: '1.5px solid var(--ink-0)', marginTop: 48 }}>
        {articles.map((a) => (
          <a key={a.n} href="writing.html" className="article-row" style={{
            display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 'clamp(20px, 4vw, 56px)',
            alignItems: 'baseline', padding: 'clamp(28px, 4vh, 44px) 8px',
            borderBottom: '1px solid var(--line-0)', textDecoration: 'none', color: 'inherit',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)', letterSpacing: '0.04em', paddingTop: 6 }}>{a.n}</span>
            <div>
              <div style={{ display: 'flex', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 14 }}>
                <span>{a.date}</span><span>·</span><span>{a.read}</span>
              </div>
              <h3 className="article-title" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.025em', margin: '0 0 14px', color: 'var(--ink-0)', maxWidth: '22ch' }}>
                {a.title}
              </h3>
              <p style={{ margin: '0 0 18px', fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: '60ch' }}>{a.blurb}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {a.tags.map((t) => <Tag key={t} variant="outline" size="sm">{t}</Tag>)}
              </div>
            </div>
            <i data-lucide="arrow-up-right" style={{ width: 22, height: 22, color: 'var(--ink-1)', alignSelf: 'center' }}></i>
          </a>
        ))}
      </div>
      <div style={{ marginTop: 48, display: 'flex', justifyContent: 'flex-end' }}>
        <MoreLink href="writing.html">See all writing</MoreLink>
      </div>
    </section>
  );
}

function ContactCta() {
  return (
    <section className="section">
      <div style={{
        border: '1.5px solid var(--ink-0)', boxShadow: 'var(--shadow-hard)', background: 'var(--surface-card)',
        padding: 'clamp(36px, 6vw, 72px)', display: 'flex', flexWrap: 'wrap', gap: 32,
        alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>
            Available Q3 2026
          </div>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(32px, 4.5vw, 60px)', lineHeight: 1.0, letterSpacing: '-0.035em', margin: 0, color: 'var(--ink-0)' }}>
            Let's build something <span style={{ color: 'var(--accent)' }}>solid.</span>
          </h2>
        </div>
        <a href="contact.html" style={{ textDecoration: 'none' }}>
          <Button variant="accent" size="lg" iconRight={<i data-lucide="arrow-right" style={{ width: 18, height: 18 }}></i>}>
            Get in touch
          </Button>
        </a>
      </div>
    </section>
  );
}

Object.assign(window, { WorkTeaser, WritingTeaser, ContactCta });
