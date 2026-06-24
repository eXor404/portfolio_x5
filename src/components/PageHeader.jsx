/* PageHeader — the custom masthead each of the 5 section pages opens with.
   Renders the literal route "path" as a breadcrumb (Index / ~/work), a big
   index numeral, the poster title, and a lead paragraph. */
import { Link } from 'react-router-dom';

export default function PageHeader({ index, path, title, accentWord, lead, meta }) {
  return (
    <header className="bp-grid" style={{ borderBottom: '1.5px solid var(--ink-0)' }}>
      <div className="shell" style={{ paddingTop: 'clamp(56px, 9vh, 120px)', paddingBottom: 'clamp(40px, 6vh, 72px)' }}>
        {/* breadcrumb / path */}
        <nav className="reveal" style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'clamp(40px, 7vh, 84px)',
          fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)',
        }}>
          <Link to="/" className="ul-link" style={{ color: 'var(--ink-2)' }}>Index</Link>
          <span>/</span>
          <span style={{ color: 'var(--accent)' }}>~{path}</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(20px, 4vw, 48px)', alignItems: 'end' }}>
          <span className="reveal" style={{
            fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 'clamp(40px, 7vw, 96px)',
            lineHeight: 0.8, color: 'var(--line-1)', letterSpacing: '-0.02em',
            animationDelay: '60ms',
          }}>{index}</span>
          <h1 className="reveal" style={{
            fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(44px, 8vw, 120px)',
            lineHeight: 0.92, letterSpacing: '-0.045em', color: 'var(--ink-0)', animationDelay: '120ms',
          }}>
            {title}{accentWord && <span style={{ color: 'var(--accent)' }}>{accentWord}</span>}
          </h1>
        </div>

        {(lead || meta) && (
          <div className="reveal hero-lower" style={{
            display: 'grid', gridTemplateColumns: lead && meta ? '1.4fr 0.8fr' : '1fr',
            gap: 'clamp(32px, 5vw, 72px)', alignItems: 'end', marginTop: 'clamp(32px, 5vh, 56px)', animationDelay: '180ms',
          }}>
            {lead && (
              <p style={{ maxWidth: '54ch', fontSize: 19, lineHeight: 1.6, color: 'var(--ink-1)' }}>{lead}</p>
            )}
            {meta && (
              <div style={{
                display: 'flex', flexDirection: 'column', gap: 0, fontFamily: 'var(--font-mono)',
                fontSize: 12, letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>
                {meta.map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line-0)' }}>
                    <span style={{ color: 'var(--ink-3)' }}>{k}</span>
                    <span style={{ color: 'var(--ink-1)' }}>{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
