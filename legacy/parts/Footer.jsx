/* Footer — mono meta row + back-to-top. */
function Footer() {
  return (
    <footer style={{
      borderTop: '1.5px solid var(--ink-0)',
      padding: '44px clamp(24px, 5vw, 80px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
      fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-2)',
    }}>
      <span>© 2026 Maurice Däppen</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ok)' }} />
        Open to work · Bern, CH
      </span>
      <a href="#top" style={{
        color: 'var(--ink-2)', textDecoration: 'none',
        display: 'inline-flex', alignItems: 'center', gap: 6,
      }}>
        Back to top <i data-lucide="arrow-up" style={{ width: 13, height: 13 }}></i>
      </a>
    </footer>
  );
}

Object.assign(window, { Footer });
