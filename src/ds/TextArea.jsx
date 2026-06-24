/* TextArea — multiline field matching Input's styling. */
import { useState } from 'react';

export default function TextArea({ label, hint, error, rows = 5, style = {}, id, ...rest }) {
  const [focus, setFocus] = useState(false);
  const fieldId = id || (label ? `ta-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--accent)' : 'var(--line-1)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label htmlFor={fieldId} style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)',
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-2)',
        }}>{label}</label>
      )}
      <textarea
        id={fieldId} rows={rows} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          resize: 'vertical', background: 'var(--surface-card)', border: `1.5px solid ${borderColor}`,
          borderRadius: 'var(--radius-control)', padding: '12px', fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--ink-0)',
          outline: 'none', transition: 'border-color var(--dur-fast) var(--ease-out)',
        }}
        {...rest}
      />
      {(hint || error) && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: error ? 'var(--danger)' : 'var(--ink-3)' }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
