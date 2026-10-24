// Exercise generated files with JavaScript disabled, including direct deep links.
import assert from 'node:assert/strict'
import { access } from 'node:fs/promises'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import { preview } from 'vite'
import { routes } from './routes.js'

const server = await preview({ preview: { host: '127.0.0.1', port: 4173, strictPort: true } })
let browser
try {
  browser = await puppeteer.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true })
  const page = await browser.newPage()
  await page.setJavaScriptEnabled(false)
  await page.setRequestInterception(true)
  page.on('request', request => request.url().startsWith('http://127.0.0.1:4173/') ? request.continue() : request.abort())
  for (const route of routes) {
    // Explicit index path means a missing output cannot pass via SPA fallback.
    await access(new URL(`../dist/${route.slice(1)}${route === '/' ? '' : '/'}index.html`, import.meta.url))
    const response = await page.goto(`http://127.0.0.1:4173${route === '/' ? '/' : route + '/'}index.html`, { waitUntil: 'domcontentloaded' })
    assert.equal(response.status(), 200, route)
    assert(await page.$eval('#root h1', el => el.textContent.trim().length > 0), route)
    assert(await page.$eval('#root', el => el.textContent.trim().length > 200), route)
  }
  for (const width of [1440, 390]) {
    await page.setViewport({ width, height: 900 })
    await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle0' })
    for (const selector of ['.wwd-slide-content', '.step-content', '.net-card', '.tool-card']) {
      const readable = await page.$$eval(selector, elements => elements.length > 0 && elements.every(el => {
        const css = getComputedStyle(el)
        return css.opacity === '1' && css.display !== 'none' && el.getBoundingClientRect().height > 0
      }))
      assert(readable, `Hidden content: ${selector} at ${width}px`)
    }
    await page.click('.faq-question')
    assert(await page.$eval('.faq-item', el => el.open), 'FAQ must open without JS')
    assert(await page.$eval('a[href="https://cal.com/puetto/hq"]', el => !!el), 'Booking link missing')
  }
  await page.setJavaScriptEnabled(true)
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle0' })
  await page.click('.faq-question')
  assert(await page.$eval('.faq-item', el => el.open), 'FAQ must work with JS too')
  assert.deepEqual(errors, [], 'Browser runtime errors')
  console.log(`Verified ${routes.length} static pages; desktop/mobile content and FAQ pass without JS; JS smoke test passes.`)
} finally {
  await browser?.close()
  await new Promise(resolve => server.httpServer.close(resolve))
}
