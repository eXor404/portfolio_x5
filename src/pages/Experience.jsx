/* /experience — vertical timeline. Custom masthead, then the hairline-spine
   timeline with accent nodes. */
import PageHeader from '../components/PageHeader.jsx';
import { Tag, Badge } from '../ds/index.js';
import { TIMELINE } from '../data.js';

export default function Experience() {
  return (
    <>
      <PageHeader
        index="03" path="/experience" title="Timeline" accentWord="."
        lead="Seven years across incident response, platform engineering, and product — moving toward the seam where reliability meets adversarial thinking."
        meta={[['Span', '2020 – Now'], ['Base', 'Bern, CH'], ['Mode', 'Hybrid · Remote']]}
      />

      <section className="shell section bp-dots">
        <div style={{ position: 'relative' }}>
          {TIMELINE.map((e, i) => (
            <div key={e.year} className="tl-row" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 36, position: 'relative' }}>
              <div style={{ textAlign: 'right', paddingTop: 2 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 24, letterSpacing: '0.02em', color: e.now ? 'var(--accent)' : 'var(--ink-0)' }}>
                  {e.year}
                </div>
                {e.now && <div style={{ marginTop: 8, display: 'inline-block' }}><Badge tone="accent">Now</Badge></div>}
              </div>
              <div style={{ position: 'relative', paddingLeft: 36, paddingBottom: i === TIMELINE.length - 1 ? 0 : 80 }}>
                <span style={{ position: 'absolute', left: 0, top: 4, bottom: 0, width: 1.5, background: i === TIMELINE.length - 1 ? 'transparent' : 'var(--line-1)' }} />
                <span style={{ position: 'absolute', left: -5.5, top: 4, width: 13, height: 13, borderRadius: '50%', background: e.now ? 'var(--accent)' : 'var(--surface-page)', border: `1.5px solid ${e.now ? 'var(--accent)' : 'var(--ink-0)'}` }} />
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 27, letterSpacing: '-0.02em', color: 'var(--ink-0)' }}>
                  {e.role}
                </h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', color: 'var(--ink-2)', marginTop: 8, textTransform: 'uppercase' }}>
                  {e.org} · {e.loc}
                </div>
                <p style={{ margin: '14px 0 0', fontSize: 15, lineHeight: 1.55, color: 'var(--ink-1)', maxWidth: '56ch' }}>
                  {e.blurb}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 16 }}>
                  {e.tags.map((t) => <Tag key={t} variant="outline" size="sm">{t}</Tag>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
