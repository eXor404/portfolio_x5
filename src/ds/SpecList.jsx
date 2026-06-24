/* SpecList — mono key/value rows with dotted leaders, like an engineering
   spec sheet. */
export default function SpecList({ items = [], dense = false, style = {}, ...rest }) {
  return (
    <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: dense ? 4 : 10, ...style }} {...rest}>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <dt style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)',
            letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-3)', flex: '0 0 auto',
          }}>{it.key}</dt>
          <span style={{ flex: 1, alignSelf: 'flex-end', borderBottom: '1px dotted var(--line-1)', transform: 'translateY(-3px)' }} />
          <dd style={{
            margin: 0, fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)',
            color: 'var(--ink-0)', flex: '0 0 auto', textAlign: 'right',
          }}>{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
