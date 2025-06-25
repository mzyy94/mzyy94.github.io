import type { APIRoute } from 'astro';

import { SitemapStream, streamToPromise } from "sitemap";
import { getSinglePage } from "@/lib/contentParser.astro";

export const GET: APIRoute = async (context) => {
  const posts = await getSinglePage("blog");

  const smStream = new SitemapStream({
    hostname: context.site,
  });

  posts.forEach((post) => {
    smStream.write({
      url: `/blog/${post.id}`,
      lastmod: post.data.date,
      img: post.data.image && [{url: post.data.image}]
    });
  });
  smStream.end()

  const body = await streamToPromise(smStream);

  return new Response(body);
}
