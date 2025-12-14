import { expect, test } from '@playwright/test';

test('home page renders latest posts list', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Latest Posts');
  await expect(page.getByRole('link', { name: 'Eric Poe' })).toBeVisible();
});
