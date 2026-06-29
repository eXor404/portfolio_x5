/* Home (/) — poster hero + curated teasers that link into the 5 sub-sites. */
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Hero from '../components/Hero.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { SectionLabel, Tag, Button, RotatingWord } from '../ds/index.js';
import { PROJECTS, ARTICLES } from '../data.js';

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
          {PROJECTS.slice(0, 3).map((p) => <ProjectCard key={p.n} p={p} featured={p.featured} />)}
        </div>
        <div style={{ marginTop: 56, display: 'flex', justifyContent: 'flex-end' }}>
          <MoreLink to="/work">View all projects</MoreLink>
        </div>
      </section>

      {/* Writing teaser */}
      <section className="shell section bp-ruled" style={{ paddingTop: 0 }}>
        <SectionLabel index="02" accent>Recent writing</SectionLabel>
        <div style={{ borderTop: '1.5px solid var(--ink-0)', marginTop: 48 }}>
          {ARTICLES.slice(0, 2).map((a) => (
            <Link key={a.n} to="/writing" className="article-row" style={{
              display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 'clamp(20px, 4vw, 56px)',
              alignItems: 'baseline', padding: 'clamp(28px, 4vh, 44px) 8px',
              borderBottom: '1px solid var(--line-0)', color: 'inherit',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)', letterSpacing: '0.04em', paddingTop: 6 }}>{a.n}</span>
              <div>
                <div style={{ display: 'flex', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 14 }}>
                  <span>{a.date}</span><span>·</span><span>{a.read}</span>
                </div>
                <h3 className="article-title" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.025em', marginBottom: 14, color: 'var(--ink-0)', maxWidth: '22ch' }}>
                  {a.title}
                </h3>
                <p style={{ marginBottom: 18, fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: '60ch' }}>{a.blurb}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {a.tags.map((t) => <Tag key={t} variant="outline" size="sm">{t}</Tag>)}
                </div>
              </div>
              <ArrowUpRight size={22} style={{ color: 'var(--ink-1)', alignSelf: 'center' }} />
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 48, display: 'flex', justifyContent: 'flex-end' }}>
          <MoreLink to="/writing">See all writing</MoreLink>
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
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>
              Open to work
            </div>
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
