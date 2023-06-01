import rss from "@astrojs/rss";
import { getSinglePage } from "@lib/contentParser";
import { getDescriptions } from "@lib/utils/contentDescription";
import config from "@config/config.json";

const moreText = "<br/><br/>続きはWebで";
export async function get(context) {
  const posts = await getSinglePage("posts");
  const contents = await getDescriptions(posts);
  return rss({
    title: config.site.title,
    description: config.site.description,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    items: posts.map((post, i) => ({
      content: contents[i] ? contents[i] + moreText : post.body,
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      categories: post.data.categories,
      author: post.data.author,
      link: `/blog/${post.slug}/`,
    })),
  });
}
