/* Eyebrow — the recurring mono, uppercase micro-label ("kicker") that sits over
   headings, section blocks, and rail titles. Tone maps to the common ink/accent
   colors; size, tracking, and any extra layout (margins, borders) come through
   `style`. Pass a raw CSS color to `tone` for one-offs. */
const TONES = {
  accent: 'var(--accent)',
  muted: 'var(--ink-3)',
  dim: 'var(--ink-2)',
  soft: 'var(--ink-1)',
};

export default function Eyebrow({
  children, tone = 'muted', size = 11, tracking = '0.16em', as: As = 'div', style = {}, ...rest
}) {
  return (
    <As style={{
      fontFamily: 'var(--font-mono)', fontSize: size, letterSpacing: tracking,
      textTransform: 'uppercase', color: TONES[tone] || tone, ...style,
    }} {...rest}>
      {children}
    </As>
  );
}
