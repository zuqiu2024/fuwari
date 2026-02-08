import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import tailwind from '@astrojs/tailwind'
import swup from '@swup/astro'
import { defineConfig } from 'astro/config'
import expressiveCode from 'astro-expressive-code'
import cloudflare from '@astrojs/cloudflare'
import keystatic from '@keystatic/astro'
import icon from 'astro-icon' // 补齐这个

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
    // 添加 kv 绑定支持
    runtime: { mode: 'complete', binding: 'SESSION' }
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    svelte(),
    sitemap(),
    swup(),
    expressiveCode(),
    icon(), // 必须加上这个，解决 virtual:astro-icon 报错
    keystatic(),
  ],
  vite: {
    build: {
      rollupOptions: {
        // 确保这些 Node 模块在 Cloudflare 环境不报错
        external: ['node:path', 'node:async_hooks', 'stream', 'util'],
      },
    },
    ssr: {
        external: ['node:path', 'node:async_hooks', 'stream', 'util']
    }
  },
})