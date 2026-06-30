/* PersistentMap — the Bern swisstopo embed, mounted ONCE for the whole session.

   The geo.admin.ch embed is a full SPA: every time its iframe is created it
   re-boots and re-renders the map from scratch (slow), so HTTP-cache warming
   alone never makes /about feel instant. Instead we create the iframe a single
   time, keep it alive and booted in the app shell, and reveal it over a
   placeholder slot on the /about page. Switching to About then shows an
   already-rendered map immediately.

   Positioning: the card is `position: absolute`, anchored to the DOCUMENT (via a
   portal into <body>), placed at the slot's document coordinates. An absolute
   element is part of the scrolling layer, so it scrolls in perfect sync with the
   page on the compositor — no per-frame JavaScript, no scroll lag. Coordinates
   are only recomputed when layout actually changes (resize / reflow), never on
   scroll. Off /about the card is parked offscreen but stays mounted and booted. */
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';

// Live swisstopo map of Bern: amtliche Vermessung over a void background.
export const BERN_MAP_SRC = 'https://map.geo.admin.ch/#/embed?lang=en&center=2600502.27,1199690.59&z=8&topic=ech&layers=ch.bfs.gebaeude_wohnungs_register,f;ch.bav.haltestellen-oev,f;ch.swisstopo.swisstlm3d-wanderwege,f;ch.astra.wanderland-sperrungen_umleitungen,f;ch.swisstopo-vd.amtliche-vermessung&bgLayer=void&featureInfo=default&catalogNodes=ech,457,458';

// Tiny store so /about can hand its placeholder element to this shell component.
let slotEl = null;
const slotListeners = new Set();
export function setMapSlot(el) {
  slotEl = el;
  slotListeners.forEach((fn) => fn());
}

export default function PersistentMap() {
  const { pathname } = useLocation();
  const wrapRef = useRef(null);
  // Gate creating the heavy iframe: on /about now, elsewhere after a short delay
  // so it never competes with first paint. Guarded by state (not a ref) so it
  // survives StrictMode's double-invoke in dev.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;
    if (pathname === '/about') { setReady(true); return; }
    const id = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(id);
  }, [pathname, ready]);

  // Place the card at the slot's document coordinates. Recomputed on layout
  // changes only — scrolling needs no update because an absolute element already
  // travels with the document.
  useEffect(() => {
    if (!ready) return;

    const place = () => {
      const el = wrapRef.current;
      if (!el) return;
      if (!slotEl) { el.style.visibility = 'hidden'; el.style.top = '-99999px'; el.style.left = '0px'; return; }
      const r = slotEl.getBoundingClientRect();
      el.style.top = `${r.top + window.scrollY}px`;
      el.style.left = `${r.left + window.scrollX}px`;
      el.style.width = `${r.width}px`;
      el.style.height = `${r.height}px`;
      el.style.visibility = 'visible';
    };

    const hasRO = typeof ResizeObserver !== 'undefined';
    let slotRO = null;
    const observeSlot = () => {
      if (slotRO) { slotRO.disconnect(); slotRO = null; }
      if (slotEl && hasRO) { slotRO = new ResizeObserver(place); slotRO.observe(slotEl); }
    };
    const onSlotChange = () => { observeSlot(); place(); };

    // Body reflow (image/font load, content above the slot growing) moves the
    // slot's document position; re-place when the page's box changes.
    const bodyRO = hasRO ? new ResizeObserver(place) : null;
    bodyRO?.observe(document.body);

    slotListeners.add(onSlotChange);
    window.addEventListener('resize', place);
    window.addEventListener('load', place);
    observeSlot();
    place();
    // Late corrections for layout that settles after first paint.
    const t1 = setTimeout(place, 300);
    const t2 = setTimeout(place, 1200);

    return () => {
      slotListeners.delete(onSlotChange);
      slotRO?.disconnect();
      bodyRO?.disconnect();
      window.removeEventListener('resize', place);
      window.removeEventListener('load', place);
      clearTimeout(t1); clearTimeout(t2);
    };
  }, [ready]);

  if (!ready) return null;

  const card = (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position: 'absolute', top: -99999, left: 0, width: 320, height: 620,
        visibility: 'hidden', zIndex: 1, pointerEvents: 'none',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        border: '1.5px solid var(--ink-0)', background: 'var(--surface-card)',
        boxSizing: 'border-box',
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px',
        borderBottom: '1.5px solid var(--ink-0)', fontFamily: 'var(--font-mono)', fontSize: 10,
        letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)', flex: '0 0 auto',
      }}>
        <span style={{ color: 'var(--ink-1)' }}>Bern · CH</span>
        <span>swisstopo</span>
      </div>
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
        <iframe
          title="Map of Bern — geo.admin.ch"
          src={BERN_MAP_SRC}
          tabIndex={-1}
          scrolling="no"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '330%', height: '330%',
            transform: 'translate(calc(-50% - 70px), -50%) scale(0.48)',
            transformOrigin: 'center center',
            border: 0, pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );

  return createPortal(card, document.body);
}
