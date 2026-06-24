/* SectionLabel — recurring Swiss header: mono index + uppercase label with an
   optional rule line that fills remaining width. */
export default function SectionLabel({
  index, children, rule = true, align = 'left', accent = false, style = {}, ...rest
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
      flexDirection: align === 'right' ? 'row-reverse' : 'row', ...style,
    }} {...rest}>
      <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 'var(--space-3)', flex: '0 0 auto' }}>
        {index != null && (
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)',
            letterSpacing: 'var(--tracking-label)', color: accent ? 'var(--accent)' : 'var(--ink-3)',
          }}>{index}</span>
        )}
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)',
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-1)',
        }}>{children}</span>
      </div>
      {rule && <span style={{ flex: 1, height: 1, background: 'var(--line-1)' }} />}
    </div>
  );
}
