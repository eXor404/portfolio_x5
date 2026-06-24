/* /work — projects index. Custom masthead, then the featured + grid layout. */
import PageHeader from '../components/PageHeader.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { PROJECTS } from '../data.js';

export default function Work() {
  return (
    <>
      <PageHeader
        index="01" path="/work" title="Selected " accentWord="work."
        lead="Systems I designed, shipped, and kept alive in production. Each one traded a sharp constraint for a measurable result."
        meta={[['Projects', String(PROJECTS.length).padStart(2, '0')], ['Focus', 'Platforms · Security'], ['Years', '2023 – 2025']]}
      />

      <section className="shell section">
        {/* uniform 2-up grid — every project gets the identical compact card */}
        <div className="work-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'stretch' }}>
          {PROJECTS.map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>
      </section>
    </>
  );
}
