import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { siteMetadata } from './src/data/siteMetadata';

export default defineConfig({
  site: siteMetadata.siteUrl,
  trailingSlash: 'always',
  integrations: [mdx(), react(), sitemap()],
  env: {
    schema: {
      PUBLIC_GA_MEASUREMENT_ID: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
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
