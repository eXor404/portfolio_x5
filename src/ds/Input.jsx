/* Input — text field with mono label, hairline box that goes accent on focus. */
import { useState } from 'react';

export default function Input({ label, hint, error, prefix = null, mono = false, style = {}, id, ...rest }) {
  const [focus, setFocus] = useState(false);
  const fieldId = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--accent)' : 'var(--line-1)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label htmlFor={fieldId} style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)',
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-2)',
        }}>{label}</label>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-card)',
        border: `1.5px solid ${borderColor}`, borderRadius: 'var(--radius-control)', padding: '0 12px',
        transition: 'border-color var(--dur-fast) var(--ease-out)',
      }}>
        {prefix && <span style={{ color: 'var(--ink-3)', display: 'inline-flex' }}>{prefix}</span>}
        <input
          id={fieldId} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent', padding: '10px 0',
            fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--ink-0)',
          }}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: error ? 'var(--danger)' : 'var(--ink-3)' }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
