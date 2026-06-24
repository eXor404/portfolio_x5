/* Annotation — signature "blueprint callout": dashed rectangle + a small mono
   label tab, like an engineer's margin note. */
export default function Annotation({
  children, label, corner = 'tl', tone = 'ink', dashed = true, style = {}, ...rest
}) {
  const color = tone === 'accent' ? 'var(--accent)' : 'var(--ink-2)';
  const labelBg = tone === 'accent' ? 'var(--accent)' : 'var(--ink-0)';
  const pos = {
    tl: { top: -9, left: 'var(--space-3)' },
    tr: { top: -9, right: 'var(--space-3)' },
    bl: { bottom: -9, left: 'var(--space-3)' },
    br: { bottom: -9, right: 'var(--space-3)' },
  }[corner];
  return (
    <div style={{
      position: 'relative', border: `1.5px ${dashed ? 'dashed' : 'solid'} ${color}`,
      borderRadius: 'var(--radius-sm)', padding: 'var(--space-5)', ...style,
    }} {...rest}>
      {label != null && (
        <span style={{
          position: 'absolute', ...pos, padding: '2px 7px', fontFamily: 'var(--font-mono)',
          fontSize: '10px', fontWeight: 'var(--weight-semibold)', letterSpacing: 'var(--tracking-label)',
          textTransform: 'uppercase', color: tone === 'accent' ? 'var(--text-on-accent)' : 'var(--paper-1)',
          background: labelBg, lineHeight: 1.4, whiteSpace: 'nowrap',
        }}>{label}</span>
      )}
      {children}
    </div>
  );
}
