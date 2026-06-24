/* Card — surface primitive. Square corners via hairline border, optional
   hard-offset "printed" shadow, blueprint corner ticks, and an index label. */
import { useState } from 'react';

function Tick({ pos, color }) {
  const m = -1, len = 9;
  const map = {
    tl: { top: m, left: m, borderTop: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` },
    tr: { top: m, right: m, borderTop: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` },
    bl: { bottom: m, left: m, borderBottom: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` },
    br: { bottom: m, right: m, borderBottom: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` },
  };
  return <span style={{ position: 'absolute', width: len, height: len, pointerEvents: 'none', ...map[pos] }} />;
}

export default function Card({
  children, variant = 'plain', interactive = false, cornerTicks = false, index, style = {}, ...rest
}) {
  const [hover, setHover] = useState(false);
  const palettes = {
    plain: { bg: 'var(--surface-card)', fg: 'var(--ink-0)', border: 'var(--line-0)' },
    raised: { bg: 'var(--surface-card)', fg: 'var(--ink-0)', border: 'var(--ink-0)' },
    sunken: { bg: 'var(--surface-sunken)', fg: 'var(--ink-0)', border: 'var(--line-0)' },
    accent: { bg: 'var(--accent-tint)', fg: 'var(--ink-0)', border: 'var(--accent)' },
    ink: { bg: 'var(--ink-0)', fg: 'var(--paper-1)', border: 'var(--ink-0)' },
  }[variant];
  const lifted = interactive && hover;
  const tickColor = variant === 'ink' ? 'var(--paper-1)' : 'var(--ink-0)';
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', background: palettes.bg, color: palettes.fg,
        border: `1.5px solid ${palettes.border}`, borderRadius: 'var(--radius-card)', padding: 'var(--space-6)',
        boxShadow: lifted ? 'var(--shadow-hard)' : interactive ? 'var(--shadow-hard-sm)' : 'none',
        transform: lifted ? 'translate(-2px,-2px)' : 'translate(0,0)',
        transition: 'box-shadow var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
        cursor: interactive ? 'pointer' : 'default', ...style,
      }}
      {...rest}
    >
      {cornerTicks && ['tl', 'tr', 'bl', 'br'].map((p) => <Tick key={p} pos={p} color={tickColor} />)}
      {index != null && (
        <span style={{
          position: 'absolute', top: 'var(--space-4)', right: 'var(--space-4)', fontFamily: 'var(--font-mono)',
          fontSize: '11px', fontWeight: 'var(--weight-medium)', letterSpacing: 'var(--tracking-label)', color: 'var(--ink-3)',
        }}>{index}</span>
      )}
      {children}
    </div>
  );
}
