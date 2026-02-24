import { expect, test } from '@playwright/test';

type ToggleSnapshot = {
  ariaPressed: string | null;
  statusText: string;
  rootIsDark: boolean;
  storedMode: string | null;
  trackHasStart: boolean;
  trackHasCenter: boolean;
  trackHasEnd: boolean;
  iconLines: number;
  iconPaths: number;
  iconCircles: number;
};

const seedTheme = async (context: import('@playwright/test').BrowserContext, mode?: 'light' | 'dark' | 'system') => {
  await context.addInitScript((value) => {
    localStorage.removeItem('color-scheme');
    if (value && value !== 'system') {
      localStorage.setItem('color-scheme', value);
    }
  }, mode);
};

const getToggleSnapshot = async (page: import('@playwright/test').Page): Promise<ToggleSnapshot> =>
  page.evaluate(() => {
    const btn = document.getElementById('themeToggle');
    const track = document.getElementById('themeTrack');
    const knob = document.getElementById('themeKnob');
    const status = document.getElementById('themeToggleStatus');
    const svg = knob?.querySelector('svg');

    return {
      ariaPressed: btn?.getAttribute('aria-pressed') ?? null,
      statusText: status?.textContent?.trim() ?? '',
      rootIsDark: document.documentElement.classList.contains('dark'),
      storedMode: localStorage.getItem('color-scheme'),
      trackHasStart: track?.classList.contains('justify-start') ?? false,
      trackHasCenter: track?.classList.contains('justify-center') ?? false,
      trackHasEnd: track?.classList.contains('justify-end') ?? false,
      iconLines: svg?.querySelectorAll('line').length ?? 0,
      iconPaths: svg?.querySelectorAll('path').length ?? 0,
      iconCircles: svg?.querySelectorAll('circle').length ?? 0,
    };
  });

// These visual assertions protect against Tailwind purge regressions for classes
// used only in public/scripts/theme-toggle.js (e.g. justify-center, w-5, h-5)
const expectSystemVisual = (snapshot: ToggleSnapshot) => {
  expect(snapshot.ariaPressed).toBe('mixed');
  expect(snapshot.statusText).toBe('System preference (light)');
  expect(snapshot.rootIsDark).toBe(false);
  expect(snapshot.storedMode).toBeNull();
  expect(snapshot.trackHasCenter).toBe(true);
  expect(snapshot.trackHasStart).toBe(false);
  expect(snapshot.trackHasEnd).toBe(false);
  expect(snapshot.iconLines).toBe(9);
  expect(snapshot.iconPaths).toBe(1);
  expect(snapshot.iconCircles).toBe(1);
};

const expectDarkVisual = (snapshot: ToggleSnapshot) => {
  expect(snapshot.ariaPressed).toBe('true');
  expect(snapshot.statusText).toBe('Dark mode');
  expect(snapshot.rootIsDark).toBe(true);
  expect(snapshot.storedMode).toBe('dark');
  expect(snapshot.trackHasEnd).toBe(true);
  expect(snapshot.trackHasStart).toBe(false);
  expect(snapshot.trackHasCenter).toBe(false);
  expect(snapshot.iconLines).toBe(0);
  expect(snapshot.iconPaths).toBe(1);
  expect(snapshot.iconCircles).toBe(0);
};

const expectLightVisual = (snapshot: ToggleSnapshot) => {
  expect(snapshot.ariaPressed).toBe('false');
  expect(snapshot.statusText).toBe('Light mode');
  expect(snapshot.rootIsDark).toBe(false);
  expect(snapshot.storedMode).toBe('light');
  expect(snapshot.trackHasStart).toBe(true);
  expect(snapshot.trackHasCenter).toBe(false);
  expect(snapshot.trackHasEnd).toBe(false);
  expect(snapshot.iconLines).toBe(8);
  expect(snapshot.iconPaths).toBe(0);
  expect(snapshot.iconCircles).toBe(1);
};

test('theme toggle matches live-site default visual state (system/light)', async ({ page, context }) => {
  await seedTheme(context, 'system');
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');

  const toggle = page.getByRole('button', { name: /toggle color scheme/i });
  await expect(toggle).toBeVisible();
  await expect(page.locator('#themeKnob svg')).toBeVisible();

  expectSystemVisual(await getToggleSnapshot(page));
});

test('theme toggle cycles system -> dark -> light -> system with matching visuals', async ({ page, context }) => {
  await seedTheme(context, 'system');
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');

  const toggle = page.getByRole('button', { name: /toggle color scheme/i });

  expectSystemVisual(await getToggleSnapshot(page));

  await toggle.click();
  expectDarkVisual(await getToggleSnapshot(page));

  await toggle.click();
  expectLightVisual(await getToggleSnapshot(page));

  await toggle.click();
  expectSystemVisual(await getToggleSnapshot(page));
});

test('theme state and visual position persist across client-side navigation', async ({ page, context }) => {
  await seedTheme(context, 'dark');
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');

  let snapshot = await getToggleSnapshot(page);
  expectDarkVisual(snapshot);

  await page.getByRole('link', { name: 'Programming' }).click();
  await expect(page).toHaveURL(/\/category\/programming\//);

  snapshot = await getToggleSnapshot(page);
  expectDarkVisual(snapshot);

  await page.getByRole('link', { name: 'Eric Poe' }).click();
  await expect(page).toHaveURL('/');

  snapshot = await getToggleSnapshot(page);
  expectDarkVisual(snapshot);
});

test('header links share the same theming as the site title in light and dark modes', async ({ page, context }) => {
  await seedTheme(context, 'light');
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');

  const titleLink = page.getByRole('link', { name: /eric poe/i });
  const firstCategory = page.locator('nav').getByRole('link').nth(1);
  const toggle = page.getByRole('button', { name: /toggle color scheme/i });

  await expect(titleLink).toBeVisible();
  await expect(firstCategory).toBeVisible();

  const titleColorLight = await titleLink.evaluate((el) => getComputedStyle(el as HTMLElement).color);
  const categoryColorLight = await firstCategory.evaluate((el) => getComputedStyle(el as HTMLElement).color);
  expect(categoryColorLight).toBe(titleColorLight);

  await toggle.click(); // light -> system
  await toggle.click(); // system -> dark
  const titleColorDark = await titleLink.evaluate((el) => getComputedStyle(el as HTMLElement).color);
  const categoryColorDark = await firstCategory.evaluate((el) => getComputedStyle(el as HTMLElement).color);
  expect(categoryColorDark).toBe(titleColorDark);
});
