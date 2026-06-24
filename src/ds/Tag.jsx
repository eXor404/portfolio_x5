/* Tag — mono pill chip for tech stack / metadata. */
export default function Tag({ children, variant = 'default', size = 'md', dot = false, style = {}, ...rest }) {
  const sizes = {
    sm: { padding: '2px 8px', fontSize: '11px' },
    md: { padding: '4px 10px', fontSize: 'var(--text-xs)' },
  }[size];
  const palettes = {
    default: { bg: 'var(--paper-2)', fg: 'var(--ink-1)', border: 'transparent' },
    accent: { bg: 'var(--accent-soft)', fg: 'var(--accent-ink)', border: 'transparent' },
    outline: { bg: 'transparent', fg: 'var(--ink-1)', border: 'var(--line-1)' },
    ink: { bg: 'var(--ink-0)', fg: 'var(--paper-1)', border: 'transparent' },
  }[variant];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: sizes.padding,
      fontFamily: 'var(--font-mono)', fontSize: sizes.fontSize, fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-mono)', color: palettes.fg, background: palettes.bg,
      border: `1px solid ${palettes.border}`, borderRadius: 'var(--radius-pill)',
      lineHeight: 1.4, whiteSpace: 'nowrap', ...style,
    }} {...rest}>
      {dot && <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', flex: '0 0 auto' }} />}
      {children}
    </span>
  );
}
