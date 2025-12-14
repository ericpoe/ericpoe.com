import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['tests/unit/**/*.test.ts'],
    exclude: ['tests/e2e/**', 'node_modules/**'],
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
});
