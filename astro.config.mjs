import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import tailwind from '@astrojs/tailwind'
import swup from '@swup/astro'
import { defineConfig } from 'astro/config'
import expressiveCode from 'astro-expressive-code'
import keystatic from '@keystatic/astro'
import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
  site: 'https://zhanxx81201.dpdns.org',
  base: '/',
  trailingSlash: 'always',
  // 1. 修改为 static，这是博客最稳妥的模式
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
    keystatic(),
  ],
  // 2. 优化图片构建，解决日志里提到的 sharp 警告
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