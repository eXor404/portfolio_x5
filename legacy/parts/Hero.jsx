/* Hero — Swiss poster. Three directions: poster (stacked name), statement
   (big sentence), split (name + meta rail). Maximal whitespace. */
const { Button, Tag } = window.MauriceDPpenDesignSystem_3628c1;

const HERO_KICKER = window.HERO.kicker;
const HERO_TAGLINE = window.HERO.tagline;
const HERO_STACK = window.HERO.stack;

function MetaRail() {
  return (
    <div className="hero-meta-rail" style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
      fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
      color: 'var(--ink-2)',
    }}>
      <span>Portfolio / 2026</span>
      <span className="hide-sm">46.9480° N · 7.4474° E</span>
      <span>Bern — CH</span>
    </div>
  );
}

function HeroCtas() {
  return (
    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
      <a href="work.html" style={{ textDecoration: 'none' }}>
        <Button variant="accent" size="lg"
          iconRight={<i data-lucide="arrow-right" style={{ width: 18, height: 18 }}></i>}>
          View selected work
        </Button>
      </a>
      <a href="contact.html" style={{ textDecoration: 'none' }}>
        <Button variant="outline" size="lg" mono>Get in touch</Button>
      </a>
    </div>
  );
}

function StackRow() {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 14 }}>
        Stack
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {HERO_STACK.map((t) => <Tag key={t} size="sm">{t}</Tag>)}
      </div>
    </div>
  );
}

function Hero({ direction }) {
  // POSTER — stacked name, kicker above, tagline + ctas + stack below
  if (direction === 'poster') {
    return (
      <section id="top" className="hero bp-grid" style={{ paddingBottom: 'clamp(80px, 12vh, 160px)' }}>
        <MetaRail />
        <div style={{ marginTop: 'clamp(64px, 12vh, 132px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-2)', letterSpacing: '0.06em', marginBottom: 26 }}>
            {HERO_KICKER}
          </div>
          <h1 className="poster-name" style={{
            fontFamily: 'var(--font-sans)', fontWeight: 700,
            fontSize: 'clamp(64px, 13vw, 188px)', lineHeight: 0.9, letterSpacing: '-0.045em',
            margin: 0, color: 'var(--ink-0)',
          }}>
            Maurice<br />Däppen<span style={{ color: 'var(--accent)' }}>.</span>
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', maxWidth: 1100, marginTop: 'clamp(40px, 6vh, 72px)' }}>
            <div className="hero-lower" style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.9fr', gap: 'clamp(40px, 6vw, 96px)', alignItems: 'end' }}>
              <div>
                <p style={{ maxWidth: '42ch', margin: '0 0 36px', fontSize: 19, lineHeight: 1.6, color: 'var(--ink-1)' }}>
                  {HERO_TAGLINE}
                </p>
                <HeroCtas />
              </div>
              <StackRow />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // STATEMENT — huge sentence as the poster, name + role in mono meta
  if (direction === 'statement') {
    return (
      <section id="top" className="hero bp-dots" style={{ paddingBottom: 'clamp(80px, 12vh, 160px)' }}>
        <MetaRail />
        <div style={{ marginTop: 'clamp(72px, 14vh, 150px)', maxWidth: 1180 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-2)', letterSpacing: '0.06em', marginBottom: 30 }}>
            Maurice Däppen — {HERO_KICKER}
          </div>
          <h1 style={{
            fontFamily: 'var(--font-sans)', fontWeight: 700,
            fontSize: 'clamp(40px, 6.6vw, 104px)', lineHeight: 1.0, letterSpacing: '-0.04em',
            margin: 0, color: 'var(--ink-0)', maxWidth: '15ch',
          }}>
            I build &amp; secure resilient systems<span style={{ color: 'var(--accent)' }}>.</span>
          </h1>
          <p style={{ maxWidth: '54ch', margin: '40px 0 44px', fontSize: 19, lineHeight: 1.6, color: 'var(--ink-1)' }}>
            From CI/CD pipelines to zero-trust gateways — and I think hard about how they break.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'flex-end' }}>
            <HeroCtas />
            <StackRow />
          </div>
        </div>
      </section>
    );
  }

  // SPLIT — name left, meta column right, stack full width below
  return (
    <section id="top" className="hero bp-grid" style={{ paddingBottom: 'clamp(80px, 12vh, 160px)' }}>
      <MetaRail />
      <div className="hero-split" style={{
        marginTop: 'clamp(64px, 12vh, 132px)', display: 'grid',
        gridTemplateColumns: '1.5fr 0.9fr', gap: 'clamp(40px, 6vw, 96px)', alignItems: 'start',
      }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-2)', letterSpacing: '0.06em', marginBottom: 24 }}>
            {HERO_KICKER}
          </div>
          <h1 className="poster-name" style={{
            fontFamily: 'var(--font-sans)', fontWeight: 700,
            fontSize: 'clamp(56px, 11vw, 156px)', lineHeight: 0.9, letterSpacing: '-0.045em',
            margin: 0, color: 'var(--ink-0)',
          }}>
            Maurice<br />Däppen<span style={{ color: 'var(--accent)' }}>.</span>
          </h1>
        </div>
        <div style={{ borderLeft: '1.5px solid var(--ink-0)', paddingLeft: 28, paddingTop: 6 }}>
          <p style={{ margin: '0 0 32px', fontSize: 18, lineHeight: 1.6, color: 'var(--ink-1)' }}>
            {HERO_TAGLINE}
          </p>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 32,
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.04em', color: 'var(--ink-2)',
            textTransform: 'uppercase',
          }}>
            {[['Based', 'Bern, Switzerland'], ['Focus', 'Platforms & security'], ['Status', 'Open to work']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line-0)' }}>
                <span style={{ color: 'var(--ink-3)' }}>{k}</span><span style={{ color: 'var(--ink-1)' }}>{v}</span>
              </div>
            ))}
          </div>
          <HeroCtas />
        </div>
      </div>
      <div style={{ marginTop: 'clamp(48px, 7vh, 88px)' }}>
        <StackRow />
      </div>
    </section>
  );
}

Object.assign(window, { Hero });
