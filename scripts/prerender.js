// Prerenders every route into dist/<route>/index.html so the site has
// real HTML content with JavaScript disabled (and for crawlers that
// don't execute JS). Runs after `vite build` via the "postbuild" script.
//
// How it works:
// 1. Serves the already-built dist/ folder locally (vite preview).
// 2. Opens each route in headless Chrome (puppeteer) and waits for
//    React to finish rendering into #root.
// 3. Saves the fully-rendered HTML to dist/<route>/index.html.
//
// Vercel serves matching static files before falling back to the SPA
// rewrite in vercel.json, so this doesn't break client-side routing —
// it just gives every route a real HTML snapshot as the first paint.

import puppeteer from 'puppeteer'
import { preview } from 'vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { ALL_TOOL_LIBRARY_ROUTES } from '../src/pages/abmToolsData.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')

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
  '/abm-ops/tools',
  '/people-ops',
  '/people-ops/complete-guide',
  '/people-ops/what-is-fractional-hr',
  '/people-ops/hr-for-startups',
  '/people-ops/people-operations-vs-hr',
  '/people-ops/outsourcing-hr-pros-and-cons',
  '/calculators',
  '/abm-roi-calculator',
  '/webinar-roi-calculator',
  '/event-roi-calculator',
  '/thought-leadership-roi-calculator',
  '/linkedin-ads-roas-calculator',
  '/retention-calculator',
  '/kano-calculator',
  '/rice-calculator',
  '/payroll-calculator',
  ...ALL_TOOL_LIBRARY_ROUTES,
]

async function run() {
  console.log(`Prerendering ${routes.length} routes...`)

  const previewServer = await preview({ preview: { port: 4173 } })
  const baseUrl = `http://localhost:4173`

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  let succeeded = 0
  let failed = []

  for (const route of routes) {
    const page = await browser.newPage()
    try {
      await page.goto(`${baseUrl}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      })
      // Give React a moment to finish painting async content (e.g. data-driven pages).
      await page.waitForSelector('#root', { timeout: 5000 })
      await new Promise((r) => setTimeout(r, 300))

      const html = await page.content()

      const outDir =
        route === '/' ? distDir : path.join(distDir, route.replace(/^\//, ''))
      fs.mkdirSync(outDir, { recursive: true })
      fs.writeFileSync(path.join(outDir, 'index.html'), html)
      succeeded++
    } catch (err) {
      failed.push({ route, error: err.message })
    } finally {
      await page.close()
    }
  }

  await browser.close()
  await previewServer.httpServer.close()

  console.log(`Done: ${succeeded}/${routes.length} routes prerendered.`)
  if (failed.length) {
    console.warn('Failed routes:')
    failed.forEach((f) => console.warn(`  ${f.route}: ${f.error}`))
  }
}

run().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
