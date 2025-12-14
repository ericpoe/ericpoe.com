import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';

const astroRecommended = astro.configs['flat/recommended'];

export default [
  {
    ignores: ['.cache', 'node_modules', 'tailwind-config.js', 'public', '.DS_Store', 'dist'],
  },
  js.configs.recommended,
  ...astroRecommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
];
