import { SitemapStream, streamToPromise } from "sitemap";
import { getSinglePage } from "@lib/contentParser";
import { getDescriptions } from "@lib/utils/contentDescription";

export async function get(context) {
  const posts = await getSinglePage("posts");

  const smStream = new SitemapStream({
    hostname: context.site,
  });

  posts.forEach((post) => {
    smStream.write({
      url: `/blog/${post.slug}`,
      lastmod: post.data.date,
      img: post.data.image && [{url: post.data.image}]
    });
  });
  smStream.end()

  const body = await streamToPromise(smStream);
  return {body};
}
