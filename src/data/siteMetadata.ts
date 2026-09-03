// Single source of truth for site-wide metadata. `siteUrl` also feeds Astro's
// `site` config (see astro.config.mjs), which drives the sitemap and RSS output,
// so canonical/OG URLs and the sitemap can't drift apart.
export const siteMetadata = {
  title: 'Eric Poe',
  description: 'A monument to a self-inflated ego',
  siteName: 'Eric Poe - A monument to a self-inflated ego',
  siteUrl: 'https://www.ericpoe.com',
  twitterUsername: '@eric_poe',
  image: '/images/largeGlassesProfile-clear.png',
};
