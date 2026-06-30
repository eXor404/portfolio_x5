/* /about — portrait + bio + values + skills matrix + languages. */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import { Card, Tag, SpecList, Annotation, SectionLabel } from '../ds/index.js';
import { SKILLS, LANGUAGES, VALUES, INTERESTS } from '../data.js';
// The map iframe itself lives in PersistentMap (mounted once, kept booted).
// Here we just expose a placeholder slot for it to position over.
import { setMapSlot } from '../components/PersistentMap.jsx';

export default function About() {
  const { hash } = useLocation();
  const mapSlotRef = useRef(null);

  // Register this page's map slot so the session-wide map reveals itself here,
  // and release it on unmount so the map parks offscreen again.
  useEffect(() => {
    setMapSlot(mapSlotRef.current);
    return () => setMapSlot(null);
  }, []);

  useEffect(() => {
    if (hash !== '#stack') return;
    // Runs after Layout's scroll-to-top reset, so the smooth scroll wins.
    const id = requestAnimationFrame(() => {
      document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(id);
  }, [hash]);

  return (
    <>
      <PageHeader
        index="04" path="/about" title="About " accentWord="me."
        lead="A fullstack and DevOps engineer who treats security as a design constraint, not an afterthought."
        meta={[['Based', 'Bern, CH'], ['Exp', '5+ yrs'], ['Status', 'Employed · open to interesting work']]}
      />

      <section className="shell section" style={{ paddingTop: 'clamp(48px, 7vh, 88px)', paddingBottom: 'clamp(56px, 8vh, 96px)' }}>
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 'clamp(40px, 6vw, 88px)', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="bp-grid" style={{
              position: 'relative', aspectRatio: '4 / 5', border: '1.5px solid var(--ink-0)',
              background: 'var(--paper-2)', overflow: 'hidden',
            }}>
              <img
                src="/maurice.jpg" alt="Maurice Däppen"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
              />
              <span style={{ position: 'absolute', bottom: 10, left: 12, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--paper-0)', letterSpacing: '0.08em', mixBlendMode: 'difference' }}>IMG / 0.8MP</span>
            </div>
            <Card variant="ink" style={{ padding: 18 }}>
              <SpecList items={[
                { key: 'Based', value: 'Bern, CH' },
                { key: 'Exp', value: '5+ yrs' },
                { key: 'Langs', value: 'DE · EN · FR · ES' },
                { key: 'Status', value: 'Employed, open' },
              ]} dense inverted />
            </Card>

            {/* Bern locator — the whole card (border + header + map) is drawn by
                the session-wide PersistentMap overlay, glued to this slot so the
                booted swisstopo iframe is reused instead of reloaded per visit. */}
            <div ref={mapSlotRef} style={{ flex: 1, minHeight: 360, background: 'var(--surface-card)' }} />
          </div>

          <div>
            <p style={{ fontSize: 24, lineHeight: 1.45, letterSpacing: '-0.01em', color: 'var(--ink-0)', maxWidth: '40ch', fontWeight: 500 }}>
              I fell for code through video games. Modding Minecraft as a kid turned tinkering into a craft, and I never really stopped.
            </p>
            <p style={{ margin: '22px 0 0', fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '60ch' }}>
              That became an apprenticeship in software engineering, shipping in a production team from my second year on. Somewhere along the way I found I love explaining this stuff as much as building it, so I qualified as a certified apprentice mentor and now help the next batch of apprentices and trial-day students find their feet. In February I start a bachelor in cyber security to push it all further.
            </p>
            <p style={{ margin: '18px 0 0', fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '60ch' }}>
              What keeps me hooked is the problem solving. I lose all track of time untangling something hard, or re-explaining an idea five different ways until it finally clicks for someone. I like pointing that at security, because making systems harder to break feels like making the world a little bit better.
            </p>
            <p style={{ margin: '18px 0 0', fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '60ch' }}>
              Away from the keyboard I always have a joke loaded and I am fully signed up to internet culture, making memes and keeping the mood light. I am convinced the best work happens when people are actually having fun doing it.
            </p>

            {/* motto */}
            <div style={{ marginTop: 44, borderTop: '1.5px solid var(--ink-0)', padding: 'clamp(28px, 4vw, 44px) 0 0' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 16 }}>[ motto ]</div>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(34px, 5.5vw, 64px)', lineHeight: 1.0, letterSpacing: '-0.04em', color: 'var(--ink-0)' }}>
                Stay <span style={{ color: 'var(--accent)' }}>sweet</span> and <span style={{ color: 'var(--accent)' }}>silly.</span>
              </p>
            </div>

            {/* values */}
            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, marginTop: 44, paddingTop: 'clamp(24px, 3.5vw, 40px)', borderTop: '1.5px solid var(--ink-0)' }}>
              {VALUES.map((val, i) => (
                <div key={val.k} style={{ padding: '0 24px 24px 0', borderLeft: i === 0 ? 'none' : '1px solid var(--line-0)', paddingLeft: i === 0 ? 0 : 24 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>{val.k}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-1)' }}>{val.v}</p>
                </div>
              ))}
            </div>

            <Annotation id="stack" label="Stack matrix" tone="accent" corner="tl" style={{ marginTop: 48, scrollMarginTop: 100 }}>
              <div className="skill-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
                {Object.entries(SKILLS).map(([group, items]) => (
                  <div key={group}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 10 }}>{group}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                      {items.map((t) => <Tag key={t} size="sm">{t}</Tag>)}
                    </div>
                  </div>
                ))}
              </div>
            </Annotation>

            <div style={{ marginTop: 48 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 18 }}>Languages</div>
              <div style={{ display: 'flex', gap: 'clamp(28px, 5vw, 72px)', flexWrap: 'wrap' }}>
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

      {/* off the clock — interests */}
      <section className="shell section bp-dots" style={{ paddingTop: 0 }}>
        <SectionLabel accent>Off the clock</SectionLabel>
        <div className="interest-grid" style={{ marginTop: 40 }}>
          {INTERESTS.map((it) => (
            <div key={it.k} className="interest-cell">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>{it.k}</div>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-1)' }}>{it.v}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
