/* Home (/) — poster hero + curated teasers that link into the 5 sub-sites. */
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { SectionLabel, Button, RotatingWord, Eyebrow } from '../ds/index.js';
import { PROJECTS } from '../data.js';

function MoreLink({ to, children }) {
  return (
    <Link to={to} className="ul-link" style={{
      fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
      color: 'var(--ink-1)', display: 'inline-flex', alignItems: 'center', gap: 8,
      borderBottom: '1.5px solid var(--ink-0)', paddingBottom: 4,
    }}>
      {children} <ArrowRight size={15} />
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* Work teaser */}
      <section className="shell section">
        <SectionLabel index="01" accent>Selected work</SectionLabel>
        <p style={{ maxWidth: '54ch', margin: '32px 0 64px', fontSize: 18, lineHeight: 1.6, color: 'var(--ink-1)' }}>
          A few systems I designed, shipped, and kept alive in production.
        </p>
        <div className="work-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          {[...PROJECTS.slice(0, 3), PROJECTS.find((p) => p.slug === 'mirage')].map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>
        <div style={{ marginTop: 56, display: 'flex', justifyContent: 'flex-end' }}>
          <MoreLink to="/work">View all projects</MoreLink>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="shell section" style={{ paddingTop: 0 }}>
        <div style={{
          border: '1.5px solid var(--ink-0)', boxShadow: 'var(--shadow-hard)', background: 'var(--surface-card)',
          padding: 'clamp(36px, 6vw, 72px)', display: 'flex', flexWrap: 'wrap', gap: 32,
          alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ flex: '1 1 360px', minWidth: 0 }}>
            <Eyebrow tone="accent" style={{ marginBottom: 16 }}>Open to interesting work</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(32px, 4.5vw, 60px)', lineHeight: 1.0, letterSpacing: '-0.035em', color: 'var(--ink-0)' }}>
              Let's build something<br /><RotatingWord />
            </h2>
          </div>
          <Link to="/contact" style={{ flex: '0 0 auto' }}>
            <Button variant="accent" size="lg" iconRight={<ArrowRight size={18} />}>Get in touch</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
