import { getCollection, type CollectionEntry } from 'astro:content';
import { slugify } from './slugify';

export const PAGE_SIZE = 10;

export type BlogPost = CollectionEntry<'blog'>;
export type TaxonomyKey = 'categories' | 'tags';

export interface PaginatedPosts extends Record<string, unknown> {
  pageNumber: number;
  totalPages: number;
  posts: BlogPost[];
}

export interface TaxonomyItem {
  name: string;
  slug: string;
  posts: BlogPost[];
  totalPages: number;
}

let allPostsPromise: Promise<BlogPost[]> | undefined;
const taxonomyItemsPromises = new Map<TaxonomyKey, Promise<TaxonomyItem[]>>();

// Astro's glob loader already lowercases each post's `id` (via github-slugger),
// so `post.id` is the canonical slug; these helpers just centralize the route shape.
export function postPath(post: BlogPost): string {
  return `/blog/${post.id}/`;
}

export function pagePath(page = 1): string {
  return page > 1 ? `/page/${page}/` : '/';
}

export function tagPath(slug: string, page = 1): string {
  return page > 1 ? `/tag/${slug}/page/${page}/` : `/tag/${slug}/`;
}

export function categoryPath(slug: string, page = 1): string {
  return page > 1 ? `/category/${slug}/page/${page}/` : `/category/${slug}/`;
}

export function formatBlogDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    timeZone: 'UTC',
  });
}

export function paginatePosts(posts: BlogPost[], pageNumber: number, pageSize = PAGE_SIZE): PaginatedPosts {
  const totalPages = Math.ceil(posts.length / pageSize);
  const start = Math.max(0, (pageNumber - 1) * pageSize);

  return {
    pageNumber,
    totalPages,
    posts: posts.slice(start, start + pageSize),
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  allPostsPromise ??= getCollection('blog').then((posts) =>
    posts.slice().sort((a, b) => b.data.date.getTime() - a.data.date.getTime()),
  );

  return allPostsPromise;
}

export async function getTaxonomyItems(key: TaxonomyKey): Promise<TaxonomyItem[]> {
  let promise = taxonomyItemsPromises.get(key);
  if (!promise) {
    promise = buildTaxonomyItems(key);
    taxonomyItemsPromises.set(key, promise);
  }
  return promise;
}

async function buildTaxonomyItems(key: TaxonomyKey): Promise<TaxonomyItem[]> {
  const posts = await getAllPosts();
  const taxonomyMap = new Map<string, Omit<TaxonomyItem, 'totalPages'>>();

  for (const post of posts) {
    for (const value of post.data[key] ?? []) {
      const name = value.trim();
      if (!name) continue;

      const slug = slugify(name);
      const existing = taxonomyMap.get(slug);
      if (existing) {
        existing.posts.push(post);
      } else {
        taxonomyMap.set(slug, { name, slug, posts: [post] });
      }
    }
  }

  return [...taxonomyMap.values()]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item) => ({ ...item, totalPages: Math.ceil(item.posts.length / PAGE_SIZE) }));
}

export async function getTaxonomyItem(key: TaxonomyKey, slug: string): Promise<TaxonomyItem | undefined> {
  const items = await getTaxonomyItems(key);
  return items.find((item) => item.slug === slug);
}
