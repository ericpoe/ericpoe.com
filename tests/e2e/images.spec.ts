import { expect, test } from '@playwright/test';

const localUrlPath = (rawUrl: string, baseUrl: string): string | undefined => {
  if (rawUrl.startsWith('data:')) return undefined;

  let url: URL;
  let base: URL;

  try {
    url = new URL(rawUrl, baseUrl);
    base = new URL(baseUrl);
  } catch {
    return undefined;
  }

  return url.origin === base.origin ? `${url.pathname}${url.search}` : undefined;
};

const extractLinks = (html: string): string[] =>
  [...html.matchAll(/<a\b[^>]*\bhref=(["'])(.*?)\1/gi)].flatMap((match) => {
    const href = match[2]?.trim();
    return href ? [href] : [];
  });

const extractImageSources = (html: string): string[] =>
  [...html.matchAll(/<img\b[^>]*\bsrc=(["'])(.*?)\1/gi)].flatMap((match) => {
    const src = match[2]?.trim();
    return src ? [src] : [];
  });

test('rendered pages do not contain broken local image links', async ({ request, baseURL }) => {
  expect(baseURL).toBeTruthy();

  const pendingPages = ['/'];
  const visitedPages = new Set<string>();
  const brokenImages: string[] = [];

  while (pendingPages.length > 0) {
    const pageUrl = pendingPages.shift()!;
    if (visitedPages.has(pageUrl)) continue;
    visitedPages.add(pageUrl);

    const page = await request.get(pageUrl);
    if (!page.ok()) {
      continue;
    }

    const contentType = page.headers()['content-type'] ?? '';
    if (!contentType.includes('text/html')) continue;

    const html = await page.text();

    for (const linkHref of extractLinks(html)) {
      const linkPath = localUrlPath(linkHref, `${baseURL}${pageUrl}`);
      if (linkPath && !visitedPages.has(linkPath) && !pendingPages.includes(linkPath)) {
        pendingPages.push(linkPath);
      }
    }

    for (const imageSrc of extractImageSources(html)) {
      const imagePath = localUrlPath(imageSrc, `${baseURL}${pageUrl}`);
      if (!imagePath) continue;

      const image = await request.get(imagePath);
      if (!image.ok()) {
        brokenImages.push(`${pageUrl} -> ${imageSrc} (${image.status()})`);
      }
    }
  }

  expect(brokenImages).toEqual([]);
});
