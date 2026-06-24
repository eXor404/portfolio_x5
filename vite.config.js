import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// SPA build. base './' keeps asset paths relative so the dist/ folder can be
// served from any sub-path (GitHub Pages, S3 prefix, etc.).
export default defineConfig({
  base: './',
  plugins: [react()],
})
