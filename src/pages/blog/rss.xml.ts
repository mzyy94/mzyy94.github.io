import rss from "@astrojs/rss";
import { getSinglePage } from "@lib/contentParser.astro";
import config from "@config/config.json";

export async function get(context) {
  const posts = await getSinglePage("posts");
  return rss({
    title: config.site.title,
    description: config.site.description,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    items: posts.map(post => ({
      content: post.body,
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      categories: post.data.categories,
      author: post.data.author,
      link: `/blog/${post.slug}/`,
    })),
  });
}
