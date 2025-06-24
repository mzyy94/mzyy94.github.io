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
        "@/layouts/components/PostLink.astro",
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
  redirects: {
    "/blog/2016/10/09/household-eap-sim-wifi/": "/blog/2016/10/09/home-eap-sim-wifi/",
    "/blog/2020/05/12/raspberry-pi-hdmi-edid-cec/": "/blog/2020/05/12/raspberrypi-hdmi-edid-cec/",
    "/blog/2021/08/07/hisense-vidaa-hacking/": "/blog/2021/08/07/hisense-75a6g-review/",
    "/blog/2023/02/07/my-new-house/": "/blog/2023/02/27/my-new-house/",
  },
});
