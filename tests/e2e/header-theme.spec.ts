import { expect, test } from '@playwright/test';

test.beforeEach(async ({ context }) => {
  // Start in light mode to make expectations deterministic.
  await context.addInitScript(() => {
    localStorage.setItem('color-scheme', 'light');
  });
});

const getRootIsDark = (page: import('@playwright/test').Page) =>
  page.evaluate(() => document.documentElement.classList.contains('dark'));

const getColor = async (locator: import('@playwright/test').Locator) =>
  locator.evaluate((el) => getComputedStyle(el as HTMLElement).color);

test('theme toggle switches light/dark and updates aria state', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /toggle color scheme/i });

  await expect(toggle).toHaveAttribute('aria-label', /toggle color scheme/i);
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect.poll(() => getRootIsDark(page)).toBe(false);

  await toggle.click();
  await expect.poll(() => getRootIsDark(page)).toBe(true);
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');

  await toggle.click();
  await expect.poll(() => getRootIsDark(page)).toBe(false);
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
});

test('header links share the same theming as the site title in light and dark modes', async ({ page }) => {
  await page.goto('/');

  const titleLink = page.getByRole('link', { name: /eric poe/i });
  const firstCategory = page.locator('nav').getByRole('link').nth(1);

  await expect(titleLink).toBeVisible();
  await expect(firstCategory).toBeVisible();

  // Light mode colors should match.
  const titleColorLight = await getColor(titleLink);
  const categoryColorLight = await getColor(firstCategory);
  expect(categoryColorLight).toBe(titleColorLight);

  // Switch to dark mode and ensure colors still match.
  await page.getByRole('button', { name: /toggle color scheme/i }).click();
  await expect.poll(() => getRootIsDark(page)).toBe(true);

  const titleColorDark = await getColor(titleLink);
  const categoryColorDark = await getColor(firstCategory);
  expect(categoryColorDark).toBe(titleColorDark);
});
