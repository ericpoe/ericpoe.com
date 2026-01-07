import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteMetadata } from '../data/siteMetadata';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: siteMetadata.title,
    description: siteMetadata.description,
    site: context.site ?? siteMetadata.siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.categories?.join(', ') ?? '',
      link: `/blog/${post.slug}/`,
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
