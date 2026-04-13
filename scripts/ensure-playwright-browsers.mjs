import { access } from 'node:fs/promises';
import process from 'node:process';
import { chromium } from 'playwright';

const executablePath = chromium.executablePath();

try {
  await access(executablePath);
} catch (error) {
  const code = typeof error === 'object' && error !== null && 'code' in error ? error.code : undefined;

  if (code === 'ENOENT') {
    console.error(
      [
        'Playwright Chromium is not installed.',
        'Run `npx playwright install` and then rerun the E2E suite.',
        `Expected browser executable: ${executablePath}`,
      ].join('\n'),
    );
    process.exit(1);
  }

  throw error;
}
