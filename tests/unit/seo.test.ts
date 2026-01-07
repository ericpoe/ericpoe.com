import { describe, expect, it } from 'vitest';
import { buildCanonicalUrl, parseKeywords, resolveImageUrl, resolveImageAlt } from '../../src/utils/seo';
import { siteMetadata } from '../../src/data/siteMetadata';

describe('buildCanonicalUrl', () => {
  it('builds URL from pathname and site URL', () => {
    expect(buildCanonicalUrl('/blog/hello/')).toBe('https://www.ericpoe.com/blog/hello/');
    expect(buildCanonicalUrl('/about/')).toBe('https://www.ericpoe.com/about/');
  });

  it('defaults to root path', () => {
    expect(buildCanonicalUrl()).toBe('https://www.ericpoe.com/');
    expect(buildCanonicalUrl('/')).toBe('https://www.ericpoe.com/');
  });

  it('handles paths without leading slash', () => {
    expect(buildCanonicalUrl('blog/post/')).toBe('https://www.ericpoe.com/blog/post/');
  });
});

describe('parseKeywords', () => {
  it('parses comma-separated string', () => {
    expect(parseKeywords('javascript, typescript, react')).toEqual(['javascript', 'typescript', 'react']);
  });

  it('trims whitespace from keywords', () => {
    expect(parseKeywords('  foo  ,  bar  ,  baz  ')).toEqual(['foo', 'bar', 'baz']);
  });

  it('filters empty keywords', () => {
    expect(parseKeywords('foo,,bar,,')).toEqual(['foo', 'bar']);
    expect(parseKeywords(',,')).toEqual([]);
  });

  it('passes through arrays', () => {
    expect(parseKeywords(['javascript', 'typescript'])).toEqual(['javascript', 'typescript']);
  });

  it('filters empty strings from arrays', () => {
    expect(parseKeywords(['foo', '', 'bar'])).toEqual(['foo', 'bar']);
  });

  it('handles undefined and empty string', () => {
    expect(parseKeywords(undefined)).toEqual([]);
    expect(parseKeywords('')).toEqual([]);
  });
});

describe('resolveImageUrl', () => {
  it('uses string path directly', () => {
    expect(resolveImageUrl('/images/custom.png')).toBe('https://www.ericpoe.com/images/custom.png');
  });

  it('extracts src from ImageMetadata object', () => {
    const imageMetadata = {
      src: '/images/optimized.webp',
      width: 800,
      height: 600,
      format: 'webp' as const,
    };
    expect(resolveImageUrl(imageMetadata)).toBe('https://www.ericpoe.com/images/optimized.webp');
  });

  it('falls back to site default image when undefined', () => {
    expect(resolveImageUrl(undefined)).toBe(`https://www.ericpoe.com${siteMetadata.image}`);
  });
});

describe('resolveImageAlt', () => {
  it('uses provided alt text', () => {
    expect(resolveImageAlt('Custom alt text', 'Page Title')).toBe('Custom alt text');
  });

  it('falls back to title when alt is undefined', () => {
    expect(resolveImageAlt(undefined, 'Page Title')).toBe('Page Title');
  });

  it('prefers empty string alt over title', () => {
    expect(resolveImageAlt('', 'Page Title')).toBe('');
  });
});
