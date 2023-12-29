import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { SEO } from '../components/seo';
import BlogTimestamp from './blog-timestamp';

const blogPost = ({ data, location }) => {
  const post = data.markdownRemark;

  return (
    <Layout>
      <div className="leading-normal text-lg">
        <section id="DateTimeInfo">
          <h1>{post.frontmatter.title}</h1>
          <BlogTimestamp
            createdAt={new Date(
              Date.parse(post.frontmatter.date),
            ).toUTCString()}
            lastEditedAt={
              post.frontmatter.lastEdited
                ? new Date(
                    Date.parse(post.frontmatter.lastEdited),
                  ).toUTCString()
                : null
            }
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
        date
        lastEdited
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

export const Head = ({ location, params, data, pageContext }) => {
  const post = data.markdownRemark;
  const categories = post.frontmatter.categories || [];
  const tags = post.frontmatter.tags || [];
  const keywords = categories
    .concat(tags)
    .reduce((sentence, word) => `${sentence}, ${word}`);
  const createdAt = new Date(Date.parse(post.frontmatter.date)).toISOString();
  const updatedAt = post.frontmatter.lastEdited
    ? new Date(Date.parse(post.frontmatter.lastEdited)).toISOString()
    : '';

  return (
    <>
      <SEO
        title={data.markdownRemark.frontmatter.title}
        description={data.markdownRemark.excerpt}
        keywords={keywords}
        pathname={location.pathname}
        articleImage={
          data.markdownRemark.frontmatter.featuredImage_Url?.publicURL
        }
        articleImageAlt={data.markdownRemark.frontmatter.featuredImage_Alt}
        type="link"
        locale="en_US"
        articleCreatedAt={createdAt}
        articleUpdatedAt={updatedAt}
      />
    </>
  );
};
