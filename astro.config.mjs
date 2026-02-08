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

// 使用这种导入方式绕过构建环境的路径解析问题
import { admsConfig } from "./src/plugins/rehype-adms-config.mjs";
import { parseComments } from "./src/plugins/remark-parse-comments.mjs";

export default defineConfig({
  site: "https://zhanxx81201.dpdns.org",
  base: "/",
  trailingSlash: "always",
  integrations: [
    tailwind({
      nesting: true,
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
      noExternal: ["overlayscrollbars", "shiki", "@swup/astro", "flexsearch"],
    },
  },
});