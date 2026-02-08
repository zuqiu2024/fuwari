import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import tailwind from '@astrojs/tailwind'
import swup from '@swup/astro'
import { defineConfig } from 'astro/config'
import expressiveCode from 'astro-expressive-code'
import { adrConfig } from './src/plugins/rehype-component-config'
import { remarkReadingTime } from './src/plugins/remark-reading-time'
import { adrComponentsRehypePlugin } from './src/plugins/rehype-component'
import { manifest } from './src/utils/manifest'
import cloudflare from '@astrojs/cloudflare'
import keystatic from '@keystatic/astro'

import remarkSectionize from 'remark-sectionize'
import remarkDirective from 'remark-directive'
import remarkGithubAdmonitionsToDirectives from 'remark-github-admonitions-to-directives'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

// https://astro.build/config
export default defineConfig({
  site: 'https://zhanxx81201.dpdns.org', // 换成你的域名
  base: '/',
  trailingSlash: 'always',
  display: 'minimal',
  output: 'server', // Keystatic 必须要求 server 模式
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
    swup({
      theme: false,
      animationClass: 'transition-',
      containers: ['main'],
      smoothScrolling: true,
      cache: true,
      preload: true,
      accessibility: true,
      updateHead: true,
      updateHistory: true,
      parallel: false,
    }),
    expressiveCode(),
    keystatic(),
  ],
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkReadingTime,
      remarkSectionize,
      remarkDirective,
      remarkGithubAdmonitionsToDirectives,
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
      rehypeKatex,
      [adrComponentsRehypePlugin, adrConfig],
    ],
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['node:path', 'node:async_hooks', 'stream', 'util'],
      },
    },
    css: {
      preprocessorOptions: {
        stylus: {
          define: {
            $oklch: false,
          },
        },
      },
    },
  },
})