import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

const routes = ['/', '/blog', '/blog/1', '/blog/2', '/blog/3', '/blog/4']

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
