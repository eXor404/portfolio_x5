/* Footer — mono meta row + a route map + back-to-top. */
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { ROUTES } from '../data.js';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
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
