/* Single source of content for every page. */

export const PROFILE = {
  name: 'Maurice Däppen',
  role: 'Fullstack · DevOps · Security · AI',
  tagline: "I build and secure resilient systems end to end, from idea and architecture to CI/CD, hosting, and keeping them reliable in production.",
  location: 'Bern — CH',
  coords: '46.9425° N · 7.4439° E',
  availability: 'Open to interesting work',
  stack: ['Java', 'Quarkus', 'React', 'Kubernetes', 'Docker', 'ArgoCD', 'Keycloak', 'Postgres'],
};

/* Route table — drives the Nav, footer, and per-page <PageHeader> paths. */
export const ROUTES = [
  { id: 'work', n: '01', label: 'Work', path: '/work' },
  { id: 'writing', n: '02', label: 'Writing', path: '/writing' },
  { id: 'experience', n: '03', label: 'Experience', path: '/experience' },
  { id: 'about', n: '04', label: 'About', path: '/about' },
  { id: 'contact', n: '05', label: 'Contact', path: '/contact' },
];

export const PROJECTS = [
  {
    n: '01', slug: 'argus', title: 'Argus', tagline: 'OSINT 3D intelligence globe',
    blurb: 'Dark command-center web app that aggregates open-source, near-real-time situational data into one layered, click-to-inspect 3D globe, fed by a live SSE data spine.',
    tags: ['React', 'TypeScript', 'CesiumJS', 'Fastify', 'SSE'],
    specs: [{ key: 'Year', value: '2026' }],
  },
  {
    n: '02', slug: 'studentid-generator', title: 'IDmint', tagline: 'Faking "secure" student IDs',
    blurb: 'A proof of concept showing how trivially the digital student IDs now sold as innovation can be forged. It mints print-ready, QR-verified cards that pass the same mobile check page as the real thing, exposing that the verification adds no real security.',
    tags: ['Next.js', 'TypeScript', 'Postgres', 'Prisma', 'PDF'],
    specs: [{ key: 'Year', value: '2026' }],
  },
  {
    n: '03', slug: 'mdslides', title: 'mdslides', tagline: 'Markdown to slide decks',
    blurb: 'Zero-config CLI that turns a folder of markdown into a live-reloading slide deck or a self-contained static build you can host anywhere. Published on npm.',
    tags: ['Node', 'CLI', 'Astro', 'npm'],
    specs: [{ key: 'Year', value: '2026' }],
  },
  {
    n: '04', slug: 'mdstack', title: 'mdstack', tagline: 'Zero-config markdown sites',
    blurb: 'Point it at a folder of markdown and get a rendered static site, in dev or as a deployable build for any static host. Published on npm as @exor404/mdstack.',
    tags: ['Node', 'CLI', 'Markdown', 'npm'],
    specs: [{ key: 'Year', value: '2026' }],
  },
  {
    n: '05', slug: 'mirage', title: 'Mirage', tagline: 'AI honeypot & threat intel',
    blurb: 'High-interaction honeypot that lures attackers into a believable emulated Ubuntu host without ever executing their input, then turns each captured session into an ATT&CK-mapped attacker dossier in a real-time threat-intel console.',
    tags: ['Node', 'TypeScript', 'ATT&CK', 'Docker'],
    specs: [{ key: 'Year', value: '2026' }],
  },
  {
    n: '06', slug: 'server', title: 'Server', tagline: 'Self-hosted infra, GitOps deploys',
    blurb: 'Single source of truth for my server. Edit a Caddyfile, push, and a GitHub Action reloads the reverse proxy and syncs DNS records automatically, with no SSH or dashboards.',
    tags: ['Caddy', 'GitHub Actions', 'Docker', 'DNS'],
    specs: [{ key: 'Year', value: '2026' }],
  },
  {
    n: '07', slug: 'meridian', title: 'Meridian', tagline: 'Fleet routing optimization',
    blurb: 'Plans cost-optimal routes across a fleet and continuously re-optimizes as orders, delays, and breakdowns arrive. Built around a from-scratch metaheuristic solver for the NP-hard Vehicle Routing Problem with Time Windows.',
    tags: ['TypeScript', 'Optimization', 'Geospatial', 'ML'],
    specs: [{ key: 'Year', value: '2026' }],
  },
  {
    n: '08', slug: 'flux', title: 'Flux', tagline: 'Generative flow-field studio',
    blurb: 'Thousands of particles drifting through a noise-driven vector field you sculpt in real time with the cursor. Runs entirely in the browser with no build step and zero dependencies.',
    tags: ['Vanilla JS', 'Canvas', 'Generative'],
    specs: [{ key: 'Year', value: '2026' }],
  },
  {
    n: '09', slug: 'csweb', title: 'CS Web', tagline: '1v1 browser Counter-Strike',
    blurb: 'First-person 3D Counter-Strike in the browser with real-time multiplayer over WebSockets, plus a round system with economy and a buy menu. First to five wins.',
    tags: ['Three.js', 'WebSockets', 'Node'],
    specs: [{ key: 'Year', value: '2026' }],
  },
  {
    n: '10', slug: 'flashy', title: 'Flashie', tagline: 'Spaced-repetition flashcards',
    blurb: 'Spaced-repetition flashcard PWA shipped across app, landing, and API subdomains, backed by a self-hosted Convex backend and Postgres.',
    tags: ['React', 'TypeScript', 'Convex', 'Postgres', 'PWA'],
    specs: [{ key: 'Year', value: '2026' }],
  },
  {
    n: '11', slug: 'git-art', title: 'git-art', tagline: 'GitHub contribution graph art',
    blurb: 'Paint pixel art onto a GitHub-style contribution grid, then export a ready-to-run bash script of backdated commits to make it real. Live at git-art.net.',
    tags: ['JavaScript', 'Canvas', 'HTML'],
    specs: [{ key: 'Year', value: '2026' }],
  },
  {
    n: '12', slug: 'portfolio_x1', title: 'ThreeJS Portfolio', tagline: 'Interactive 3D portfolio',
    blurb: 'A western-themed 3D portfolio built with Three.js. A saloon scene with golden-hour lighting and a camera fly-through along predefined paths.',
    tags: ['Three.js', 'React', 'TypeScript', 'WebGL'],
    specs: [{ key: 'Year', value: '2026' }],
  },
];

export const ARTICLES = [
  {
    n: '01', date: '2026 · 04', read: '11 min',
    title: 'Zero-trust without slowing the team down',
    blurb: 'mTLS, OPA, and an identity-aware proxy — shipped across 40 services without turning every deploy into a security review.',
    tags: ['Security', 'mTLS', 'OPA'],
  },
  {
    n: '02', date: '2026 · 02', read: '8 min',
    title: 'Hermetic builds with Nix: a field report',
    blurb: 'What it actually took to make our CI reproducible bit-for-bit — and the sub-second cache hits that paid for the migration.',
    tags: ['Nix', 'CI/CD', 'Rust'],
  },
  {
    n: '03', date: '2025 · 11', read: '6 min',
    title: 'Threat modeling as a daily habit',
    blurb: 'STRIDE is not a quarterly workshop. Here is how I wired it into pull requests so the question "how does this break?" gets asked every time.',
    tags: ['STRIDE', 'AppSec', 'Culture'],
  },
];

export const TIMELINE = [
  { year: '2025', role: 'Senior DevOps Engineer', org: 'Helvetia Cloud', loc: 'Bern',
    blurb: 'Lead the platform team. Cut deploy time 8×, drove zero-trust rollout across 40 services.',
    tags: ['Kubernetes', 'Go', 'OPA'], now: true },
  { year: '2022', role: 'Fullstack Engineer', org: 'Nimbus Labs', loc: 'Remote',
    blurb: 'Owned product from Postgres to React. Shipped the billing + auth rewrite.',
    tags: ['TypeScript', 'React', 'Rust'] },
  { year: '2020', role: 'Security Analyst', org: 'CERT-CH', loc: 'Bern',
    blurb: 'Incident response and threat modeling. Built the internal STRIDE tooling.',
    tags: ['Python', 'OWASP', 'Forensics'] },
];

export const SKILLS = {
  'Backend': ['Java', 'Quarkus', 'Hibernate / Panache', 'Maven / Gradle', 'REST APIs'],
  'Frontend': ['React', 'Next.js', 'Angular', 'Astro', 'Three.js', 'Tailwind CSS', 'Vite'],
  'Testing': ['JUnit', 'Mockito', 'ts-mockito', 'Jest'],
  'DevOps / Infra': ['Docker', 'Kubernetes', 'Helm', 'ArgoCD', 'GitHub Actions', 'GitLab CI'],
  'Data': ['PostgreSQL', 'MySQL', 'MongoDB'],
  'Edge / Proxy': ['Traefik', 'Nginx', 'Caddy'],
  'Security / Auth': ['Keycloak', 'OAuth2 / OIDC', 'TLS'],
  'Observability': ['Prometheus', 'Grafana', 'Splunk'],
  'AI / Tooling': ['LLM-assisted dev', 'Vibe coding', 'OpenAI API', 'Anthropic / Claude API', 'Prompt engineering'],
};

export const LANGUAGES = [
  { lang: 'German', level: 'Native' },
  { lang: 'English', level: 'Fluent' },
  { lang: 'French', level: 'Basics' },
  { lang: 'Spanish', level: 'Basics' },
];

export const VALUES = [
  { k: 'Reliability', v: 'Systems that fail loud, recover fast, and never surprise the on-call.' },
  { k: 'Adversarial', v: 'Every design gets the question: who is trying to make this break, and how?' },
  { k: 'Reproducible', v: 'If it only builds on your machine, it does not build. Hermetic or nothing.' },
];

// "Off the clock" — the human side
export const INTERESTS = [
  { k: 'Side projects', v: 'Always building something small after hours, just to see if I can.' },
  { k: 'Gaming', v: 'Co-op nights with friends, with a soft spot for old retro titles.' },
  { k: 'Gym', v: 'Lifting to clear my head and stay sharp.' },
  { k: 'Cooking', v: 'Chasing the perfect plate of really good food.' },
  { k: 'Art', v: 'Modern paintings and sketches, and I make my own.' },
  { k: 'Travel', v: 'New cities, new places, new perspectives.' },
];

export const CONTACT_CHANNELS = [
  { icon: 'github', label: 'github.com/eXor404', href: 'https://github.com/eXor404' },
  { icon: 'linkedin', label: 'in/maurice-d', href: 'https://www.linkedin.com/in/maurice-d-ab0683397/' },
  { icon: 'key-round', label: 'PGP · 0xA1F4 9C22', href: '#' },
];
