/* AUTO-GENERATED from per-project repo analysis. Edit the source repos or the
   generator, not this file by hand. Facts are grounded in the real codebases;
   screenshots live in /public/shots and are framed as Mac windows on the
   detail page. */
export const PROJECT_DETAILS = {
  "argus": {
    "facts": [
      {
        "label": "Lines of code",
        "value": "~6.3k"
      },
      {
        "label": "Source files",
        "value": "44"
      },
      {
        "label": "Live data layers",
        "value": "5"
      },
      {
        "label": "Runtime deps",
        "value": "8"
      },
      {
        "label": "Commits",
        "value": "43"
      },
      {
        "label": "Cesium ion token",
        "value": "None"
      }
    ],
    "overview": "Argus is a dark command-center web app that fuses open-source, near-real-time situational data into one interactive 3D globe. Aircraft, satellites, earthquakes, vessels, and global event signals all normalize into a single entity model and render as glowing, click-to-inspect markers over a vector hologram Earth. A Fastify backend polls every upstream source once and fans the result out to all clients, so the browser never touches a third-party API directly.",
    "technical": [
      "The backend is a single Fastify service that owns every upstream relationship. A generic interval poller fetches each source on its own budgeted cadence, normalizes the response into one Entity shape keyed by layer and category, and writes it into an in-memory registry that doubles as a pub/sub hub. One poll feeds every client. The registry stamps each layer with a monotonic revision and assembles a consolidated world snapshot on a fixed cadence, so a client request is always a cheap read of pre-built state and never triggers an external fetch. The server exposes both an SSE stream and a consolidated poll endpoint; the live client polls only the layers the operator has switched on, skips any layer whose revision has not changed, and frees a layer's data the instant it is toggled off.",
      "The hardest rendering problem is satellites. SGP4 orbital propagation is the single heaviest CPU operation in the app, and running it on the render thread caused periodic frame stalls. Argus moves it into a dedicated Web Worker that builds SGP4 records once, then on each throttled tick propagates every satellite and posts back Earth-fixed positions as a transferable Float32Array, leaving the main thread to do nothing but a km-to-meter scale and a billboard assignment. Selecting a satellite spawns a separate worker request that samples one full orbital period at a single GMST, producing a frozen inertial ellipse that closes exactly on its first point. Satellites are propagated entirely client-side from TLEs cached server-side, so smooth orbital motion costs zero ongoing API calls.",
      "Argus renders a vector Earth rather than photographic tiles, which removes the need for any Cesium ion token or imagery key. Coastlines, borders, rivers, lakes, topographic contours, and submarine cables ship as bundled GeoJSON and are lifted off the WGS84 ellipsoid to a precisely chosen 60 km float height that wins the depth test against the globe at planetary scale without z-fighting. The lift uses the closed-form geodetic surface normal instead of the iterative Cartographic inversion, verified identical to roughly a nanometer, which meaningfully cuts boot-time main-thread load when tens of thousands of vertices are repositioned. Plain polylines avoid ground classification entirely so the wireframe renders on software GPUs.",
      "Resilience is designed in rather than bolted on. Every poller logs and swallows its own errors so one failing source can never take the server down, and the registry keeps the last good cache while flagging the failed layer in a health map streamed to clients. Sources degrade gracefully: OpenSky runs anonymously or lifts its rate limit with OAuth2 client credentials, AIS vessels stream live over WebSocket when a key is present or fall back to a labelled synthetic fleet on real shipping lanes, and GDELT falls back to a labelled synthetic signal when throttled. No data-source secret ever reaches the browser. Production ships as a Docker multi-stage build behind Caddy, which serves the built SPA and SSE-aware reverse-proxies the API."
    ],
    "highlights": [
      {
        "label": "One poll, all clients",
        "text": "A single Fastify backend polls every source on a budgeted cadence and fans normalized snapshots out through an in-memory pub/sub registry, so the browser never hits a third-party API and a client request is always a cheap read of pre-built state."
      },
      {
        "label": "Off-thread SGP4",
        "text": "Satellite orbital propagation runs in a Web Worker and posts back Earth-fixed positions as transferable Float32Arrays, killing the render-thread stall and driving GPU-batched billboards at zero ongoing API cost."
      },
      {
        "label": "Keyless vector globe",
        "text": "A hologram Earth built from bundled GeoJSON, lifted to a depth-safe 60 km float height via the closed-form geodetic normal, needs no Cesium ion token and renders even on software GPUs."
      },
      {
        "label": "Revision-aware layers",
        "text": "Each layer carries a monotonic revision and is loaded only when the operator enables it, skipped when unchanged, and freed the moment it is switched off."
      },
      {
        "label": "Graceful degradation",
        "text": "Every source has a fallback path, anonymous or keyed OpenSky, live or simulated AIS, real or synthetic GDELT, and a failing poll keeps the last good cache while flagging health to clients."
      }
    ],
    "stack": [
      "React 18",
      "TypeScript",
      "Vite",
      "CesiumJS",
      "Resium",
      "satellite.js",
      "Web Workers",
      "Zustand",
      "Fastify",
      "Server-Sent Events",
      "Docker",
      "Caddy"
    ],
    "shot": "/shots/argus.png",
    "shotLabel": "argus"
  },
  "csweb": {
    "facts": [
      {
        "label": "Lines of code",
        "value": "~3.3k"
      },
      {
        "label": "Source files",
        "value": "29 JS modules"
      },
      {
        "label": "Commits",
        "value": "33 in 6 days"
      },
      {
        "label": "Runtime deps",
        "value": "1 (ws)"
      },
      {
        "label": "Build step",
        "value": "None"
      },
      {
        "label": "Netcode",
        "value": "Server-authoritative"
      }
    ],
    "overview": "CS Web is a first-person 3D Counter-Strike duel that runs entirely in the browser. Two players connect over WebSockets and fight authoritative 1v1 rounds with an economy, a buy menu and CS 1.6 weapon feel, first to five round wins. The whole client is hand-written Three.js in ES modules with no bundler, and the server is a single Node process with exactly one dependency.",
    "technical": [
      "The architecture is split cleanly between a thin authoritative server and a predictive client. The Node server (server.js plus a static file server, a mode-agnostic room registry and a matchmaking lobby) holds the source of truth for HP, armor, money, score and round phase. Clients simulate their own movement and shooting locally and report hit events, then modes/duel.js validates them, caps damage, applies armor and headshot rules, awards kill and round money and drives the round state machine. Game modes are pluggable: rooms carry a mode object exposing startMatch and handleMessage, so a second mode such as bomb defuse slots in without touching matchmaking or combat.",
      "Combat is genuine hitscan. weapons.js fires a Three.js raycaster from the eye against per-body-part hitboxes, distinguishing head from body, and folds in a real first-person shooting model: per-weapon base spread, a movement penalty that scales with 2D speed, vertical recoil with horizontal drift, distance falloff and shotgun pellet spread. The AWP is laser-accurate only while scoped and standing still and sprays like a no-scope the moment you move, and a knife backstab is a lethal hit that punches straight through kevlar. The constants file is pure data, so every weapon and price is tunable in one place.",
      "Movement is a custom kinematic controller, not a physics library. movement.js does axis-wise AABB collision with sliding along walls, step-up onto low boxes, ramp following, jump and gravity, all built on a documented height grid where half boxes (1 m) are jumpable and full boxes (2 m) require a ramp. The map itself is procedural: map.js builds the arena geometry, a decorative city skyline and a border with deterministic canvas textures, and exposes builder functions plus a surfaceHeight() query that the controller and the remote player both read.",
      "The remaining systems are equally deliberate. The remote player is interpolated with position and angle lerping, animated legs and distance-scaled footstep and gunshot audio, and peer shots are replayed locally as tracers and impact decals. Audio layers real CS 1.6 samples over a WebAudio synthesizer that fills in while samples load and generates the UI and kill music. There is no build step at all: the client loads Three.js r160 through an import map from a CDN and ships raw ES modules. It is also an installable PWA with a service worker, and a self-contained mobile overlay emulates keyboard and mouse so desktop play stays byte-for-byte identical. Three test harnesses back it up: a two-client WebSocket protocol test, a headless Chrome rendering test and a synthetic-touch mobile end-to-end test."
    ],
    "highlights": [
      {
        "label": "Authoritative netcode",
        "text": "Server owns HP, armor, money, score and round phase; clients predict and report hits, the server validates and caps damage."
      },
      {
        "label": "Real shooting model",
        "text": "Hitscan raycasts with head and body hitboxes, movement-scaled spread, recoil, falloff, shotgun pellets and scoped-AWP accuracy."
      },
      {
        "label": "Custom movement",
        "text": "Hand-written AABB collision with wall sliding, step-up, ramps and gravity on a documented half-box height grid."
      },
      {
        "label": "Zero build step",
        "text": "Raw ES modules with an import map for Three.js r160; one runtime dependency (ws) on the server."
      },
      {
        "label": "Pluggable modes and PWA",
        "text": "Mode-agnostic rooms, an installable service-worker PWA, and a touch overlay that leaves desktop play unchanged."
      }
    ],
    "stack": [
      "Three.js (r160, CDN import map)",
      "WebSockets (ws)",
      "Node.js",
      "WebAudio API",
      "HTML5 Canvas textures",
      "ES modules",
      "PWA / Service Worker"
    ],
    "shot": "/shots/csweb.png",
    "shotLabel": "cs web"
  },
  "flashy": {
    "facts": [
      {
        "label": "Lines of code",
        "value": "~6.5k"
      },
      {
        "label": "Source files",
        "value": "46"
      },
      {
        "label": "Commits",
        "value": "70"
      },
      {
        "label": "Subdomains",
        "value": "3 (app / site / api)"
      },
      {
        "label": "Backend",
        "value": "Self-hosted Convex"
      },
      {
        "label": "Scheduling",
        "value": "SM-2 algorithm"
      }
    ],
    "overview": "Flashie is a spaced-repetition flashcard PWA built on a fully self-hosted Convex backend running over Postgres. It ships as three subdomains, app, landing, and API, with reactive queries driving the SM-2 review scheduler, a timezone-aware stats engine, and an installable offline-capable client. The whole stack deploys from a single git tag through a Docker and GitHub Actions pipeline.",
    "technical": [
      "The backend is Convex run in self-hosted mode against Postgres 16, using the official convex-backend image rather than the managed cloud. The schema models users, decks, cards, stars, and a full review log, with carefully chosen compound indexes. A by_user_due index over (userId, dueAt) lets the due-card queries fetch only overdue cards in index order, so the most-overdue cards surface first without scanning the table. Authentication is Convex Auth with username and password, wired through HTTP routes and JWT keys generated at setup time.",
      "Scheduling is a faithful SM-2 implementation in reviews.ts. Each review recomputes the ease factor with the classic SM-2 formula, clamps it to a 1.3 floor, resets the repetition streak on a failed grade, and advances the interval through the 1, 6, then interval times ease progression. Every review is persisted with its before and after interval and ease factor, which gives the app a complete, auditable history rather than only the card's current state.",
      "The stats query turns that review log into a study dashboard entirely server-side. It buckets reviews into local days using a client-supplied timezone offset, then derives current and longest streaks, a roughly 17-week contribution heatmap, pass accuracy, mastered-card counts at the 21-day maturity threshold, and a forward due forecast that rolls all overdue cards into today. The day-index math is done with integer arithmetic so the buckets stay stable across DST and timezones.",
      "The frontend is React 18, Vite, and Tailwind, shipped as a PWA via vite-plugin-pwa with an autoUpdating service worker and a standalone install manifest. A Vite alias maps #convex to the backend's convex directory so the client imports Convex's generated, fully typed API directly, giving end-to-end type safety across the wire. Delivery is automated: pushing a v* tag deploys the Convex functions, builds a multi-stage Docker image with VITE_CONVEX_URL baked in, pushes it to GHCR, and SSH-deploys it behind nginx with immutable asset caching and SPA fallback."
    ],
    "highlights": [
      {
        "label": "Self-hosted Convex",
        "text": "Runs the open-source convex-backend image over Postgres 16 in Docker, not the managed cloud, with a one-command setup.sh that generates secrets, admin keys, and JWT material."
      },
      {
        "label": "SM-2 scheduler",
        "text": "Classic SuperMemo-2 spaced repetition with ease-factor clamping and streak reset, and every review stored with its full before/after state for an auditable history."
      },
      {
        "label": "Timezone-aware stats",
        "text": "Server-side streaks, a 17-week heatmap, accuracy, and a due forecast, all bucketed by the user's local day with integer day-index math."
      },
      {
        "label": "Installable PWA",
        "text": "autoUpdating service worker, standalone manifest, and bulk CSV/TSV card import with auto-detected separators and front/back swap."
      },
      {
        "label": "Tag-to-prod pipeline",
        "text": "A single v* tag deploys Convex functions, builds and pushes a Docker image to GHCR, and SSH-deploys it behind nginx across three subdomains."
      }
    ],
    "stack": [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Convex (self-hosted)",
      "Convex Auth",
      "Postgres 16",
      "PWA (vite-plugin-pwa)",
      "Radix UI",
      "Docker / Docker Compose",
      "nginx",
      "GitHub Actions"
    ],
    "shot": "/shots/flashy.png",
    "shotLabel": "flashie"
  },
  "flux": {
    "facts": [
      {
        "label": "Lines of code",
        "value": "~1.2k"
      },
      {
        "label": "Dependencies",
        "value": "Zero"
      },
      {
        "label": "Build step",
        "value": "None"
      },
      {
        "label": "Field modes",
        "value": "6"
      },
      {
        "label": "Source files",
        "value": "8"
      },
      {
        "label": "Noise solver",
        "value": "3D Perlin"
      }
    ],
    "overview": "Flux is a generative flow-field studio that runs entirely in the browser with no build step and no dependencies. Thousands of particles are advected through a seedable 3D Perlin noise field that you sculpt in real time with the cursor, then rendered as glowing neon trails on a single 2D canvas. The whole simulation is roughly 800 lines of vanilla JavaScript wired together as plain IIFE modules.",
    "technical": [
      "The core is a fixed particle pool advected through a vector field. Each frame every particle samples the field at its position to get an acceleration, integrates velocity with damping and a speed cap, and draws a single line segment from its old position to its new one. A low-alpha background repaint each frame fades older segments into long flowing trails, and particle color is mapped to instantaneous speed through a precomputed 256-entry palette ramp, so the field reads as a velocity map rather than a flat cloud.",
      "The field itself is a self-contained 3D Perlin noise implementation seeded by a mulberry32 PRNG, with time fed into the z axis so the field evolves smoothly instead of looping. Six interchangeable field generators (flow, vortex, gravity, magnetic, ripple, spiral) each return an acceleration for a given particle, and the cursor injects a radial force within an adjustable influence radius whose polarity flips between attract and repel on click. Because the noise is seedable, reseeding is deterministic and shareable.",
      "Rendering leans on the 2D canvas additive composite mode (globalCompositeOperation 'lighter') for an optional bloom that makes overlapping particles glow like neon, with device-pixel-ratio scaling capped at 2 to stay sharp without melting fill rate. The architecture is deliberately framework-free: a single live state object in main.js is the only source of truth, the UI mutates it directly, and the render loop reads it every frame, so there is no diffing, no reconciliation, and no bundler.",
      "Around the simulation sits a surprisingly complete feature set built on raw browser APIs. Full configuration is serialized to base64 and encoded into the URL hash for shareable permalinks, with the last session mirrored to localStorage; live canvas capture to a downloadable .webm clip uses MediaRecorder over canvas.captureStream; and an optional audio-reactive mode pulls microphone input through the Web Audio AnalyserNode to drive the field's energy. A kiosk URL flag strips the HUD and starts auto-pilot for a full-bleed ambient display."
    ],
    "highlights": [
      {
        "label": "Six field modes",
        "text": "Flow, vortex, gravity, magnetic, ripple, and spiral generators, each a pure function returning an acceleration, switchable live."
      },
      {
        "label": "Shareable permalinks",
        "text": "The full config is base64-encoded into the URL hash, so a link restores the exact look. The last session also persists to localStorage."
      },
      {
        "label": "Record and export",
        "text": "Save the current frame to PNG, or capture the live canvas to a downloadable .webm clip via MediaRecorder and captureStream."
      },
      {
        "label": "Audio-reactive field",
        "text": "Optional microphone input is routed through a Web Audio AnalyserNode so the field's energy pulses to live sound."
      },
      {
        "label": "Kiosk and auto-pilot",
        "text": "An idle focal point drifts on its own and a ?kiosk flag hides the HUD for a clean full-bleed ambient display."
      }
    ],
    "stack": [
      "Vanilla JavaScript",
      "Canvas 2D",
      "Perlin noise",
      "Web Audio API",
      "MediaRecorder API",
      "Docker",
      "nginx",
      "GitHub Actions"
    ],
    "shot": "/shots/flux.png",
    "shotLabel": "flux · field studio"
  },
  "git-art": {
    "facts": [
      {
        "label": "Lines of code",
        "value": "~0.8k"
      },
      {
        "label": "Runtime dependencies",
        "value": "Zero"
      },
      {
        "label": "Build step",
        "value": "None"
      },
      {
        "label": "Commits",
        "value": "16"
      },
      {
        "label": "Grid",
        "value": "53 weeks x 7 days"
      },
      {
        "label": "Deploy",
        "value": "Docker, GHCR, SSH"
      }
    ],
    "overview": "git-art is a single-file web tool that turns a GitHub contribution graph into a canvas. You paint pixel art onto a GitHub-style grid, or drop in an image and watch it quantize to the five-level green palette, then export a ready-to-run bash script of backdated commits that reproduces the artwork on a real profile. The entire app is one 774-line HTML document with zero runtime dependencies, deployed as a Docker image and live at git-art.net.",
    "technical": [
      "The whole application lives in one self-contained HTML file. Markup, CSS, and vanilla JavaScript ship together with no framework, no bundler, and no build step. The only dependency anywhere in the project is npx serve, used purely to host the static file. This keeps the surface area tiny and the thing trivially portable, which is why the Dockerfile is six lines and the app runs the same locally, in a container, and in production.",
      "The interesting work is in the calendar math. The grid is reconstructed exactly the way GitHub lays it out: it walks back from January 1 to the preceding Sunday, computes the real number of weeks for the chosen year, and maps every cell to a concrete date with helpers for which cells fall inside the year and where each month label belongs. Cells outside the year are dimmed and inert. A year selector spans five years back to two years forward, rebuilding the grid and its month and weekday labels on every change. Painting is a drag-aware mousedown plus mouseenter loop with a five-step palette that mirrors GitHub's dark-theme greens.",
      "Image import is a small image-processing pipeline on a hidden canvas. An uploaded or dropped image is fit to the grid aspect ratio, then positioned and scaled with a directional crop pad and a size slider. The visible cell area is drawn into an off-screen canvas sized to the grid, sampled per cell, and converted to one of five levels using a luminance formula (299/587/114 weighting) with an optional invert and full alpha handling so transparent regions read as empty. A live pixelated preview renders the result before it is stamped onto the real grid.",
      "Export turns the grid into a deterministic bash script. Painted cells are collected, filtered to in-year dates, sorted chronologically, and emitted as per-day commit loops that set GIT_AUTHOR_DATE and GIT_COMMITTER_DATE to backdate each commit, with configurable commit counts per color level so the brightest green can be pushed above the user's existing daily maximum (GitHub's graph is relative). The script tracks every file it creates and cleans them up with a final git rm commit, so the artwork stays but the scaffolding does not. Output can be copied or downloaded as git-art-YEAR.sh. CI builds and pushes a Docker image to GHCR and, on tags, SSH-deploys it to the server."
    ],
    "highlights": [
      {
        "label": "Single file, zero deps",
        "text": "Markup, styles, and logic in one 774-line HTML document with no framework and no build step."
      },
      {
        "label": "Faithful GitHub grid",
        "text": "Reconstructs the exact contribution layout, walking back to the prior Sunday and computing real week counts and month labels per year."
      },
      {
        "label": "Image to pixels",
        "text": "Drop an image, position and scale it, and a hidden-canvas luminance pass quantizes it to the five-level green palette with invert and alpha support."
      },
      {
        "label": "Backdated commit script",
        "text": "Exports a deterministic bash script that sets author and committer dates per day and self-cleans its scaffolding files afterward."
      },
      {
        "label": "Container-native deploy",
        "text": "GitHub Actions builds to GHCR and SSH-deploys the tagged image, restart-always, behind git-art.net."
      }
    ],
    "stack": [
      "HTML",
      "CSS",
      "Vanilla JavaScript",
      "Canvas API",
      "Bash",
      "Docker",
      "GitHub Actions",
      "GHCR"
    ],
    "shot": "/shots/git-art.png",
    "shotLabel": "git-art.net"
  },
  "mdslides": {
    "facts": [
      {
        "label": "Lines of code",
        "value": "~1.7k"
      },
      {
        "label": "Runtime deps",
        "value": "10"
      },
      {
        "label": "Dev dependencies",
        "value": "0"
      },
      {
        "label": "Commits",
        "value": "28"
      },
      {
        "label": "Outputs",
        "value": "Dev, static, PDF"
      },
      {
        "label": "Published",
        "value": "npm"
      }
    ],
    "overview": "mdslides is a zero-config CLI that turns one markdown file into a presentation. Point it at a folder and it scaffolds a starter deck, then serves it with live reload, builds a self-contained static site you can host anywhere, or prints it to PDF. The whole rendering engine, including a custom unified pipeline and a from-scratch slide runtime, fits in under 1,700 lines with no dev dependencies.",
    "technical": [
      "The core idea is that one markdown file is the entire deck. A hand-written splitter walks the source line by line, tracking fenced code state so a `#` inside a code block never starts a new slide, and treats every H1 or a standalone `---` as a slide boundary. YAML frontmatter is stripped, a `{{date}}` token resolves at render time, and per-slide HTML comment directives (`center`, `bg=`, `title`, `plain`, `class=`) configure individual slides without leaving markdown.",
      "Rendering runs through a bespoke unified pipeline rather than Astro's content layer. remark parses GFM and math, then a chain of custom plugins rewrites relative image paths to source-rooted URLs, promotes `{.fragment}` markers and every list item into staged reveal fragments, and runs a layout transform that lifts the heading into a fixed header and splits the body into a prose-left, media-right two-column grid. Code is highlighted with Shiki and math with KaTeX, both wired in as plugins so the deck theme keeps full control of the surrounding markup.",
      "The presentation runtime is plain inline JavaScript with no framework. It fits a fixed 1280x720 canvas into any viewport with a single CSS transform, drives slide and fragment state from keyboard, click zones, and chrome buttons, syncs the current slide to the URL hash for deep links, and adds an overview grid, fullscreen, black-screen, and a light or dark theme toggle. The same slide data feeds a separate `/print` route that lays every slide out one per page with all fragments shown.",
      "PDF export is the sharp engineering. A shared helper locates a headless Chrome, Chromium, Edge, or Brave binary across macOS, Windows, and Linux, prints the `/print` route, and works around Chrome's `--headless=new` not exiting cleanly by polling the output file until its size stabilizes, then killing the process. The dev server exposes this as a `/__export.pdf` middleware that streams a pixel-accurate download, and the CLI's `export` command spins up a throwaway preview server on a random port to do the same offline, falling back to Playwright or to browser Save-as-PDF when no browser is found."
    ],
    "highlights": [
      {
        "label": "One file is the deck",
        "text": "A fence-aware splitter turns a single markdown file into slides at every H1 or `---`, with `{{date}}` tokens and per-slide HTML comment directives for centering, backgrounds, and layout."
      },
      {
        "label": "Custom unified pipeline",
        "text": "remark and rehype plugins handle image path rewriting, automatic per-bullet fragment reveals, and a prose-left media-right layout transform, with Shiki and KaTeX for code and math."
      },
      {
        "label": "Framework-free runtime",
        "text": "A self-scaling 1280x720 stage with keyboard, click-zone and hash navigation, an overview grid, fullscreen, black screen, and a light/dark toggle, all in inline vanilla JS."
      },
      {
        "label": "Cross-platform PDF export",
        "text": "Finds any installed Chromium-family browser, prints the deck headless, and settles Chrome's unreliable exit by polling output size, with Playwright and manual fallbacks."
      },
      {
        "label": "Three outputs, zero config",
        "text": "Live-reloading dev server, a self-contained static build that copies every source asset into dist/, and a one-page-per-slide PDF, all from the same deck with no setup."
      }
    ],
    "stack": [
      "Node.js",
      "Astro",
      "Vite",
      "unified (remark/rehype)",
      "Shiki",
      "KaTeX",
      "JavaScript",
      "TypeScript",
      "CLI",
      "npm"
    ],
    "shot": "/shots/mdslides.png",
    "shotLabel": "mdslides.mdstack.dev"
  },
  "mdstack": {
    "facts": [
      {
        "label": "Lines of code",
        "value": "~8.2k"
      },
      {
        "label": "Source files",
        "value": "50"
      },
      {
        "label": "Runtime deps",
        "value": "5"
      },
      {
        "label": "Built-in themes",
        "value": "4"
      },
      {
        "label": "Commits",
        "value": "39"
      },
      {
        "label": "Published",
        "value": "npm @exor404/mdstack"
      }
    ],
    "overview": "mdstack is a zero-config static-site CLI: point it at a folder of markdown and it either serves the files with hot reload or builds a self-contained dist/ you can deploy to any static host. A thin Node binary scaffolds a config and a homepage on first run, then drives a bundled Astro app that turns every .md into a route, ships every other file untouched, and renders four hand-built themes with server-side math and syntax highlighting.",
    "technical": [
      "The CLI is a 154-line Node entry point with hand-rolled argument parsing and zero parsing dependencies. It resolves the target folder, writes a default mdstack.config.js and a starter index.md on first run, validates the theme, then sets MD_SOURCE and MD_THEME in the environment and programmatically invokes Astro's dev, build, or preview APIs against an Astro app that lives inside the package. The user's markdown never enters the package tree: an Astro content collection uses a glob loader rooted at MD_SOURCE, and a catch-all [...slug].astro maps each file to a route, with index.md becoming the homepage and frontmatter title and order driving the nav.",
      "Markdown rendering is extended with three custom remark plugins on top of remark-math and rehype-katex. One rewrites relative image paths to absolute paths from the source root and, importantly, contains them: any target that resolves outside the source folder is rejected, the same path-traversal guard applied byte for byte in the dev asset middleware. A second parses GitHub-style callouts (NOTE, TIP, IMPORTANT, WARNING, CAUTION) into labeled, icon-prefixed blockquotes, and a third turns ==text== into <mark>. Math is rendered server-side via KaTeX, code is highlighted with Shiki using a per-theme palette, and mermaid is loaded lazily through a dynamic import that only fires on pages that actually contain a diagram.",
      "Asset handling is a single Astro integration that does double duty. In dev it installs a Connect middleware that serves any non-markdown file straight from the source folder with correct MIME types, range-safe HEAD handling, and exclusion of dotfiles and build directories. At build time it walks the source tree, copies every non-.md file into dist for a self-contained output, then emits robots.txt always and sitemap.xml when a site URL is configured, while deferring to any user-supplied robots or sitemap. The client layer adds a localStorage theme toggle, an IntersectionObserver scroll-spy table of contents, heading anchor deep-links, and a cmd-K command palette that searches a build-time index of titles, headings, and body prose with highlighted snippet matches.",
      "The package treats publishing as a controlled surface. A prepublishOnly guard runs npm pack in dry-run mode and refuses to publish if the tarball exceeds 500 kB or contains forbidden paths such as node_modules, build output, or the example folder, keeping the shipped CLI lean. The four themes are roughly 3,800 lines of hand-written CSS, each paired with a matching Shiki code theme. A separate marketing site, also built with Astro, is containerized with nginx and shipped through a tag-triggered GitHub Actions workflow that builds the image and pushes it to the registry."
    ],
    "highlights": [
      {
        "label": "Zero-config",
        "text": "First run scaffolds a config and a working homepage; markdown in, deployable static site out, with no build setup to write."
      },
      {
        "label": "Self-contained builds",
        "text": "Every non-markdown file in the source folder is copied into dist, so images, fonts, and downloads ship with the site for any static host."
      },
      {
        "label": "Rich markdown",
        "text": "GFM, server-side KaTeX math, Shiki highlighting, GitHub-style callouts, ==highlight== marks, and lazy-loaded mermaid diagrams."
      },
      {
        "label": "cmd-K search",
        "text": "A build-time index over titles, headings, and body text powers a command palette with highlighted prose snippets, no runtime search service."
      },
      {
        "label": "Publish guard",
        "text": "A prepublish check rejects bloated tarballs over 500 kB or any build artifact, enforcing a lean npm package on every release."
      }
    ],
    "stack": [
      "Node.js",
      "Astro",
      "Markdown",
      "remark / rehype",
      "KaTeX",
      "Shiki",
      "Mermaid",
      "TypeScript",
      "CLI",
      "npm"
    ],
    "shot": "/shots/mdstack.png",
    "shotLabel": "mdstack.dev"
  },
  "meridian": {
    "facts": [
      {
        "label": "Lines of code",
        "value": "~2.7k"
      },
      {
        "label": "Solver dependencies",
        "value": "Zero"
      },
      {
        "label": "Build step",
        "value": "None (type-stripped TS)"
      },
      {
        "label": "Languages",
        "value": "TypeScript, Python, SQL"
      },
      {
        "label": "ALNS operators",
        "value": "3 destroy / 2 repair"
      },
      {
        "label": "Unit tests",
        "value": "13 (solver + routing)"
      }
    ],
    "overview": "Meridian is a real-time fleet routing and dispatch platform built around a from-scratch metaheuristic solver for the Vehicle Routing Problem with Time Windows, the NP-hard problem at the core of every last-mile and field-service operation. It plans cost-optimal routes across a multi-depot fleet under capacity, time-window, skill, and shift constraints, tracks vehicles live on a map, and re-optimizes in place as rush orders and breakdowns arrive. The solver core is pure TypeScript with zero external dependencies and runs straight from source with no build step.",
    "technical": [
      "The heart of the project is a custom VRPTW engine implemented in plain TypeScript. It builds a starting solution with regret-2 insertion, then runs Adaptive Large Neighborhood Search: three constraint-aware destroy operators (random, worst-removal, and Shaw/related removal) paired with two repair operators (greedy and regret-2), selected by roulette wheel from weights that are re-scored every 100 iterations based on the rewards each operator earned. Acceptance follows a simulated-annealing schedule with cooling, reheat-on-stagnation, and intensification around the incumbent best. A deterministic mulberry32 PRNG makes any seed reproduce the same plan, and a final intra-route 2-opt polish removes residual crossings. The weighted objective balances travel cost, lateness, overtime, and an unassigned-order penalty, with hard checks for capacity, time windows, vehicle skills, and shift windows scheduled per route.",
      "Routing is built behind a pluggable RoutingProvider interface. The default HaversineRouter computes a symmetric travel-time matrix (upper triangle only, then mirrored), applies a circuity factor so road distance is not treated as a straight line, layers a time-of-day congestion speed profile, and caches matrices in an LRU keyed by points, departure minute, and speed multiplier. An MlRouter decorates it: it fetches a learned speed multiplier from the Python service with a TTL cache, rejects NaN or out-of-range predictions so a bad model cannot corrupt routing, and falls back to the built-in congestion curve when the service is unavailable, so optimization never blocks on ML.",
      "The dynamic side is genuinely incremental rather than a full re-solve. The /replan endpoint can inject rush orders, then warm-starts ALNS from the previous plan's assignment, places only the newly added orders, and re-optimizes under a tight time budget. The response includes a plan diff counting how many stops were reassigned versus newly served. A Fastify WebSocket streams simulated telemetry from a SimEngine that animates vehicles along the schedule baked into each plan and persists pings to PostGIS, while the React and MapLibre console renders per-vehicle routes, a KPI bar, a live solver convergence chart, and the reassignment diff.",
      "Supporting layers are deliberately lean. Persistence is PostgreSQL with PostGIS, using GEOGRAPHY(POINT, 4326) columns, GiST spatial indexes, a nearest-depot lookup, and raw-SQL migrations with a seeded scenario on boot. The travel-time model is a gradient-boosted regressor of decision stumps written from scratch in numpy, trained on a synthetic congestion curve and served over FastAPI to predict per-departure speed multipliers. The whole thing is an npm-workspace monorepo (core, routing, solver, api, web) where the solver and routing packages run their unit tests directly through node --experimental-strip-types, with no transpile or bundler in the path, and CI builds the solver tests, the web bundle, and all Docker images."
    ],
    "stack": [
      "TypeScript",
      "Node.js",
      "Fastify",
      "WebSocket",
      "React",
      "MapLibre GL",
      "Vite",
      "PostgreSQL + PostGIS",
      "Python",
      "FastAPI",
      "NumPy",
      "Docker Compose"
    ],
    "highlights": [
      {
        "label": "From-scratch ALNS solver",
        "text": "Regret-2 construction, Adaptive Large Neighborhood Search with three destroy and two repair operators, simulated-annealing acceptance, and a 2-opt polish, in pure dependency-free TypeScript."
      },
      {
        "label": "Adaptive operator selection",
        "text": "Roulette-wheel operators reweighted every 100 iterations from earned rewards, with reheat-on-stagnation and a deterministic PRNG for reproducible plans."
      },
      {
        "label": "Incremental re-optimization",
        "text": "The replan endpoint injects rush orders, warm-starts from the prior assignment under a tight budget, and returns a diff of reassigned versus newly served stops."
      },
      {
        "label": "ML travel times with fallback",
        "text": "A from-scratch numpy gradient-boosted regressor predicts time-of-day speed multipliers, consumed via a validating, cached router that gracefully falls back so optimization never blocks."
      },
      {
        "label": "Live tracking on PostGIS",
        "text": "Fastify WebSocket telemetry animates vehicles along baked schedules and persists pings to PostGIS, rendered on a MapLibre console with a live convergence chart."
      }
    ],
    "shot": "/shots/meridian.png",
    "shotLabel": "meridian"
  },
  "mirage": {
    "facts": [
      {
        "label": "Lines of code",
        "value": "~2.8k"
      },
      {
        "label": "Source files",
        "value": "27"
      },
      {
        "label": "Runtime deps",
        "value": "4"
      },
      {
        "label": "ATT&CK techniques",
        "value": "23"
      },
      {
        "label": "Shell commands emulated",
        "value": "50+"
      },
      {
        "label": "Backend build step",
        "value": "None"
      }
    ],
    "overview": "Mirage is a high-interaction SSH and HTTP honeypot that lets attackers in, emulates a believable production Ubuntu host down to its filesystem and process table, and never executes a single thing they type. Every captured session is enriched and turned into an ATT&CK-mapped attacker dossier, complete with extracted IOCs, a sophistication score, and an inferred intent, all explorable in a real-time threat-intelligence console with terminal-style replay.",
    "technical": [
      "The system is split into two isolated planes. The capture plane runs the sensors and is treated as fully untrusted: it can only push events through a single token-authenticated /ingest endpoint and has no route back into the database or analysis logic. The docker-compose topology enforces this at the network layer, placing the sensors on a capture network with no path to the analysis internals beyond ingest. The analysis plane owns an append-only event store, the heuristic intelligence engine, the REST API, and the dashboard. This is a genuine threat-model decision, not cosmetic structure, and it means a compromise of the exposed surface cannot reach the collected intelligence.",
      "The high-interaction core is a per-session virtual shell that maintains in-memory system state, a fake filesystem, users, environment, and a process table, and answers over fifty common commands with internally consistent output derived from that state. Command chains, pipelines into consuming sinks like crontab or tee, quoting, path resolution, and backspace and Ctrl-C handling are all modeled so the session feels real to both humans and bots, including the non-interactive ssh host 'cmd' form. Crucially nothing is ever run on the host: downloads are narrated and recorded as IOCs, dropped binaries return silently like a backgrounded payload, and unknown commands optionally fall through to a free local Ollama model for improvised output, defaulting to deterministic responses when no model is configured.",
      "Intelligence is produced by a deterministic, SOC-style detection ruleset rather than a paid API. Twenty-three ATT&CK techniques across the full tactic chain are matched from shell behavior and web probes, with separate rule sets so traversal patterns do not false-positive on ordinary shell navigation. IOCs are pulled by pattern (URLs, IPv4, MD5 and SHA-256 hashes, dropped filenames, long base64 blobs), a sophistication score is computed from engagement, technique breadth, severity, obfuscation and persistence signals, and intent is inferred from the observed tactic mix. Captured credentials, reverse-DNS enrichment, and offline threat tagging round out each dossier.",
      "The whole backend runs on native Node with no build step: TypeScript executes directly under Node 22.6, storage is the built-in node:sqlite with a relational schema that mirrors a Postgres target, and the entire capture and analysis backend pulls in just two runtime dependencies, express and ssh2. The dashboard is a React and Vite SPA streamed live over Server-Sent Events, with terminal session replay, an ATT&CK coverage matrix, and exports in CSV, STIX-lite, MITRE ATT&CK Navigator layer, and per-session JSON formats. When no React build is present the server falls back to a zero-build vanilla dashboard, so a fresh clone is runnable in one command."
    ],
    "highlights": [
      {
        "label": "Two-plane isolation",
        "text": "Untrusted sensors can only push to one token-gated ingest endpoint and never reach the database or analysis logic, enforced at the Docker network layer."
      },
      {
        "label": "Never executes input",
        "text": "A stateful virtual shell emulates 50+ commands over a fake filesystem and process table; downloads and payloads are recorded as IOCs, never run."
      },
      {
        "label": "ATT&CK intelligence engine",
        "text": "A deterministic detection ruleset maps sessions to 23 ATT&CK techniques, extracts IOCs, scores sophistication, and infers attacker intent without any paid API."
      },
      {
        "label": "Analyst-grade exports",
        "text": "One click produces CSV, STIX-lite, a MITRE ATT&CK Navigator layer, and per-session JSON intel reports, plus Prometheus metrics."
      },
      {
        "label": "Zero-build runtime",
        "text": "Native TypeScript on Node 22.6 and built-in node:sqlite mean the backend ships with two runtime dependencies and no compile step."
      }
    ],
    "stack": [
      "Node 22 (native TypeScript)",
      "TypeScript",
      "Express",
      "ssh2",
      "node:sqlite",
      "Server-Sent Events",
      "React 18",
      "Vite",
      "Docker Compose",
      "MITRE ATT&CK",
      "Ollama (optional)"
    ],
    "shot": "/shots/mirage.png",
    "shotLabel": "mirage"
  },
  "portfolio_x1": {
    "facts": [
      {
        "label": "Lines of code",
        "value": "~1.3k"
      },
      {
        "label": "Source files",
        "value": "21"
      },
      {
        "label": "Commits",
        "value": "44"
      },
      {
        "label": "Runtime dependencies",
        "value": "7"
      },
      {
        "label": "Terrain",
        "value": "Hand-written GLSL"
      },
      {
        "label": "Languages",
        "value": "TypeScript, GLSL, CSS"
      }
    ],
    "overview": "A western-themed interactive 3D portfolio: a desert saloon rendered in the browser with React Three Fiber, lit for golden hour, with a cinematic camera that flies you into the scene on load. It pairs a hand-written GLSL terrain shader and a curve-driven steam train with a GSAP camera rig, and reaches roughly 1,330 lines of TypeScript across 21 source files.",
    "technical": [
      "The world is built declaratively with React Three Fiber on top of Three.js 0.183 and React 19. Each scene element, the saloon, rails, train, rocks, cacti, mountains, tombstones and signage, is its own component composed inside a single Canvas. Lighting is tuned for a golden hour look: a low warm directional sun with a 2048px shadow map, a soft opposite-side fill, exponential fog in a matching amber, ACES filmic tone mapping, and drei volumetric clouds seeded across the sky.",
      "The desert floor is a custom shaderMaterial rather than a textured plane. A vertex shader displaces a 150x150 segment plane with layered fbm value noise to roll the dunes, while masking out a flat road corridor with smoothstep. The fragment shader reconstructs world coordinates from UVs to paint sand grain, a darker dirt road, and subtle wheel tracks entirely procedurally, then a separate transparent shadow-catcher plane receives the scene's cast shadows on top.",
      "Scenery placement is deterministic. A small linear-congruential PRNG (the 16807 multiplier) seeds the positions, rotations and scales of rocks, cacti and background mountains, so the layout is randomized in feel but identical on every load and across reloads. The railway is a CatmullRom curve; rails are built as TubeGeometry offset sideways along the curve normal, and the locomotive and three wagons sample the curve each frame, orienting themselves with a quaternion derived from the curve tangent and trailing each other by fixed arc-length gaps.",
      "Camera work is the centerpiece. A GSAP intro tween flies the camera from a high wide vantage down to the saloon over three seconds, then hands control to constrained OrbitControls (clamped azimuth and polar angles, distance limits). A reusable flyTo hook tweens camera position and the OrbitControls target together so the look direction eases smoothly throughout each move, used to dock the camera against a tombstone whose face shows an in-world credits page rendered as a transform-occluded HTML iframe. A Firefox-specific overlay path swaps that embedded panel for a 2D iframe where transform HTML misbehaves, and a dev-only PointerLockControls free-fly camera (WASD plus vertical) is available for staging shots."
    ],
    "stack": [
      "TypeScript",
      "React 19",
      "Three.js",
      "React Three Fiber",
      "@react-three/drei",
      "GLSL",
      "GSAP",
      "Vite"
    ],
    "highlights": [
      {
        "label": "Procedural terrain",
        "text": "Custom GLSL vertex and fragment shaders displace and color the desert with fbm noise, a masked road corridor, sand grain and wheel tracks, no terrain textures."
      },
      {
        "label": "Cinematic camera rig",
        "text": "GSAP intro fly-in plus a reusable flyTo hook that tweens camera position and OrbitControls target together for smooth look transitions into constrained orbit."
      },
      {
        "label": "Curve-driven train",
        "text": "Locomotive and three wagons ride a CatmullRom track, oriented per frame from the curve tangent via quaternions and spaced by fixed arc-length gaps."
      },
      {
        "label": "Deterministic scatter",
        "text": "A seeded linear-congruential PRNG places rocks, cacti and mountains so the scene looks random but renders identically on every load."
      },
      {
        "label": "HTML inside 3D",
        "text": "An interactive credits page lives on a tombstone face as a transform-occluded iframe, with a dedicated Firefox overlay fallback."
      }
    ],
    "shot": "/shots/portfolio_x1.png",
    "shotLabel": "maurice's saloon"
  },
  "server": {
    "facts": [
      {
        "label": "Lines of code",
        "value": "~0.4k"
      },
      {
        "label": "Source files",
        "value": "6"
      },
      {
        "label": "DNS sync script",
        "value": "73 lines Python"
      },
      {
        "label": "Dependencies",
        "value": "Zero (stdlib only)"
      },
      {
        "label": "Services proxied",
        "value": "13"
      },
      {
        "label": "Commits",
        "value": "20"
      },
      {
        "label": "Build step",
        "value": "None"
      }
    ],
    "overview": "Server is the single source of truth for a Hetzner box that hosts a dozen-plus side projects. The entire reverse proxy and DNS topology lives in one Caddyfile, and a push to main is the only deploy action: a GitHub Action ships the file to the box, reloads Caddy, and reconciles GoDaddy DNS to match. No SSH sessions, no dashboards, no drift.",
    "technical": [
      "The repository is deliberately tiny and declarative. A single Caddyfile maps 13 reverse-proxy blocks to local ports, and Caddy handles automatic HTTPS on top, so the file doubles as both routing config and the canonical inventory of what runs on the machine. Editing one block is the entire interface for adding, moving, or removing a service.",
      "Deployment is a paths-filtered GitHub Action that only fires when the Caddyfile changes. It copies the file to /etc/caddy via scp over SSH, runs systemctl reload caddy, and then diffs the new Caddyfile against the previous commit to drive DNS. The reload-not-restart choice keeps existing connections alive, and gating on the file path means unrelated commits never touch production.",
      "The DNS reconciler is the genuinely clever part: a 73-line Python script with zero third-party dependencies, talking to the GoDaddy v1 API through urllib alone. It parses host lines out of both the old and new Caddyfile into sets of (root domain, record name) tuples, correctly splitting subdomains from their registrable root and expanding bare apex domains into both @ and www records. Set difference then yields exactly the records to PUT and to DELETE, so DNS converges to match the proxy config declaratively rather than through imperative steps. Deletes treat a 404 as success, making the operation idempotent and safe to re-run.",
      "Operational rigor rounds it out. A recovery guide documents a full Hetzner rebuild that preserves the IP so DNS stays valid, plus the SSH known-hosts and Caddy reinstall steps, and an infrastructure doc captures the Docker and Caddy layout. Secrets for the server and the GoDaddy API are kept in GitHub Actions secrets, never in the repo."
    ],
    "highlights": [
      {
        "label": "Push to deploy",
        "text": "A commit to the Caddyfile is the whole workflow. The Action reloads the proxy and syncs DNS with no SSH or dashboard."
      },
      {
        "label": "Declarative DNS",
        "text": "The script diffs old and new Caddyfiles as record sets, so GoDaddy A records always converge to match the proxy config."
      },
      {
        "label": "Zero dependencies",
        "text": "DNS reconciliation runs on Python stdlib urllib alone. Nothing to install, nothing to pin, nothing to break."
      },
      {
        "label": "Path-gated CI",
        "text": "The workflow only triggers on Caddyfile changes, so unrelated commits never touch production."
      },
      {
        "label": "Disaster recovery",
        "text": "A documented Hetzner rebuild keeps the IP, so the entire stack can be restored from scratch without re-pointing DNS."
      }
    ],
    "stack": [
      "Caddy",
      "GitHub Actions",
      "Python",
      "GoDaddy API",
      "Docker",
      "Hetzner",
      "SSH"
    ]
  },
  "studentid-generator": {
    "facts": [
      {
        "label": "Lines of code",
        "value": "~3.3k"
      },
      {
        "label": "Source files",
        "value": "38 tracked"
      },
      {
        "label": "Commits",
        "value": "25"
      },
      {
        "label": "Languages",
        "value": "TS / TSX / SQL"
      },
      {
        "label": "Card locales",
        "value": "DE / FR / IT"
      },
      {
        "label": "Dependencies",
        "value": "13 runtime"
      }
    ],
    "overview": "IDmint is a working proof of concept that mints print-ready, QR-verified student ID cards and exposes how little security the new digital verification flows actually add. Built as a proposal for a Swiss vocational school, it is a full Next.js 16 App Router stack with Postgres, Prisma, server-side PDF rendering, and a public mobile check page, all wired to demonstrate that a forged card passes the exact same scan as a real one.",
    "technical": [
      "The card itself is rendered server-side with @react-pdf/renderer at fixed point dimensions, not exported from a browser. The PDF route loads the card and its institution from Prisma, generates a QR code pointing at the public check URL, re-reads the cropped photo and logo from disk as base64 data URIs, and renders a decorative vertical Code 128 strip via bwip-js rotated 90 degrees so it drops straight into a stretched flex column. Every glyph, the 3:4 portrait, the address block, and the logo are laid out in points and capped so aspect ratios are preserved, producing a deterministic, print-accurate single page.",
      "Localization is modeled as a property of the card, not the request. Each card stores a locale column (de, fr, or it) that drives both outputs, the PDF text and the public check page, because the PDF is re-rendered on demand and the check page is opened by whoever scans the QR on their own phone, so neither can infer the issuing language from the browser. Message catalogs live in src/lib/messages with a typed contract shared across all three languages.",
      "Auth is deliberately small and correct. A single staff account logs in against AUTH_USERNAME and AUTH_PASSWORD compared in constant time with a hand-written comparator that never short-circuits and folds the length difference into the result, so timing cannot reveal which field was wrong. Success mints a 7-day httpOnly JWT session signed with jose, and a Next 16 proxy guards the staff page and API prefixes, redirecting pages to login and returning 401 for API routes. Brute force is throttled with a 5-attempt, 15-minute in-memory IP lockout. The public check route uses an unguessable random token rather than the human ID number, so check URLs cannot be enumerated.",
      "The same codebase ships as two separate deployments through a build-time route splitter. scripts/prune-routes.mjs reads APP_ROLE and physically deletes the other deployment's routes before next build, so the public check image only contains the check page and photo API while the staff image only contains the admin UI and protected APIs. Missing routes 404 naturally and no runtime gating is needed. Uploaded photos are normalized through sharp to a 450x600 JPEG with EXIF honored then stripped, and form input is validated end to end with Zod including the 3-4-3 ID number format and a valid-from/valid-until ordering refinement."
    ],
    "highlights": [
      {
        "label": "Server-rendered PDF",
        "text": "Print-accurate cards laid out in points with @react-pdf/renderer, embedded QR, photo, logo, and a rotated Code 128 strip, no headless browser."
      },
      {
        "label": "Per-card i18n",
        "text": "Locale is stored on the card and drives both the PDF and the public check page, because a scanned QR can never infer the issuing language."
      },
      {
        "label": "Constant-time auth",
        "text": "Hand-written non-branching credential comparison, jose-signed httpOnly JWT sessions, and a 5-try 15-minute IP lockout."
      },
      {
        "label": "Unguessable check URLs",
        "text": "Verification links use a random token instead of the human ID number, so cards cannot be enumerated from the public page."
      },
      {
        "label": "Two images, one codebase",
        "text": "A build-time route pruner splits the app into separate staff and public-check deployments that physically cannot serve each other's endpoints."
      }
    ],
    "stack": [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "@react-pdf/renderer",
      "sharp",
      "qrcode",
      "bwip-js",
      "jose (JWT)",
      "Zod",
      "Tailwind CSS",
      "Docker"
    ],
    "shot": "/shots/studentid-generator.png",
    "shotLabel": "idmint"
  }
};
