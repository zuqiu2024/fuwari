import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import swup from "@swup/astro";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math";
import remarkSectionize from "remark-sectionize";

export default defineConfig({
  site: "https://zhanxx81201.dpdns.org",
  base: "/",
  trailingSlash: "always",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    swup({
      theme: "fade",
      animationSelector: '[class*="transition-fade"]',
      containers: ["main"],
      cache: true,
      preload: true,
      accessibility: true,
      updateHead: true,
      updateBodyClass: true,
    }),
    icon({
      include: {
        "material-symbols": ["*"],
        "fa6-brands": ["*"],
        "fa6-regular": ["*"],
        "fa6-solid": ["*"],
      },
    }),
    svelte(),
    sitemap(),
    expressiveCode(),
  ],
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkDirective,
      remarkSectionize,
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "append" }],
    ],
  },
  vite: {
    build: {
      cssMinify: "lightningcss",
    },
    ssr: {
      noExternal: ["overlayscrollbars", "shiki", "@swup/astro"],
    },
  },
});