import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import { defineConfig, fontProviders } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkEmoji from "remark-emoji";
import remarkToc from "remark-toc";
import sharp from "sharp";
import config from "./src/config/config.json";
import theme from "./src/config/theme.json";
import { remarkGfmAlerts, remarkStripPublicPrefix, resolveRelativeMd } from "./src/lib/utils/remarkCustomize";

// Helper to parse font string format: "FontName:wght@400;500;600;700"
function parseFontString(fontStr) {
  const [name, weightPart] = fontStr.split(":");
  let weights = [400]; // default weight

  if (weightPart) {
    const weightMatch = weightPart.match(/wght@?([\d;]+)/);
    if (weightMatch) {
      weights = weightMatch[1].split(";").map((w) => parseInt(w, 10));
    }
  }

  // remove + from font name and add space
  const cleanName = name.replace(/\+/g, " ");
  return { name: cleanName, weights };
}

// Build fonts configuration from theme.json
const fontsConfig = Object.entries(theme.fonts.font_family)
  .filter(([key]) => !key.includes("_type"))
  .map(([key, fontStr]) => {
    const { name, weights } = parseFontString(fontStr);
    const typeKey = `${key}_type`;
    const fallback = theme.fonts.font_family[typeKey] || "sans-serif";

    return {
      name,
      cssVariable: `--font-${key}`,
      provider: fontProviders.google(),
      weights,
      display: "swap",
      fallbacks: [fallback],
    };
  });

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  image: { service: sharp() },
  vite: { plugins: [tailwindcss()] },
  fonts: fontsConfig,
  integrations: [
    react(),
    sitemap(),
    partytown(),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
        "@/components/PostLink.astro",
      ],
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkGfmAlerts,
      remarkStripPublicPrefix,
      resolveRelativeMd,
      remarkEmoji,
      [remarkToc, { heading: "目次", tight: true, ordered: true }],
      [remarkCollapse, { test: "目次" }],
    ],
    shikiConfig: { theme: "one-dark-pro", wrap: true },
  },
  redirects: {
    "/blog/2016/10/09/household-eap-sim-wifi/":
      "/blog/2016/10/09/home-eap-sim-wifi/",
    "/blog/2020/05/12/raspberry-pi-hdmi-edid-cec/":
      "/blog/2020/05/12/raspberrypi-hdmi-edid-cec/",
    "/blog/2021/08/07/hisense-vidaa-hacking/":
      "/blog/2021/08/07/hisense-75a6g-review/",
    "/blog/2023/02/07/my-new-house/": "/blog/2023/02/27/my-new-house/",
  },
});
