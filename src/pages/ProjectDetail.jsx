/* /work/:slug — project case-study detail page. Same Swiss/engineering paper
   language as the rest of the site: breadcrumb, poster masthead, a Mac-window
   framed screenshot, a creative fact rail, the overview + technical write-up,
   feature highlights, the real stack, and prev/next nav. Content comes from
   PROJECTS (card data) + PROJECT_DETAILS (per-project research) in data.js. */
import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROJECTS, PROJECT_DETAILS } from '../data.js';
import { Tag } from '../ds/index.js';

/* True while the write-up is stacked (aside drops below the body at 860px). */
function useStacked() {
  const [stacked, setStacked] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 860px)');
    const sync = () => setStacked(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return stacked;
}

/* Stack chip list — rendered inline after the overview on phones, and in the
   sticky side rail on desktop. */
function StackBlock({ tags, style }) {
  return (
    <div style={style}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 18, paddingBottom: 12, borderBottom: '1.5px solid var(--ink-0)' }}>
        Stack
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {tags.map((t) => <Tag key={t} size="sm">{t}</Tag>)}
      </div>
    </div>
  );
}

/* macOS-style window chrome around a screenshot. Traffic lights are the one
   rounded element in an otherwise square system. */
function MacWindow({ src, label, alt }) {
  return (
    <figure style={{ margin: 0, border: '1.5px solid var(--ink-0)', background: 'var(--paper-2)', boxShadow: 'var(--shadow-hard)' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14, padding: '11px 14px',
        borderBottom: '1.5px solid var(--ink-0)', background: 'var(--paper-1)',
      }}>
        <span style={{ display: 'flex', gap: 8 }}>
          {['#ED6A5E', '#F4BF4F', '#61C554'].map((c) => (
            <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c, border: '1px solid rgba(0,0,0,0.18)' }} />
          ))}
        </span>
        <span style={{
          flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 12,
          letterSpacing: '0.04em', color: 'var(--ink-2)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{label}</span>
        <span style={{ width: 44 }} />
      </div>
      <img src={src} alt={alt} loading="lazy" style={{ display: 'block', width: '100%', height: 'auto' }} />
    </figure>
  );
}

function FactRail({ facts }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      border: '1.5px solid var(--ink-0)', background: 'var(--surface-card)', boxShadow: 'var(--shadow-hard-sm)',
    }}>
      {facts.map((f, i) => (
        <div key={f.label} style={{
          padding: '20px 22px',
          borderRight: '1px solid var(--line-0)', borderBottom: '1px solid var(--line-0)',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 10 }}>
            {f.label}
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', color: 'var(--ink-0)', lineHeight: 1.05 }}>
            {f.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  if (idx === -1) return <Navigate to="/work" replace />;

  const stacked = useStacked();
  const p = PROJECTS[idx];
  const d = PROJECT_DETAILS[slug] || {};
  const stack = d.stack || p.tags;
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <>
      {/* masthead */}
      <header className="bp-grid" style={{ borderBottom: '1.5px solid var(--ink-0)' }}>
        <div className="shell" style={{ paddingTop: 'clamp(56px, 9vh, 120px)', paddingBottom: 'clamp(40px, 6vh, 72px)' }}>
          <nav className="reveal" style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'clamp(40px, 7vh, 84px)',
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)',
          }}>
            <Link to="/" className="ul-link" style={{ color: 'var(--ink-2)' }}>Index</Link>
            <span>/</span>
            <Link to="/work" className="ul-link" style={{ color: 'var(--ink-2)' }}>~/work</Link>
            <span>/</span>
            <span style={{ color: 'var(--accent)' }}>{p.slug}</span>
          </nav>

          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(20px, 4vw, 48px)', alignItems: 'baseline' }}>
            <span className="reveal" style={{
              fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 'clamp(34px, 6vw, 80px)',
              lineHeight: 0.8, color: 'var(--line-1)', letterSpacing: '-0.02em', animationDelay: '60ms',
            }}>{p.n}</span>
            <h1 className="reveal" style={{
              fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(44px, 8vw, 120px)',
              lineHeight: 0.92, letterSpacing: '-0.045em', color: 'var(--ink-0)', animationDelay: '120ms',
            }}>
              {p.title}<span style={{ color: 'var(--accent)' }}>.</span>
            </h1>
          </div>

          <p className="reveal" style={{ maxWidth: '60ch', fontSize: 19, lineHeight: 1.6, color: 'var(--ink-1)', marginTop: 'clamp(32px, 5vh, 56px)', animationDelay: '180ms' }}>
            {p.blurb}
          </p>
        </div>
      </header>

      {/* screenshot */}
      {d.shot && (
        <section className="shell" style={{ paddingTop: 'clamp(48px, 7vh, 80px)' }}>
          <MacWindow src={d.shot} label={d.shotLabel || `${p.slug} — ${p.title}`} alt={`${p.title} screenshot`} />
        </section>
      )}

      {/* facts */}
      {d.facts && (
        <section className="shell" style={{ paddingTop: 'clamp(40px, 6vh, 64px)' }}>
          <FactRail facts={d.facts} />
        </section>
      )}

      {/* write-up */}
      <section className="shell section" style={{ paddingTop: 'clamp(48px, 7vh, 80px)' }}>
        <div className="detail-body" style={{ display: 'grid', gridTemplateColumns: '1fr 0.5fr', gap: 'clamp(40px, 6vw, 96px)', alignItems: 'start' }}>
          <div>
            {d.overview && (
              <p style={{ fontSize: 'clamp(20px, 2.4vw, 26px)', lineHeight: 1.5, letterSpacing: '-0.01em', color: 'var(--ink-0)', marginBottom: 40, maxWidth: '40ch' }}>
                {d.overview}
              </p>
            )}
            {/* On phones the stack rides up here, right after the intro, instead
                of dropping to the bottom with the rest of the side rail. */}
            {stacked && <StackBlock tags={stack} style={{ marginBottom: 40 }} />}
            {d.technical && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: '64ch' }}>
                {d.technical.map((para, i) => (
                  <p key={i} style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-1)' }}>{para}</p>
                ))}
              </div>
            )}
          </div>

          {/* side rail: highlights + stack */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: 36, position: 'sticky', top: 96 }}>
            {d.highlights && d.highlights.length > 0 && (
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 18, paddingBottom: 12, borderBottom: '1.5px solid var(--ink-0)' }}>
                  Highlights
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {d.highlights.map((h) => (
                    <div key={h.label}>
                      <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink-0)', marginBottom: 5 }}>{h.label}</div>
                      <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)' }}>{h.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Desktop keeps the stack in the sticky rail; on phones it has
                already been rendered inline after the overview above. */}
            {!stacked && <StackBlock tags={stack} />}
          </aside>
        </div>
      </section>

      {/* prev / next */}
      <section className="shell section" style={{ paddingTop: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderTop: '1.5px solid var(--ink-0)' }}>
          <Link to={`/work/${prev.slug}`} className="detail-nav" style={{
            display: 'flex', flexDirection: 'column', gap: 8, padding: 'clamp(24px, 4vh, 40px) 0', paddingRight: 24, color: 'inherit',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <ArrowLeft size={14} /> Prev
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '-0.03em', color: 'var(--ink-0)' }}>{prev.title}</span>
          </Link>
          <Link to={`/work/${next.slug}`} className="detail-nav" style={{
            display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end', textAlign: 'right',
            padding: 'clamp(24px, 4vh, 40px) 0', paddingLeft: 24, borderLeft: '1px solid var(--line-0)', color: 'inherit',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Next <ArrowRight size={14} />
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '-0.03em', color: 'var(--ink-0)' }}>{next.title}</span>
          </Link>
        </div>
        <div style={{ marginTop: 40 }}>
          <Link to="/work" className="ul-link" style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--ink-1)', display: 'inline-flex', alignItems: 'center', gap: 8,
            borderBottom: '1.5px solid var(--ink-0)', paddingBottom: 4,
          }}>
            <ArrowLeft size={15} /> All projects
          </Link>
        </div>
      </section>
    </>
  );
}
