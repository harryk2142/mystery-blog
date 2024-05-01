import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION_SHORT } from "../consts";

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION_SHORT,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
    })),
  });
}
