/* Catch-all 404 — keeps the Swiss voice. */
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ds/index.js';

export default function NotFound() {
  const { pathname } = useLocation();
  return (
    <section className="shell bp-grid" style={{ minHeight: '64vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 'clamp(80px,12vh,160px)', paddingBottom: 'clamp(80px,12vh,160px)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>
        Error 404 · route not found
      </div>
      <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(56px, 11vw, 160px)', lineHeight: 0.88, letterSpacing: '-0.045em', color: 'var(--ink-0)' }}>
        Lost the<br />thread<span style={{ color: 'var(--accent)' }}>.</span>
      </h1>
      <p style={{ marginTop: 28, maxWidth: '46ch', fontSize: 18, lineHeight: 1.6, color: 'var(--ink-1)' }}>
        Nothing is mapped to <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-0)' }}>~{pathname}</code>. Let's get you back to a known path.
      </p>
      <div style={{ marginTop: 36 }}>
        <Link to="/"><Button variant="accent" size="lg" iconLeft={<ArrowLeft size={18} />}>Back to index</Button></Link>
      </div>
    </section>
  );
}
