/* Nav — sticky top bar: monogram + wordmark left, mono page links right.
   Multi-page: links are real <a href> to sibling .html files. */
const { IconButton } = window.MauriceDPpenDesignSystem_3628c1;

function Nav({ page }) {
  const links = [
    { id: 'work', n: '01', label: 'Work', href: 'work.html' },
    { id: 'writing', n: '02', label: 'Writing', href: 'writing.html' },
    { id: 'experience', n: '03', label: 'Experience', href: 'experience.html' },
    { id: 'about', n: '04', label: 'About', href: 'about.html' },
    { id: 'contact', n: '05', label: 'Contact', href: 'contact.html' },
  ];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px clamp(24px, 5vw, 80px)',
      background: 'color-mix(in srgb, var(--surface-page) 86%, transparent)',
      backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      borderBottom: '1.5px solid var(--ink-0)',
    }}>
      <a href="index.html" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}>
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
      </a>

      <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {links.map((l) => (
          <a key={l.id} href={l.href} style={{
            display: 'inline-flex', alignItems: 'baseline', gap: 6, textDecoration: 'none',
            padding: '8px 12px',
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: page === l.id ? 'var(--accent)' : 'var(--ink-2)',
            fontWeight: page === l.id ? 600 : 500,
          }}>
            <span style={{ fontSize: 10, color: page === l.id ? 'var(--accent)' : 'var(--ink-3)' }}>{l.n}</span>
            {l.label}
          </a>
        ))}
        <span style={{ width: 1, height: 22, background: 'var(--line-1)', margin: '0 10px' }} />
        <IconButton label="GitHub" variant="ghost" size="sm"><i data-lucide="github"></i></IconButton>
        <IconButton label="LinkedIn" variant="ghost" size="sm"><i data-lucide="linkedin"></i></IconButton>
      </nav>
    </header>
  );
}

Object.assign(window, { Nav });
