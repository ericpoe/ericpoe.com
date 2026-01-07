import type { ImageMetadata } from 'astro';
import { siteMetadata } from '../data/siteMetadata';

export type MaybeImage = ImageMetadata | string | undefined;

export interface SeoInput {
  title?: string;
  description?: string;
  keywords?: string | string[];
  pathname?: string;
  articleImage?: MaybeImage;
  articleImageAlt?: string;
}

export function buildCanonicalUrl(pathname: string = '/'): string {
  return new URL(pathname, siteMetadata.siteUrl).toString();
}

export function parseKeywords(keywords: string | string[] | undefined): string[] {
  if (!keywords) return [];
  if (Array.isArray(keywords)) return keywords.filter(Boolean);
  return keywords
    .split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

export function resolveImageUrl(articleImage: MaybeImage): string {
  const imagePath =
    typeof articleImage === 'string'
      ? articleImage
      : articleImage && 'src' in articleImage
        ? articleImage.src
        : siteMetadata.image;
  return new URL(imagePath, siteMetadata.siteUrl).toString();
}

export function resolveImageAlt(articleImageAlt: string | undefined, title: string): string {
  return articleImageAlt ?? title;
}
