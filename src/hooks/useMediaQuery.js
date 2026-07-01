import { useEffect, useState } from 'react';

/* Subscribe to a CSS media query and re-render when it flips. Syncs on mount
   and on every change; used for the responsive layout switches (stacked
   write-up, mobile footer, narrow-phone placeholders). */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [query]);
  return matches;
}
