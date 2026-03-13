import rss from '@astrojs/rss';
import { siteMetadata } from '../data/siteMetadata';
import { getAllPosts } from '../utils/blog';
import { summarize } from '../utils/summarize';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getAllPosts();

  return rss({
    title: siteMetadata.title,
    description: siteMetadata.description,
    site: context.site ?? siteMetadata.siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: summarize(post.body ?? '', 30),
      link: `/blog/${post.id}/`,
      categories: [...(post.data.categories ?? []), ...(post.data.tags ?? [])],
    })),
    customData: `<language>en-us</language>`,
  });
}
