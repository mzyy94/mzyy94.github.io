import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import remarkToc from "remark-toc";
import remarkDirective from "remark-directive";
import m2dx from "astro-m2dx";
import remarkEmoji from "remark-emoji";
import { defineConfig } from "astro/config";
import config from "./src/config/config.json";

const resolveRelativeMd = () => {
  function editLink(node) {
    if (node.type == "link" && node.url.startsWith("../")) {
      const newLink = node.url.replace(/^\.\.\/\d+\/(\d+)-(\d+)-(\d+)-([^\.]+)\.mdx?/, (_, y,m,d,s) => `/blog/${y}/${m}/${d}/${s}/`);
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
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        if (/\/blog\/(\d+)\/(\d+)\/(\d+)\/([^\.]+)\/$/.test(item.url) || item.url.includes(".xml")) {
          return undefined;
        }
        return item;
      }
    }),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkDirective,
      [m2dx, {
        styleDirectives: true,
        componentDirectives: true,
        scanAbstract: "description",
      }],
      resolveRelativeMd,
      remarkEmoji,
      [remarkToc, {
        heading: "目次",
        tight: true,
        ordered: true,
      }],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
});
