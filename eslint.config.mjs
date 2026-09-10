import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';

const astroRecommended = astro.configs['flat/recommended'];
const sharedGlobals = {
  console: 'readonly',
  document: 'readonly',
  fetch: 'readonly',
  globalThis: 'readonly',
  getComputedStyle: 'readonly',
  HTMLElement: 'readonly',
  localStorage: 'readonly',
  navigator: 'readonly',
  process: 'readonly',
  setTimeout: 'readonly',
  URL: 'readonly',
  window: 'readonly',
};
const testGlobals = {
  afterAll: 'readonly',
  afterEach: 'readonly',
  beforeAll: 'readonly',
  beforeEach: 'readonly',
  describe: 'readonly',
  expect: 'readonly',
  it: 'readonly',
  test: 'readonly',
  vi: 'readonly',
};

export default [
  {
    ignores: ['.astro', '.cache', 'blob-report', 'coverage', 'dist', 'node_modules', 'playwright-report', 'test-results', '.DS_Store'],
  },
  js.configs.recommended,
  ...astroRecommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: sharedGlobals,
      sourceType: 'module',
    },
  },
  {
    files: ['**/*.{ts,mts,cts,tsx}'],
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      // Without the typescript-eslint plugin, core no-unused-vars also flags
      // parameter names inside TS type annotations (e.g. the `page` in
      // `path: (page: number) => string`), which are required syntax, not real
      // bindings. Allow an underscore prefix to opt such names out; `tsc` (via
      // `astro check`) still catches genuine unused bindings.
      'no-unused-vars': [
        'error',
        { args: 'after-used', argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  {
    files: ['tests/**/*.{js,mjs,cjs,ts,mts,cts,tsx}'],
    languageOptions: {
      globals: {
        ...sharedGlobals,
        ...testGlobals,
      },
    },
  },
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: {
        ...sharedGlobals,
        __dirname: 'readonly',
      },
    },
  },
  {
    files: ['playwright.config.ts', 'vitest.config.ts', 'vitest.setup.ts', 'astro.config.mjs', 'eslint.config.mjs'],
    languageOptions: {
      sourceType: 'module',
    },
  },
];
