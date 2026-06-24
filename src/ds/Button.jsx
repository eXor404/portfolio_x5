/* Button — Swiss/engineering action control. Square corners, optional
   hard-offset press. Variants map to the ink/accent/paper system. */
import { useState } from 'react';

export default function Button({
  children, variant = 'solid', size = 'md', mono = false, full = false,
  disabled = false, iconLeft = null, iconRight = null, style = {}, ...rest
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const sizes = {
    sm: { padding: '6px 12px', fontSize: 'var(--text-xs)', gap: 6 },
    md: { padding: '9px 18px', fontSize: 'var(--text-sm)', gap: 8 },
    lg: { padding: '14px 26px', fontSize: 'var(--text-md)', gap: 10 },
  }[size];
  const palettes = {
    solid: { bg: 'var(--ink-0)', fg: 'var(--paper-1)', border: 'var(--ink-0)', hoverBg: 'var(--ink-1)' },
    accent: { bg: 'var(--accent)', fg: 'var(--text-on-accent)', border: 'var(--accent)', hoverBg: 'var(--accent-strong)' },
    outline: { bg: 'transparent', fg: 'var(--ink-0)', border: 'var(--ink-0)', hoverBg: 'var(--ink-0)', hoverFg: 'var(--paper-1)' },
    ghost: { bg: 'transparent', fg: 'var(--ink-1)', border: 'transparent', hoverBg: 'var(--paper-2)' },
  }[variant];
  return (
    <button
      type="button" disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: full ? 'flex' : 'inline-flex', width: full ? '100%' : 'auto',
        alignItems: 'center', justifyContent: 'center', gap: sizes.gap, padding: sizes.padding,
        fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)', fontSize: sizes.fontSize,
        fontWeight: 'var(--weight-medium)', letterSpacing: mono ? 'var(--tracking-wide)' : 'var(--tracking-normal)',
        textTransform: mono ? 'uppercase' : 'none', lineHeight: 1,
        color: hover && palettes.hoverFg ? palettes.hoverFg : palettes.fg,
        background: hover && !disabled ? palettes.hoverBg : palettes.bg,
        border: `1.5px solid ${palettes.border}`, borderRadius: 'var(--radius-control)',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
        transform: press && !disabled ? 'translate(1px, 1px)' : 'translate(0,0)',
        transition: 'var(--transition-control)', userSelect: 'none', whiteSpace: 'nowrap', ...style,
      }}
      {...rest}
    >{iconLeft}{children}{iconRight}</button>
  );
}
