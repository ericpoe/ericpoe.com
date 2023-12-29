import React from 'react';
import { useSiteMetadata } from '../hooks/use-site-metadata';

export const SEO = ({
  title,
  description,
  keywords,
  pathname,
  articleImage,
  articleImageAlt,
  articleCreatedAt,
  articleUpdatedAt,
  type,
  children,
}) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image,
    siteUrl,
    twitterUsername,
    siteName,
  } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    type: type || 'website',
    articleCreatedAt: articleCreatedAt || '',
    articleUpdatedAt: articleUpdatedAt || '',
    description: description || defaultDescription,
    keywords: keywords || '',
    image: `${siteUrl}${articleImage || image}`,
    imageAlt: articleImageAlt,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername,
    siteName: siteName,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="locale" property='og:locale' content="en_US" />
      <meta name="title" property='og:title' content={seo.title} />
      <meta name="description" property="og:description" content={seo.description} />
      <meta name="url" property="og:url" content={seo.url} />
      <meta name="image" property="og:image" content={seo.image} />
      <meta name="og:image:alt" content={seo.imageAlt} />
      <meta name="keywords" property="og:article:tag" content={seo.keywords} />
      <meta name="publish_date" property='og:publish_date' content={seo.articleCreatedAt} />
      <meta name="author" property="og:author_name" content="Eric Poe" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.imageAlt} />
      <meta name="twitter:creator" content={seo.twitterUsername} />
      <meta name="og:type" content={seo.type} />
      {/* <Fallback to "link" for Mastodon and other clients that don't recognize "article"> */}
      <meta name="og:type" content={seo.type === 'article' ? 'link' : null} />
      <meta name="og:article:published_time" content={seo.articleCreatedAt} />
      <meta name="og:article:modified_time" content={seo.articleUpdatedAt} />
      <meta name="og:site_name" content={seo.siteName} />
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>"
      />
      {children}
    </>
  );
};
