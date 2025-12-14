import { expect, test } from '@playwright/test';

test.beforeEach(async ({ context }) => {
  // Force light mode so computed colors are deterministic.
  await context.addInitScript(() => {
    localStorage.setItem('color-scheme', 'light');
  });
});

const getColor = async (locator: import('@playwright/test').Locator) =>
  locator.evaluate((el) => getComputedStyle(el as HTMLElement).color);

const expectUpToTenArticles = async (locator: import('@playwright/test').Locator) => {
  const count = await locator.count();
  expect(count).toBeGreaterThan(0);
  expect(count).toBeLessThanOrEqual(10);
};

test('index pagination shows at most 10 posts and next link matches read-more styling', async ({ page }) => {
  await page.goto('/');

  const articles = page.locator('#latestPosts article');
  await expectUpToTenArticles(articles);

  const readMore = page.getByRole('link', { name: 'Read more...' }).first();
  const nextLink = page.getByRole('link', { name: 'Next page →' });
  await expect(nextLink).toBeVisible();

  const readMoreColor = await getColor(readMore);
  const nextColor = await getColor(nextLink);
  expect(nextColor).toBe(readMoreColor);
});

test('index out-of-range page hits 404', async ({ page }) => {
  const res = await page.goto('/page/999/', { waitUntil: 'domcontentloaded' });
  expect(res?.status()).toBe(404);
});

test('category pagination respects page size and link styling; out-of-range goes to 404', async ({ page }) => {
  await page.goto('/');
  const navLinks = page.locator('nav').getByRole('link');
  const categoryLink = navLinks.nth(1); // first category after site title
  await expect(categoryLink).toBeVisible();

  const categoryHref = await categoryLink.getAttribute('href');
  expect(categoryHref).not.toBeNull();
  await page.goto(categoryHref!);

  const articles = page.locator('#categoryPosts article');
  await expectUpToTenArticles(articles);

  const readMore = page.getByRole('link', { name: 'Read more...' }).first();
  const nextLink = page.getByRole('link', { name: 'Next page →' });
  if (await nextLink.count()) {
    await expect(nextLink).toHaveClass(/text-indigo-700/);
    await expect(readMore).toHaveClass(/text-indigo-700/);
  }

  const badCategoryUrl = categoryHref!.endsWith('/') ? `${categoryHref}page/999/` : `${categoryHref}/page/999/`;
  const badRes = await page.goto(badCategoryUrl, { waitUntil: 'domcontentloaded' });
  expect(badRes?.status()).toBe(404);
});

test('tag pagination respects page size and link styling; out-of-range goes to 404', async ({ page }) => {
  await page.goto('/');
  const firstPostLink = page.getByRole('link', { name: 'Read more...' }).first();
  const postHref = await firstPostLink.getAttribute('href');
  expect(postHref).not.toBeNull();
  await page.goto(postHref!);

  const tagLink = page.locator('a[href^="/tag/"]').first();
  await expect(tagLink).toBeVisible();
  const tagHref = await tagLink.getAttribute('href');
  expect(tagHref).not.toBeNull();
  await page.goto(tagHref!);

  const articles = page.locator('#tagPosts article');
  await expectUpToTenArticles(articles);

  const readMore = page.getByRole('link', { name: 'Read more...' }).first();
  const nextLink = page.getByRole('link', { name: 'Next page →' });
  if (await nextLink.count()) {
    await expect(nextLink).toHaveClass(/text-indigo-700/);
    await expect(readMore).toHaveClass(/text-indigo-700/);
  }

  const badTagUrl = tagHref!.endsWith('/') ? `${tagHref}page/999/` : `${tagHref}/page/999/`;
  const badRes = await page.goto(badTagUrl, { waitUntil: 'domcontentloaded' });
  expect(badRes?.status()).toBe(404);
});
