import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'
import { ALL_TOOL_LIBRARY_ROUTES } from './src/pages/abmToolsData'

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
  '/abm-ops/strategy-account-selection',
  '/abm-ops/how-to-build-b2b-icp',
  '/abm-ops/icp-vs-buyer-persona',
  '/abm-ops/validate-icp-closed-won-data',
  '/abm-ops/icp-firmographic-technographic-behavioral',
  '/abm-ops/common-icp-mistakes',
  '/abm-ops/account-scoring-model',
  '/abm-ops/abm-account-tiering',
  '/abm-ops/fit-vs-intent',
  '/abm-ops/target-account-list-size',
  '/abm-ops/account-scoring-rubric',
  '/calculators',
  '/abm-roi-calculator',
  '/webinar-roi-calculator',
  '/event-roi-calculator',
  '/thought-leadership-roi-calculator',
  '/linkedin-ads-roas-calculator',
  '/retention-calculator',
  '/kano-calculator',
  '/rice-calculator',
  ...ALL_TOOL_LIBRARY_ROUTES,
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
