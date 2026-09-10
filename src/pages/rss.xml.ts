import rss from '@astrojs/rss';
import { siteMetadata } from '../data/siteMetadata';
import { getAllPosts, postDescription, postPath, postTerms } from '../utils/blog';
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
      description: postDescription(post),
      link: postPath(post),
      categories: postTerms(post),
    })),
    customData: `<language>en-us</language>`,
  });
}
