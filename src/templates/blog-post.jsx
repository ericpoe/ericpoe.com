import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const blogPost = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <p id="datePosted">
          <strong>{post.frontmatter.date}</strong>
        </p>
        <p id="timeToRead">
          <strong>Time to read: </strong>
          {post.timeToRead} {post.timeToRead > 1 ? 'minutes' : 'minute'}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY MMMM DD HH:mm")
      }
      timeToRead
    }
  }
`;

export default blogPost;
