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

test('theme toggle cycles through light, system, and dark modes', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /toggle color scheme/i });

  // Start in light mode
  await expect(toggle).toHaveAttribute('aria-label', /toggle color scheme/i);
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect.poll(() => getRootIsDark(page)).toBe(false);

  // Click 1: light → system
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'mixed');
  // System mode follows OS preference (light in test environment)
  await expect.poll(() => getRootIsDark(page)).toBe(false);

  // Click 2: system → dark
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect.poll(() => getRootIsDark(page)).toBe(true);

  // Click 3: dark → light (cycle complete)
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect.poll(() => getRootIsDark(page)).toBe(false);
});

test('header links share the same theming as the site title in light and dark modes', async ({ page }) => {
  await page.goto('/');

  const titleLink = page.getByRole('link', { name: /eric poe/i });
  const firstCategory = page.locator('nav').getByRole('link').nth(1);
  const toggle = page.getByRole('button', { name: /toggle color scheme/i });

  await expect(titleLink).toBeVisible();
  await expect(firstCategory).toBeVisible();

  // Light mode colors should match.
  const titleColorLight = await getColor(titleLink);
  const categoryColorLight = await getColor(firstCategory);
  expect(categoryColorLight).toBe(titleColorLight);

  // Switch to dark mode (light → system → dark = 2 clicks)
  await toggle.click(); // system
  await toggle.click(); // dark
  await expect.poll(() => getRootIsDark(page)).toBe(true);

  const titleColorDark = await getColor(titleLink);
  const categoryColorDark = await getColor(firstCategory);
  expect(categoryColorDark).toBe(titleColorDark);
});

test('theme toggle renders correctly after client-side navigation', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /toggle color scheme/i });

  // Verify toggle has icon on initial load (svg should be present in knob)
  const knob = page.locator('#themeKnob');
  await expect(knob.locator('svg')).toBeVisible();

  // Navigate to a category page via client-side navigation
  await page.getByRole('link', { name: 'Programming' }).click();
  await expect(page).toHaveURL(/\/category\/programming\//);

  // Verify toggle still has icon after navigation
  await expect(toggle).toBeVisible();
  await expect(knob.locator('svg')).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');

  // Verify toggle is still functional after navigation (light → system → dark)
  await toggle.click(); // system
  await expect(toggle).toHaveAttribute('aria-pressed', 'mixed');
  await toggle.click(); // dark
  await expect.poll(() => getRootIsDark(page)).toBe(true);
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
});

test('theme state persists across client-side navigation', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /toggle color scheme/i });

  // Switch to dark mode (light → system → dark)
  await toggle.click(); // system
  await toggle.click(); // dark
  await expect.poll(() => getRootIsDark(page)).toBe(true);
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');

  // Navigate to another page
  await page.getByRole('link', { name: 'Programming' }).click();
  await expect(page).toHaveURL(/\/category\/programming\//);

  // Verify dark mode persists after navigation
  await expect.poll(() => getRootIsDark(page)).toBe(true);
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');

  // Navigate back home
  await page.getByRole('link', { name: 'Eric Poe' }).click();
  await expect(page).toHaveURL('/');

  // Verify dark mode still persists
  await expect.poll(() => getRootIsDark(page)).toBe(true);
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
});

test('system mode persists across navigation and shows correct icon', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /toggle color scheme/i });
  const knob = page.locator('#themeKnob');

  // Switch to system mode (light → system)
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'mixed');
  await expect(knob.locator('svg')).toBeVisible();

  // Navigate to another page
  await page.getByRole('link', { name: 'Programming' }).click();
  await expect(page).toHaveURL(/\/category\/programming\//);

  // Verify system mode persists with icon
  await expect(toggle).toHaveAttribute('aria-pressed', 'mixed');
  await expect(knob.locator('svg')).toBeVisible();
});
