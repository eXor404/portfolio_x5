/* IconButton — square icon-only control. Matches Button's interaction model. */
import { useState } from 'react';

export default function IconButton({
  children, variant = 'outline', size = 'md', label, disabled = false, style = {}, ...rest
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const dim = { sm: 32, md: 40, lg: 52 }[size];
  const palettes = {
    solid: { bg: 'var(--ink-0)', fg: 'var(--paper-1)', border: 'var(--ink-0)', hoverBg: 'var(--ink-1)' },
    accent: { bg: 'var(--accent)', fg: 'var(--text-on-accent)', border: 'var(--accent)', hoverBg: 'var(--accent-strong)' },
    outline: { bg: 'transparent', fg: 'var(--ink-0)', border: 'var(--ink-0)', hoverBg: 'var(--ink-0)', hoverFg: 'var(--paper-1)' },
    ghost: { bg: 'transparent', fg: 'var(--ink-1)', border: 'transparent', hoverBg: 'var(--paper-2)' },
  }[variant];
  return (
    <button
      type="button" aria-label={label} disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: dim, height: dim, padding: 0,
        color: hover && palettes.hoverFg ? palettes.hoverFg : palettes.fg,
        background: hover && !disabled ? palettes.hoverBg : palettes.bg,
        border: `1.5px solid ${palettes.border}`, borderRadius: 'var(--radius-control)',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
        transform: press && !disabled ? 'translate(1px,1px)' : 'translate(0,0)',
        transition: 'var(--transition-control)', ...style,
      }}
      {...rest}
    >{children}</button>
  );
}
