/* Single source of content for every page. */

export const PROFILE = {
  name: 'Maurice Däppen',
  role: 'Fullstack · DevOps · Security · AI',
  tagline: "I build and secure resilient systems — from CI/CD pipelines to zero-trust gateways — and I think hard about how they break.",
  location: 'Bern — CH',
  coords: '46.9480° N · 7.4474° E',
  availability: 'Open to work',
  stack: ['Go', 'Rust', 'Kubernetes', 'Terraform', 'OPA', 'TypeScript', 'Postgres', 'eBPF'],
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
    n: '01', slug: 'sentinel', title: 'Sentinel', tagline: 'Zero-trust API gateway',
    blurb: 'Identity-aware proxy enforcing mTLS + OPA policy across a 40-service mesh. Policy-as-code, signed images, full audit trail.',
    tags: ['Go', 'Kubernetes', 'OPA', 'mTLS', 'Envoy'],
    specs: [{ key: 'Role', value: 'Lead' }, { key: 'Scale', value: '40 svc' }, { key: 'Year', value: '2025' }],
    metric: { value: '8×', label: 'faster deploys' },
    featured: true,
  },
  {
    n: '02', slug: 'forge-ci', title: 'Forge CI', tagline: 'Self-hosted CI/CD platform',
    blurb: 'Reproducible pipelines on Nix + Rust runners. Hermetic builds, sub-second cache hits.',
    tags: ['Rust', 'Nix', 'Docker'],
    specs: [{ key: 'Role', value: 'Author' }, { key: 'Year', value: '2024' }],
    metric: { value: '<1s', label: 'cache hits' },
  },
  {
    n: '03', slug: 'vault-recon', title: 'Vault Recon', tagline: 'Secrets & threat scanner',
    blurb: 'STRIDE automation wired into CI. Catches leaked keys and model drift before merge.',
    tags: ['Python', 'OWASP', 'GitHub Actions'],
    specs: [{ key: 'Role', value: 'Author' }, { key: 'Year', value: '2023' }],
    metric: { value: '0', label: 'leaked keys shipped' },
  },
  {
    n: '04', slug: 'aether', title: 'Aether', tagline: 'Real-time observability',
    blurb: 'Streaming metrics dashboard over eBPF probes. p99 latency surfaced in 200ms.',
    tags: ['TypeScript', 'React', 'eBPF', 'Grafana'],
    specs: [{ key: 'Role', value: 'Fullstack' }, { key: 'Year', value: '2023' }],
    metric: { value: '200ms', label: 'p99 surfaced' },
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
  'Backend': ['Go', 'Rust', 'Node', 'Postgres', 'gRPC'],
  'Infra / DevOps': ['Kubernetes', 'Terraform', 'Nix', 'ArgoCD', 'AWS'],
  'Security': ['Threat modeling', 'mTLS', 'OPA', 'OWASP', 'eBPF'],
  'Frontend': ['TypeScript', 'React', 'Vite'],
};

export const LANGUAGES = [
  { lang: 'German', level: 'Native' },
  { lang: 'English', level: 'Fluent' },
  { lang: 'French', level: 'Conversational' },
];

export const VALUES = [
  { k: 'Reliability', v: 'Systems that fail loud, recover fast, and never surprise the on-call.' },
  { k: 'Adversarial', v: 'Every design gets the question: who is trying to make this break, and how?' },
  { k: 'Reproducible', v: 'If it only builds on your machine, it does not build. Hermetic or nothing.' },
];

export const CONTACT_CHANNELS = [
  { icon: 'mail', label: 'maurice@daeppen.dev', href: 'mailto:maurice@daeppen.dev' },
  { icon: 'github', label: 'github.com/mdaeppen', href: 'https://github.com/mdaeppen' },
  { icon: 'linkedin', label: 'in/maurice-daeppen', href: 'https://www.linkedin.com/in/maurice-daeppen' },
  { icon: 'key-round', label: 'PGP · 0xA1F4 9C22', href: '#' },
];
