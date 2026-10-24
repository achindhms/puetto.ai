import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'
import { routes } from './scripts/routes.js'
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
