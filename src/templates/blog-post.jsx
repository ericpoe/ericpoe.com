import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { SEO } from '../components/seo';
import BlogTimestamp from './blog-timestamp';
import { siteMetadata } from '../../gatsby-config';

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
        {/* <SEO
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
            publishedTime: post.frontmatter.date,
            modifiedTime: post.frontmatter.lastEdited,
            site_name: 'Eric Poe',
          }}
        /> */}
        <section id="DateTimeInfo">
          <h1>{post.frontmatter.title}</h1>
          <BlogTimestamp
            createdAt={post.frontmatter.date}
            lastEditedAt={post.frontmatter.lastEdited}
          />
          <p id="timeToRead">
            <strong>Time to read:</strong> {post.timeToRead}{' '}
            {post.timeToRead > 1 ? 'minutes' : 'minute'}
          </p>
        </section>
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
        lastEdited(formatString: "YYYY MMMM DD HH:mm")
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

export const Head = ({ location, params, data, pageContext }) => (
  console.log('My data: %o', data),
  console.log('My params: %o', params),
  console.log('My location: %o', location),
  console.log('My pagContext: %o', pageContext),
  (
    <SEO
      title={data.markdownRemark.frontmatter.title}
      description={data.markdownRemark.excerpt}

      // image={data.markdownRemark.frontmatter.featuredImageUrl ? data.markdownRemark.frontmatter.featuredImageUrl : siteMetadata.image}
    />
  )
);
