import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import swup from "@swup/astro";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeComponents from "rehype-components";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import remarkGithubAdmonitionsToDirectives from "remark-github-admonitions-to-directives";
import remarkMath from "remark-math";
import remarkSectionize from "remark-sectionize";
import { admsConfig } from "./src/plugins/rehype-adms-config.mjs";
import { parseComments } from "./src/plugins/remark-parse-comments.mjs";

// https://astro.build/config
export default defineConfig({
  // 重要：把这个改成你的实际域名
  site: "https://zhanxx81201.dpdns.org", 
  base: "/", // 如果你不是部署在子目录，保持为 "/"
  trailingSlash: "always",
  integrations: [
    tailwind(),
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
      parseComments,
      remarkDirectiveRehype,
      remarkGithubAdmonitionsToDirectives,
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "append" }],
      [rehypeComponents, admsConfig],
    ],
  },
  vite: {
    build: {
      cssMinify: "lightningcss",
    },
    ssr: {
      noExternal: ["overlayscrollbars", "shiki"],
    },
  },
});