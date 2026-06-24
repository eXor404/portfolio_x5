# Maurice Däppen — Portfolio

Personal portfolio for a Fullstack · DevOps · Security engineer. Swiss /
engineering "paper" aesthetic — bone neutrals, near-black ink, one signal-orange
accent, square corners, hard-offset shadows, and blueprint textures.

Built as a single-page app with a dedicated route per section.

## Stack

- **[Vite 5](https://vitejs.dev/)** — dev server + build
- **React 18**
- **[React Router 6](https://reactrouter.com/)** — client-side routing
- **[lucide-react](https://lucide.dev/)** — icons
- Plain CSS variables for the design tokens (no CSS framework)

## Routes

| Path | Page |
|------|------|
| `/` | Home — poster hero + teasers |
| `/work` | Selected work — featured + project grid |
| `/writing` | Field notes — filterable article ledger |
| `/experience` | Timeline — vertical Zeitstrahl |
| `/about` | About — bio, values, skills matrix, languages |
| `/contact` | Contact — channels + message form |
| `*` | On-brand 404 |

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server (hot reload) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the production build locally |

## Project structure

```
src/
  main.jsx            Router + route table
  styles/global.css   Design tokens, base reset, layout
  ds/                 Design-system components (Button, Card, Tag, …)
  components/         Layout, Nav, Footer, Hero, PageHeader, ProjectCard
  pages/              Home, Work, Writing, Experience, About, Contact, NotFound
  data.js             Single content source
```

## Deploying

This is an SPA using the History API, so static hosts must rewrite unknown
paths to `index.html` (otherwise deep links like `/work` 404 on refresh):

- **Netlify** — add `/* /index.html 200` to a `_redirects` file
- **Vercel** — framework preset handles it automatically
- **GitHub Pages** — copy `index.html` to `404.html` in the build output

---

🤖 Built with [Claude Code](https://claude.com/claude-code)
