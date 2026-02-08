import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import tailwind from '@astrojs/tailwind'
import swup from '@swup/astro'
import { defineConfig } from 'astro/config'
import expressiveCode from 'astro-expressive-code'
import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
  site: 'https://zhanxx81201.dpdns.org',
  base: '/',
  trailingSlash: 'always',
  output: 'static', 
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    svelte(),
    sitemap(),
    swup(),
    expressiveCode(),
    icon(),
    // 删除了 keystatic()
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
    },
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['node:path', 'node:async_hooks'],
      },
    },
  },
})