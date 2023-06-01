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

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  integrations: [
    react(),
    sitemap(),
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
