/* Shared shell for the legal pages (imprint / privacy / terms). Reuses the
   site masthead, then renders readable prose in a constrained measure. */
import PageHeader from './PageHeader.jsx';

export function LegalSection({ heading, children }) {
  return (
    <section style={{ marginTop: 40 }}>
      {heading && (
        <h2 style={{
          fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(22px, 3vw, 30px)',
          letterSpacing: '-0.02em', color: 'var(--ink-0)', marginBottom: 14,
        }}>{heading}</h2>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 16, lineHeight: 1.7, color: 'var(--ink-1)' }}>
        {children}
      </div>
    </section>
  );
}

export default function LegalLayout({ index, path, title, accentWord, lead, updated, children }) {
  return (
    <>
      <PageHeader index={index} path={path} title={title} accentWord={accentWord} lead={lead} />
      <section className="shell section" style={{ paddingTop: 'clamp(40px, 6vh, 72px)' }}>
        <div style={{ maxWidth: '70ch' }}>
          {updated && (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
              Last updated: {updated}
            </p>
          )}
          {children}
        </div>
      </section>
    </>
  );
}
