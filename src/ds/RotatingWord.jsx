/* RotatingWord — cycles through a list of words with a short fade/lift swap.
   Renders an accent-colored word followed by a period, to match the
   "Let's build something solid." headlines. Honors prefers-reduced-motion. */
import { useEffect, useState } from 'react';

export default function RotatingWord({
  words = ['solid', 'secure', 'fast', 'elegant', 'bold', 'stunning', 'great', 'innovative', 'performant', 'scalable', 'seamless', 'original'],
  interval = 1300,
  style = {},
}) {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (words.length < 2) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const id = setInterval(() => {
      if (reduce) {
        setI((p) => (p + 1) % words.length);
        return;
      }
      setShow(false);
      setTimeout(() => {
        setI((p) => (p + 1) % words.length);
        setShow(true);
      }, 200);
    }, interval);
    return () => clearInterval(id);
  }, [interval, words.length]);

  return (
    <span style={{ color: 'var(--accent)', whiteSpace: 'nowrap', ...style }}>
      <span style={{
        display: 'inline-block',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(0.14em)',
        transition: 'opacity 200ms var(--ease-out), transform 200ms var(--ease-out)',
      }}>{words[i]}.</span>
    </span>
  );
}
