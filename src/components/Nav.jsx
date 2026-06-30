/* Nav — sticky top bar. Monogram + wordmark link home; mono section links use
   React Router NavLink so the active route is accent-highlighted. On narrow
   screens the inline links collapse into a hamburger that opens a full-screen
   editorial overlay menu. */
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { ROUTES } from '../data.js';
import { IconButton } from '../ds/index.js';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the overlay whenever the route changes (link tapped, back button).
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll + allow Esc to dismiss while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open]);

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

      {/* desktop inline links */}
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
        <a href="https://github.com/eXor404" target="_blank" rel="noreferrer">
          <IconButton label="GitHub" variant="ghost" size="sm"><Github size={18} /></IconButton>
        </a>
        <a href="https://www.linkedin.com/in/maurice-d-ab0683397/" target="_blank" rel="noreferrer">
          <IconButton label="LinkedIn" variant="ghost" size="sm"><Linkedin size={18} /></IconButton>
        </a>
      </nav>

      {/* mobile hamburger — only shown where .nav-links is hidden (<=720px) */}
      <button
        type="button"
        className="nav-burger"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        style={{
          display: 'none', alignItems: 'center', justifyContent: 'center',
          width: 44, height: 44, border: '1.5px solid var(--ink-0)', background: 'transparent',
          color: 'var(--ink-0)', cursor: 'pointer',
        }}
      >
        <Menu size={20} />
      </button>

      {/* full-screen overlay menu — portaled to <body> so it escapes this
          header's backdrop-filter containing block and covers the real viewport.
          Its top bar mirrors the nav bar exactly (same padding, same 44px control
          on the right, same 1.5px bottom border) so the X sits right where the
          hamburger was and the divider lands on the same line. */}
      {open && createPortal(
        <div
          className="nav-overlay"
          style={{
            position: 'fixed', inset: 0, zIndex: 60,
            background: 'var(--surface-page)',
            display: 'flex', flexDirection: 'column',
          }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px var(--page-x)', borderBottom: '1.5px solid var(--ink-0)', flex: '0 0 auto',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 44, height: 44, border: '1.5px solid var(--ink-0)', background: 'transparent',
                color: 'var(--ink-0)', cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', padding: 'clamp(8px, 2vh, 20px) var(--page-x) 0' }}>
            {ROUTES.map((l, i) => (
              <NavLink key={l.id} to={l.path} className="reveal" style={({ isActive }) => ({
                display: 'flex', alignItems: 'baseline', gap: 16,
                padding: 'clamp(18px, 3.4vh, 28px) 0', borderBottom: '1px solid var(--line-0)',
                fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(34px, 11vw, 56px)',
                letterSpacing: '-0.03em', lineHeight: 1,
                color: isActive ? 'var(--accent)' : 'var(--ink-0)',
                animationDuration: '0.45s', animationDelay: `${60 + i * 55}ms`,
              })}>
                {({ isActive }) => (
                  <>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 14, letterSpacing: '0.04em', color: isActive ? 'var(--accent)' : 'var(--ink-3)' }}>{l.n}</span>
                    {l.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="reveal" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 18, padding: '0 var(--page-x) clamp(32px, 6vh, 56px)', animationDelay: `${60 + ROUTES.length * 55}ms` }}>
            <a href="https://github.com/eXor404" target="_blank" rel="noreferrer">
              <IconButton label="GitHub" variant="ghost" size="sm"><Github size={20} /></IconButton>
            </a>
            <a href="https://www.linkedin.com/in/maurice-d-ab0683397/" target="_blank" rel="noreferrer">
              <IconButton label="LinkedIn" variant="ghost" size="sm"><Linkedin size={20} /></IconButton>
            </a>
          </div>
        </div>,
        document.body,
      )}
    </header>
  );
}
