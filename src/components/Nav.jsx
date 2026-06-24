/* Nav — sticky top bar. Monogram + wordmark link home; mono section links use
   React Router NavLink so the active route is accent-highlighted. */
import { Link, NavLink } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';
import { ROUTES } from '../data.js';
import { IconButton } from '../ds/index.js';

export default function Nav() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px var(--page-x)',
      background: 'color-mix(in srgb, var(--surface-page) 86%, transparent)',
      backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      borderBottom: '1.5px solid var(--ink-0)',
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{
          width: 38, height: 38, background: 'var(--ink-0)', color: 'var(--paper-1)',
          fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 16, letterSpacing: '-0.04em',
          display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
        }}>MD
          <span style={{ position: 'absolute', right: 5, bottom: 5, width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }} />
        </span>
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em', color: 'var(--ink-0)' }}>
          Maurice&nbsp;Däppen<span style={{ color: 'var(--accent)' }}>.</span>
        </span>
      </Link>

      <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {ROUTES.map((l) => (
          <NavLink key={l.id} to={l.path} style={({ isActive }) => ({
            display: 'inline-flex', alignItems: 'baseline', gap: 6, padding: '8px 12px',
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: isActive ? 'var(--accent)' : 'var(--ink-2)', fontWeight: isActive ? 600 : 500,
          })}>
            {({ isActive }) => (
              <>
                <span style={{ fontSize: 10, color: isActive ? 'var(--accent)' : 'var(--ink-3)' }}>{l.n}</span>
                {l.label}
              </>
            )}
          </NavLink>
        ))}
        <span style={{ width: 1, height: 22, background: 'var(--line-1)', margin: '0 10px' }} />
        <a href="https://github.com/mdaeppen" target="_blank" rel="noreferrer">
          <IconButton label="GitHub" variant="ghost" size="sm"><Github size={18} /></IconButton>
        </a>
        <a href="https://www.linkedin.com/in/maurice-daeppen" target="_blank" rel="noreferrer">
          <IconButton label="LinkedIn" variant="ghost" size="sm"><Linkedin size={18} /></IconButton>
        </a>
      </nav>
    </header>
  );
}
