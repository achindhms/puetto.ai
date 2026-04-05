import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

const routes = ['/', '/blog', '/blog/the-rise-of-ai-driven-gtm-operations', '/blog/real-time-analytics-for-smarter-engineering', '/blog/building-a-scalable-lead-routing-system', '/blog/automating-the-operating-manual']

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://www.puetto.com',
      dynamicRoutes: routes,
    })
  ],
  base: '/',
})
