/* Footer — mono meta row + a route map + back-to-top on desktop. On phones it
   collapses to just the essentials: the GitHub/LinkedIn social buttons and the
   legal baseline, instead of squashing the desktop space-between row onto one
   column. */
import { useEffect, useState } from 'react';
import { ArrowUp, ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../data.js';

const GITHUB = 'https://github.com/eXor404';
const LINKEDIN = 'https://www.linkedin.com/in/maurice-d-ab0683397/';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Phones get the title-block layout; ≥640px keeps the wide meta row.
  const [isNarrow, setIsNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const sync = () => setIsNarrow(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  if (isNarrow) {
    return <MobileFooter />;
  }

  return (
    <footer style={{ borderTop: '1.5px solid var(--ink-0)' }}>
      <div className="shell" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(16px, 4vw, 48px)', marginBottom: 32 }}>
          <Link to="/" className="ul-link" style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--ink-1)',
          }}>
            <span style={{ color: 'var(--ink-3)', marginRight: 6 }}>00</span>Index
          </Link>
          {ROUTES.map((r) => (
            <Link key={r.id} to={r.path} className="ul-link" style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--ink-1)',
            }}>
              <span style={{ color: 'var(--ink-3)', marginRight: 6 }}>{r.n}</span>{r.label}
            </Link>
          ))}
        </nav>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-2)',
          borderTop: '1px solid var(--line-0)', paddingTop: 24,
        }}>
          <span>© 2026 Maurice Däppen</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
            <Link to="/privacy" className="ul-link" style={{ color: 'var(--ink-2)' }}>Privacy</Link>
            <Link to="/imprint" className="ul-link" style={{ color: 'var(--ink-2)' }}>Imprint</Link>
            <Link to="/terms" className="ul-link" style={{ color: 'var(--ink-2)' }}>Terms</Link>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ok)' }} />
            Open to interesting work · Bern, CH
          </span>
          <button onClick={scrollTop} style={{
            background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-2)',
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            Back to top <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ---- mobile: socials + legal only ------------------------------------- */

function MobileFooter() {
  return (
    <footer style={{ borderTop: '1.5px solid var(--ink-0)' }}>
      {/* socials — two hard-bordered buttons filling the row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderBottom: '1px solid var(--line-0)' }}>
        <SocialCell href={GITHUB} icon={<Github size={15} />} text="GitHub" border />
        <SocialCell href={LINKEDIN} icon={<Linkedin size={15} />} text="LinkedIn" />
      </div>

      {/* legal baseline */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        padding: '18px var(--page-x) 24px',
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-3)',
      }}>
        <span>© 2026 MD</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <Link to="/privacy" style={{ color: 'var(--ink-3)' }}>Privacy</Link>
          <Link to="/imprint" style={{ color: 'var(--ink-3)' }}>Imprint</Link>
          <Link to="/terms" style={{ color: 'var(--ink-3)' }}>Terms</Link>
        </span>
      </div>
    </footer>
  );
}

function SocialCell({ href, icon, text, border }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, minHeight: 56,
      borderRight: border ? '1px solid var(--line-0)' : 'none', color: 'var(--ink-1)',
      fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
    }}>
      {icon}{text}<ArrowUpRight size={13} style={{ color: 'var(--ink-3)' }} />
    </a>
  );
}
