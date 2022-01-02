import React from 'react';
import { graphql } from 'gatsby';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import Layout from '../components/layout';

const blogPost = ({ data, location }) => {
  const post = data.markdownRemark;
  const categories = post.frontmatter.categories || [];
  const tags = post.frontmatter.tags || [];
  const keywords = categories
    .concat(tags)
    .reduce((sentence, word) => `${sentence}, ${word}`);
  const baseUrl = 'https://ericpoe.com';
  const featuredImageUrl = post.frontmatter.featuredImage_Url
    ? baseUrl + post.frontmatter.featuredImage_Url.publicURL
    : `${baseUrl}/images/largeGlassesProfile-clear.png`;
  const featuredImageAlt =
    post.frontmatter.featuredImage_Alt ||
    'A photo of the author as a young man in oversized fake glasses';
  return (
    <Layout>
      <div className="leading-normal text-lg">
        <GatsbySeo
          title={post.frontmatter.title}
          description={post.excerpt || ''}
          metaTags={[{ name: 'keywords', content: keywords }]}
          openGraph={{
            type: 'article',
            locale: 'en_US',
            title: post.frontmatter.title,
            url: baseUrl + location.pathname,
            images: [
              {
                url: featuredImageUrl,
                alt: featuredImageAlt,
              },
            ],
            site_name: 'Eric Poe',
          }}
        />
        <h1>{post.frontmatter.title}</h1>
        <p id="datePosted" className="pt-2">
          <strong>{post.frontmatter.date}</strong>
        </p>
        <p id="timeToRead">
          <strong>Time to read: </strong>
          {post.timeToRead} {post.timeToRead > 1 ? 'minutes' : 'minute'}
        </p>
        <div
          id="blogContent"
          dangerouslySetInnerHTML={{ __html: post.html }}
          className="leading-normal pt-4"
        />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 200, truncate: true)
      html
      frontmatter {
        title
        date(formatString: "YYYY MMMM DD HH:mm")
        categories
        tags
        featuredImage_Url {
          publicURL
        }
        featuredImage_Alt
      }
      timeToRead
    }
  }
`;

export default blogPost;
