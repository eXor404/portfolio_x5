/* /work — projects index. Custom masthead, then the featured + grid layout. */
import PageHeader from '../components/PageHeader.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { PROJECTS } from '../data.js';

export default function Work() {
  return (
    <>
      <PageHeader
        index="01" path="/work" title="Selected " accentWord="work."
        lead="A fine selection of my projects, all designed and built end to end, from security tooling and developer CLIs to real-time systems and a few things I made just to see if I could."
        meta={[['Projects', String(PROJECTS.length).padStart(2, '0')], ['Focus', 'Platforms · Security'], ['Years', '2023 – 2025']]}
      />

      <section className="shell section" style={{ paddingTop: 'clamp(48px, 7vh, 88px)' }}>
        {/* uniform 2-up grid — every project gets the identical compact card */}
        <div className="work-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'stretch' }}>
          {PROJECTS.map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>

        <div style={{
          marginTop: 28, border: '1.5px dashed var(--line-1)', background: 'var(--surface-card)',
          padding: 'clamp(28px, 5vw, 48px)', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 24, flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>
              [ wip ]
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(26px, 3.4vw, 40px)', letterSpacing: '-0.03em', color: 'var(--ink-0)', display: 'inline-flex', alignItems: 'baseline', gap: 6 }}>
              A lot more to come<span className="blink" style={{ color: 'var(--accent)' }}>_</span>
            </div>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '34ch' }}>
            Always building something. New projects land here as they ship.
          </span>
        </div>
      </section>
    </>
  );
}
