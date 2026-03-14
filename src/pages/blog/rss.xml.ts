import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getSinglePage } from "@/lib/contentParser.astro";
import config from "@/config/config.json";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { remarkStripPublicPrefix, resolveRelativeMd } from "@/lib/utils/remarkCustomize";

const moreText = "<p>…<br/><br/>続きはWebで</p>";

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkStripPublicPrefix)
  .use(resolveRelativeMd)
  .use(remarkEmoji)
  .use(remarkRehype)
  .use(rehypeStringify, { closeSelfClosing: true });

function extractBeforeToc(body: string): string {
  const tocIndex = body.indexOf("\n## 目次\n");
  if (tocIndex !== -1) {
    return body.slice(0, tocIndex);
  }
  return body;
}

async function renderToHtml(markdown: string): Promise<string> {
  const result = await processor.process(markdown);
  return String(result);
}

export const GET: APIRoute = async (context) => {
  const posts = await getSinglePage("blog");
  const contents = await Promise.all(
    posts.map(async (post) => {
      const excerpt = extractBeforeToc(post.body ?? "");
      return await renderToHtml(excerpt);
    }),
  );
  return rss({
    title: config.site.title,
    description: config.site.description,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    items: posts.map((post, i) => ({
      content: contents[i] + moreText,
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      categories: post.data.categories,
      author: post.data.author,
      link: `/blog/${post.id}/`,
    })),
  });
}
