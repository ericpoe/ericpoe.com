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
    command: `npm run build && npm run preview -- --host --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 120_000,
    // Astro 7's `astro preview` auto-detects agentic environments (via `am-i-vibing`)
    // and daemonizes itself, so the foreground process exits immediately and Playwright
    // reports "Process from config.webServer exited early". Setting the background env
    // var tells Astro this process IS the server and to stay in the foreground.
    env: { ASTRO_PREVIEW_BACKGROUND: '1' },
  },
});
