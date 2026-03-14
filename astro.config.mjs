import mdx from "@astrojs/mdx";
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
import cookieconsent from "@jop-software/astro-cookieconsent";

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
    cookieconsent({
      guiOptions: {
        consentModal: {
          layout: "bar inline",
          position: "bottom",
          equalWeightButtons: true,
          flipButtons: false
        },
        preferencesModal: {
          layout: "box",
          position: "right",
          equalWeightButtons: false,
          flipButtons: false
        }
      },
      categories: {
        necessary: {
          readOnly: true
        },
        analytics: {}
      },
      language: {
        default: "en",
        autoDetect: "browser",
        translations: {
          en: {
            consentModal: {
              title: "Cookie Consent",
              description: "This site uses cookies for traffic analysis. You can accept or manage your preferences.",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              showPreferencesBtn: "Manage preferences",
              footer: "<a href=\"/privacy-policy/\">Privacy Policy</a>"
            },
            preferencesModal: {
              title: "Cookie Preferences",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              savePreferencesBtn: "Save preferences",
              closeIconLabel: "Close modal",
              serviceCounterLabel: "Service|Services",
              sections: [
                {
                  title: "Cookie Usage",
                  description: "This site uses cookies for traffic analysis. You can accept or manage your preferences."
                },
                {
                  title: "Strictly Necessary Cookies <span class=\"pm__badge\">Always enabled</span>",
                  description: "Cookies required for basic site functionality such as comment management and session maintenance.",
                  linkedCategory: "necessary"
                },
                {
                  title: "Analytics Cookies",
                  description: "Cookies used for traffic analysis and site performance improvement. These cookies collect information such as visitor count and page views.",
                  linkedCategory: "analytics"
                }
              ]
            }
          },
          ja: {
            consentModal: {
              title: "Cookieへの同意",
              description: "このサイトでは、トラフィック分析のためにCookieを使用しています。Cookieの使用に同意するか、設定を管理してください。",
              acceptAllBtn: "すべて受け入れる",
              acceptNecessaryBtn: "すべて拒否",
              showPreferencesBtn: "設定を管理",
              footer: "<a href=\"/privacy-policy/\">プライバシーポリシー</a>"
            },
            preferencesModal: {
              title: "Cookieの設定",
              acceptAllBtn: "すべて受け入れる",
              acceptNecessaryBtn: "すべて拒否",
              savePreferencesBtn: "設定を保存",
              closeIconLabel: "モーダルを閉じる",
              serviceCounterLabel: "サービス",
              sections: [
                {
                  title: "Cookieの使用",
                  description: "このサイトでは、トラフィック分析のためにCookieを使用しています。Cookieの使用に同意するか、設定を管理してください。"
                },
                {
                  title: "厳密に必要なCookie <span class=\"pm__badge\">常に有効</span>",
                  description: "コメント欄の管理や、セッションの維持など、サイトの基本的な機能を提供するために必要なCookieです。",
                  linkedCategory: "necessary"
                },
                {
                  title: "解析用のCookie",
                  description: "トラフィック分析やサイトのパフォーマンス向上のために使用されるCookieです。これらのCookieは、訪問者数やページビューなどの情報を収集します。",
                  linkedCategory: "analytics"
                }
              ]
            }
          }
        }
      }
    }),
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
});
