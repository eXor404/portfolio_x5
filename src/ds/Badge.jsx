/* Badge — small status indicator. Mono, uppercase, semantic-colored. */
export default function Badge({ children, tone = 'neutral', solid = false, style = {}, ...rest }) {
  const tones = {
    neutral: { soft: 'var(--paper-2)', ink: 'var(--ink-1)', solid: 'var(--ink-0)' },
    ok: { soft: 'var(--ok-soft)', ink: 'var(--ok)', solid: 'var(--ok)' },
    warn: { soft: 'var(--warn-soft)', ink: 'var(--warn)', solid: 'var(--warn)' },
    danger: { soft: 'var(--danger-soft)', ink: 'var(--danger)', solid: 'var(--danger)' },
    info: { soft: 'var(--info-soft)', ink: 'var(--info)', solid: 'var(--info)' },
    accent: { soft: 'var(--accent-soft)', ink: 'var(--accent-ink)', solid: 'var(--accent)' },
  }[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 8px',
      fontFamily: 'var(--font-mono)', fontSize: '10.5px', fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
      color: solid ? 'var(--paper-1)' : tones.ink, background: solid ? tones.solid : tones.soft,
      borderRadius: 'var(--radius-sm)', lineHeight: 1.3, whiteSpace: 'nowrap', ...style,
    }} {...rest}>{children}</span>
  );
}
