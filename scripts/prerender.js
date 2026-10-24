// Generate real HTML for every public React route. Never deploy partial output.
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import { preview } from 'vite'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { routes } from './routes.js'

const distDir = fileURLToPath(new URL('../dist/', import.meta.url))
let server
let browser
try {
  server = await preview({ preview: { host: '127.0.0.1', port: 4173, strictPort: true } })
  const origin = 'http://127.0.0.1:4173'
  browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  })
  const snapshots = []
  for (const route of routes) {
    const page = await browser.newPage()
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    try {
      // Rendering must not depend on third-party images, analytics, or fonts.
      await page.setRequestInterception(true)
      page.on('request', request => {
        if (request.url().startsWith(origin + '/') || request.url().startsWith('data:')) request.continue()
        else request.abort()
      })
      await page.goto(origin + route, { waitUntil: 'networkidle0', timeout: 30000 })
      await page.waitForFunction(() => {
        const root = document.getElementById('root')
        return root?.querySelector('h1') && root.textContent.trim().length > 200
      }, { timeout: 10000 })
      if (errors.length) throw new Error(errors.join('\n'))
      snapshots.push({ route, html: await page.content() })
      console.log(`Rendered ${snapshots.length}/${routes.length}: ${route}`)
    } finally {
      await page.close()
    }
  }
  // Do not overwrite the SPA template until every route has been captured.
  for (const { route, html } of snapshots) {
    const directory = path.join(distDir, route.slice(1))
    await fs.mkdir(directory, { recursive: true })
    await fs.writeFile(path.join(directory, 'index.html'), html)
  }
  console.log(`Prerendered all ${snapshots.length} routes.`)
} catch (error) {
  console.error('Prerender failed; refusing to publish incomplete HTML:', error)
  process.exitCode = 1
} finally {
  await browser?.close()
  if (server) await new Promise((resolve, reject) => server.httpServer.close(error => error ? reject(error) : resolve()))
}
