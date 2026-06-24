/* About — portrait placeholder + bio + skills matrix + languages.
   Composes Card / Tag / SpecList / SectionLabel / Annotation. */
const { Card, Tag, SpecList, SectionLabel, Annotation } = window.MauriceDPpenDesignSystem_3628c1;

function About() {
  const SKILLS = window.SKILLS;
  const LANGUAGES = window.LANGUAGES;
  return (
    <section id="about" className="section">
      <SectionLabel index="04" accent>About</SectionLabel>
      <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 'clamp(40px, 6vw, 88px)', marginTop: 64, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="bp-grid" style={{
            position: 'relative', aspectRatio: '4 / 5', border: '1.5px solid var(--ink-0)',
            background: 'var(--paper-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
              Portrait
            </span>
            <span style={{ position: 'absolute', bottom: 10, left: 12, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.08em' }}>
              IMG / 0.8MP
            </span>
          </div>
          <Card variant="ink" style={{ padding: 18 }}>
            <SpecList items={[
              { key: 'Based', value: 'Bern, CH' },
              { key: 'Exp', value: '7 yrs' },
              { key: 'Langs', value: 'DE · EN · FR' },
              { key: 'Status', value: 'Open Q3' },
            ]} dense />
          </Card>
        </div>

        <div>
          <p style={{ margin: 0, fontSize: 24, lineHeight: 1.45, letterSpacing: '-0.01em', color: 'var(--ink-0)', maxWidth: '38ch', fontWeight: 500 }}>
            I'm a fullstack and DevOps engineer who treats security as a design
            constraint, not an afterthought.
          </p>
          <p style={{ margin: '22px 0 0', fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '58ch' }}>
            Seven years spanning incident response, platform engineering, and
            product. I like the seam where reliability meets adversarial thinking —
            the questions that start with "what happens when this fails, and who's
            trying to make it fail?"
          </p>

          <Annotation label="Stack matrix" tone="accent" corner="tl" style={{ marginTop: 40 }}>
            <div className="skill-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
              {Object.entries(SKILLS).map(([group, items]) => (
                <div key={group}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 10 }}>
                    {group}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                    {items.map((t) => <Tag key={t} size="sm">{t}</Tag>)}
                  </div>
                </div>
              ))}
            </div>
          </Annotation>

          <div style={{ marginTop: 40 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 18 }}>
              Languages
            </div>
            <div className="lang-row" style={{ display: 'flex', gap: 'clamp(28px, 5vw, 72px)', flexWrap: 'wrap' }}>
              {LANGUAGES.map((l) => (
                <div key={l.lang}>
                  <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em', color: 'var(--ink-0)' }}>{l.lang}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-2)', marginTop: 4 }}>{l.level}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { About });
