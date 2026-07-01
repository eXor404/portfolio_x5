/* PaperPlane — one-shot page-load flourish. A paper dart flies in from the
   top-middle, does a loop-the-loop, then glides off to the middle-left,
   drawing a dashed contrail behind it that fades out once it lands.

   The plane rides the path via CSS offset-path; a masked copy of the same
   path reveals the striped trail in sync (stroke-dashoffset draw-on), and a
   delayed fade clears the trail at the end. ViewBox units = path units, so
   both stay locked together at any screen size. */

// Shared flight path (viewBox 0 0 1200 800). M = start (top-middle),
// the two arcs are the loop, final cubic exits to the middle-left.
const FLIGHT =
  'M 600 -30 C 560 90 510 200 455 300 C 411 300 375 264 375 220 C 375 176 411 140 455 140 C 499 140 535 176 535 220 C 535 264 499 300 455 300 C 360 330 250 372 132 400';

export default function PaperPlane() {
  return (
    <div className="pp-overlay" aria-hidden="true">
      <svg className="pp-svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Mask draws on left→right as the plane advances, revealing the trail. */}
          <mask id="pp-reveal">
            <path
              className="pp-mask-path"
              d={FLIGHT}
              pathLength="100"
              fill="none"
              stroke="#fff"
              strokeWidth="14"
              strokeLinecap="round"
            />
          </mask>
        </defs>

        {/* Striped contrail, revealed through the mask, then faded out. */}
        <path
          className="pp-trail"
          d={FLIGHT}
          mask="url(#pp-reveal)"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="9 9"
        />

        {/* The plane — drawn pointing right, centered on its own origin so
            offset-rotate:auto banks it into every turn. */}
        <g className="pp-plane">
          <g transform="scale(1.35)">
            <path d="M-12 -9 L13 0 L-5 0 Z" fill="var(--accent)" />
            <path d="M-12 9 L13 0 L-5 0 Z" fill="var(--accent-strong)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
