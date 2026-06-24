/* Writing — full articles page. Mono index rows + tags, publication ledger.
   Composes Tag / SectionLabel. Reads window.ARTICLES. */
const { Tag, SectionLabel } = window.MauriceDPpenDesignSystem_3628c1;

function Writing() {
  const articles = window.ARTICLES;
  return (
    <section id="writing" className="section bp-ruled">
      <SectionLabel index="02" accent>Writing</SectionLabel>
      <p style={{ maxWidth: '54ch', margin: '32px 0 56px', fontSize: 18, lineHeight: 1.6, color: 'var(--ink-1)' }}>
        Field notes on building and breaking systems. Long-form, no fluff.
      </p>
      <div style={{ borderTop: '1.5px solid var(--ink-0)' }}>
        {articles.map((a) => (
          <a key={a.n} href="#" className="article-row" style={{
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
    </section>
  );
}

Object.assign(window, { Writing });
