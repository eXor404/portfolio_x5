import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Keep the Expires date in sync with the same field in nginx.conf.
const SECURITY_TXT = (scheme, host) =>
  `Contact: ${scheme}://${host}/contact\n` +
  `Expires: 2027-07-01T00:00:00.000Z\n` +
  `Preferred-Languages: en, de\n` +
  `Canonical: ${scheme}://${host}/.well-known/security.txt\n`

// Serve /.well-known/security.txt in dev + preview, mirroring what nginx emits
// in production: built dynamically from the request host so there is no
// hardcoded domain and it is identical across every environment.
function securityTxt() {
  const handler = (req, res, next) => {
    if (req.url.split('?')[0] !== '/.well-known/security.txt') return next()
    const host = req.headers.host || 'localhost'
    const scheme = req.headers['x-forwarded-proto'] || 'http'
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end(SECURITY_TXT(scheme, host))
  }
  return {
    name: 'security-txt',
    configureServer(server) { server.middlewares.use(handler) },
    configurePreviewServer(server) { server.middlewares.use(handler) },
  }
}

// SPA build. base './' keeps asset paths relative so the dist/ folder can be
// served from any sub-path (GitHub Pages, S3 prefix, etc.).
export default defineConfig({
  base: './',
  plugins: [react(), securityTxt()],
  // Forward /api to the contact backend during local dev so the form works
  // without CORS gymnastics. In production the reverse proxy does this.
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
