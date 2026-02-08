import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import tailwind from '@astrojs/tailwind'
import swup from '@swup/astro'
import { defineConfig } from 'astro/config'
import expressiveCode from 'astro-expressive-code'
import cloudflare from '@astrojs/cloudflare'
import keystatic from '@keystatic/astro'

// https://astro.build/config
export default defineConfig({
  site: 'https://zhanxx81201.dpdns.org',
  base: '/',
  trailingSlash: 'always',
  output: 'server', 
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    svelte(),
    sitemap(),
    swup(),
    expressiveCode(),
    keystatic(),
  ],
  vite: {
    build: {
      rollupOptions: {
        external: ['node:path', 'node:async_hooks', 'stream', 'util'],
      },
    },
  },
})