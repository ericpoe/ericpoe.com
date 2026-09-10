import { getCollection, type CollectionEntry } from 'astro:content';
import { slugify } from './slugify';
import { summarize } from './summarize';
import { formatTitleMla } from './titleCase';

export const PAGE_SIZE = 10;

// Word budget for the excerpt reused as the meta description and RSS summary.
const DESCRIPTION_WORD_LIMIT = 30;

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

export function tagPath(name: string, page = 1): string {
  const slug = slugify(name);
  return page > 1 ? `/tag/${slug}/page/${page}/` : `/tag/${slug}/`;
}

export function categoryPath(name: string, page = 1): string {
  const slug = slugify(name);
  return page > 1 ? `/category/${slug}/page/${page}/` : `/category/${slug}/`;
}

// A post's taxonomy terms (categories then tags), used for both the article
// keyword meta and the RSS <category> list.
export function postTerms(post: BlogPost): string[] {
  return [...(post.data.categories ?? []), ...(post.data.tags ?? [])];
}

// The excerpt shared by the post's meta description and its RSS entry.
export function postDescription(post: BlogPost): string {
  return summarize(post.body ?? '', DESCRIPTION_WORD_LIMIT);
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

// A post is publishable unless it is flagged `draft` or its `date` is still in
// the future. The gate only applies to production builds (`astro build` /
// `astro preview`); `astro dev` shows every post so drafts can be previewed.
export function isPublishable(post: BlogPost, now = Date.now()): boolean {
  return !post.data.draft && post.data.date.getTime() <= now;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  allPostsPromise ??= getCollection('blog').then((posts) => {
    const visible = import.meta.env.PROD ? posts.filter((post) => isPublishable(post)) : posts.slice();
    return visible.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  });

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
      const raw = value.trim();
      if (!raw) continue;

      const slug = slugify(raw);
      // Tags are stored kebab-case; categories are already display strings.
      const name = key === 'tags' ? raw.replace(/-/g, ' ') : raw;
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

// ---------------------------------------------------------------------------
// Listing pages
//
// The home feed, the `/page/N` feed pages, and both taxonomy trees all render
// the same shell: a titled section, a PostFeed, and prev/next pagination. These
// helpers produce that shell's props (and the getStaticPaths entries) from a
// post list + a page number + the route's own path function, so the six route
// files stay one-liners.
// ---------------------------------------------------------------------------

export interface ListingProps extends Record<string, unknown> {
  title: string;
  pathname: string;
  sectionId: string;
  posts: BlogPost[];
  previousHref?: string;
  nextHref?: string;
}

interface ListingSpec {
  path: (_page: number) => string;
  title: string;
  sectionId: string;
}

function listingProps(source: BlogPost[], pageNumber: number, spec: ListingSpec): ListingProps {
  const { posts, totalPages } = paginatePosts(source, pageNumber);
  return {
    title: spec.title,
    sectionId: spec.sectionId,
    posts,
    pathname: spec.path(pageNumber),
    previousHref: pageNumber > 1 ? spec.path(pageNumber - 1) : undefined,
    nextHref: pageNumber < totalPages ? spec.path(pageNumber + 1) : undefined,
  };
}

// Page numbers a `/page/[page]` route emits: 2..totalPages (page 1 lives at the
// tree root).
function trailingPages(totalPages: number): number[] {
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => index + 2);
}

const FEED_SPEC: ListingSpec = { path: pagePath, title: 'Latest Posts', sectionId: 'latestPosts' };

const TAXONOMY_ROUTES: { key: TaxonomyKey; param: string; sectionId: string; path: typeof tagPath }[] = [
  { key: 'tags', param: 'tag', sectionId: 'tagPosts', path: tagPath },
  { key: 'categories', param: 'category', sectionId: 'categoryPosts', path: categoryPath },
];

function taxonomySpec(item: TaxonomyItem, route: (typeof TAXONOMY_ROUTES)[number]): ListingSpec {
  return {
    path: (page: number) => route.path(item.slug, page),
    title: formatTitleMla(item.name),
    sectionId: route.sectionId,
  };
}

export async function feedListing(pageNumber = 1): Promise<ListingProps> {
  return listingProps(await getAllPosts(), pageNumber, FEED_SPEC);
}

export async function feedPagePaths(): Promise<{ params: { page: string }; props: ListingProps }[]> {
  const posts = await getAllPosts();
  const { totalPages } = paginatePosts(posts, 1);
  return trailingPages(totalPages).map((pageNumber) => ({
    params: { page: String(pageNumber) },
    props: listingProps(posts, pageNumber, FEED_SPEC),
  }));
}

export async function taxonomyListingPaths(): Promise<
  { params: { taxonomy: string; term: string }; props: ListingProps }[]
> {
  const paths = [];
  for (const route of TAXONOMY_ROUTES) {
    for (const item of await getTaxonomyItems(route.key)) {
      paths.push({
        params: { taxonomy: route.param, term: item.slug },
        props: listingProps(item.posts, 1, taxonomySpec(item, route)),
      });
    }
  }
  return paths;
}

export async function taxonomyPagePaths(): Promise<
  { params: { taxonomy: string; term: string; page: string }; props: ListingProps }[]
> {
  const paths = [];
  for (const route of TAXONOMY_ROUTES) {
    for (const item of await getTaxonomyItems(route.key)) {
      const spec = taxonomySpec(item, route);
      for (const pageNumber of trailingPages(item.totalPages)) {
        paths.push({
          params: { taxonomy: route.param, term: item.slug, page: String(pageNumber) },
          props: listingProps(item.posts, pageNumber, spec),
        });
      }
    }
  }
  return paths;
}
