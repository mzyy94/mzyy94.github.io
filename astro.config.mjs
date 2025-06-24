import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import remarkEmoji from "remark-emoji";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import sharp from "sharp";
import config from "./src/config/config.json";

const resolveRelativeMd = () => {
  function editLink(node) {
    if (node.type == "link" && node.url.startsWith("../")) {
      const newLink = node.url.replace(/^\.\.\/\d+\/(\d+)-(\d+)-(\d+)-([^\.]+)\.mdx?/, (_, y, m, d, s) => `/blog/${y}/${m}/${d}/${s}/`);
      node.url = newLink;
    }
  }

  function processChild(children) {
    children?.forEach((child) => {
      editLink(child);
      processChild(child.children);
    })
  }

  return async function transform(root, file) {
    processChild(root.children ?? [root]);
  }
}

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  image: { service: sharp() },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    react(),
    sitemap(),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
      ],
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      resolveRelativeMd,
      remarkEmoji,
      [remarkToc, {
        heading: "目次",
        tight: true,
        ordered: true,
      }],
      [
        remarkCollapse,
        {
          test: "目次",
        },
      ],
    ],
    shikiConfig: { theme: "one-dark-pro", wrap: true },
    extendDefaultPlugins: true,
  },
});
