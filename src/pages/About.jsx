/* /about — portrait + bio + values + skills matrix + languages. */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import { Card, Tag, SpecList, Annotation } from '../ds/index.js';
import { SKILLS, LANGUAGES, VALUES } from '../data.js';

export default function About() {
  const { hash } = useLocation();
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
        index="04" path="/about" title="About" accentWord="."
        lead="A fullstack and DevOps engineer who treats security as a design constraint, not an afterthought."
        meta={[['Based', 'Bern, CH'], ['Exp', '7 yrs'], ['Status', 'Open to work']]}
      />

      <section className="shell section">
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 'clamp(40px, 6vw, 88px)', alignItems: 'start' }}>
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
                { key: 'Exp', value: '7 yrs' },
                { key: 'Langs', value: 'DE · EN · FR' },
                { key: 'Status', value: 'Open' },
              ]} dense inverted />
            </Card>
          </div>

          <div>
            <p style={{ fontSize: 24, lineHeight: 1.45, letterSpacing: '-0.01em', color: 'var(--ink-0)', maxWidth: '38ch', fontWeight: 500 }}>
              I'm a fullstack and DevOps engineer who treats security as a design constraint, not an afterthought.
            </p>
            <p style={{ margin: '22px 0 0', fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '58ch' }}>
              Seven years spanning incident response, platform engineering, and product. I like the seam where
              reliability meets adversarial thinking — the questions that start with “what happens when this fails,
              and who's trying to make it fail?”
            </p>

            {/* values */}
            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, marginTop: 44, borderTop: '1.5px solid var(--ink-0)' }}>
              {VALUES.map((val, i) => (
                <div key={val.k} style={{ padding: '24px 24px 24px 0', borderLeft: i === 0 ? 'none' : '1px solid var(--line-0)', paddingLeft: i === 0 ? 0 : 24 }}>
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
    </>
  );
}
