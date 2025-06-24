import type { APIRoute } from 'astro';
import rss from "@astrojs/rss";
import { getSinglePage } from "@/lib/contentParser.astro";
import config from "@/config/config.json";

const moreText = "…<br/><br/>続きはWebで";
export const GET: APIRoute = async (context) => {
  const posts = await getSinglePage("blog");
  return rss({
    title: config.site.title,
    description: config.site.description,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    items: posts.map((post) => ({
      content: post.body?.slice(0, 512) + moreText || "",
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      categories: post.data.categories,
      author: post.data.author,
      link: `/blog/${post.id}/`,
    })),
  });
}
