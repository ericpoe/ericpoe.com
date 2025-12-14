import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://www.ericpoe.com',
  trailingSlash: 'always',
  integrations: [mdx(), react(), tailwind(), sitemap()],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: {
        light: 'github-light-high-contrast',
        dark: 'github-dark-high-contrast',
      },
    },
  },
});
