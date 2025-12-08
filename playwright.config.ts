import { defineConfig } from '@playwright/test';

const PORT = Number(process.env.PORT) || 4321;
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  use: {
    baseURL: BASE_URL,
    headless: true,
  },
  webServer: {
    command: `npm run dev -- --host --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
