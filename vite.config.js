import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

const routes = [
  '/',
  '/blog',
  '/blog/the-rise-of-ai-driven-gtm-operations',
  '/blog/real-time-analytics-for-smarter-engineering',
  '/blog/building-a-scalable-lead-routing-system',
  '/blog/automating-the-operating-manual',
  '/abm-ops',
  '/abm-ops/what-is-abm',
  '/abm-ops/abm-strategy-framework',
  '/abm-ops/abm-tech-stack',
  '/abm-ops/abm-signal-data-crm',
  '/abm-ops/abm-metrics-roi',
  '/abm-ops/abm-vs-demand-gen',
  '/calculators',
  '/abm-roi-calculator',
  '/webinar-roi-calculator',
  '/event-roi-calculator',
  '/thought-leadership-roi-calculator',
  '/linkedin-ads-roas-calculator',
  '/retention-calculator',
  '/rice-calculator',
  '/kano-calculator',
]

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
