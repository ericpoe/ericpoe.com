import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

const IndexPage = ({ data }) => (
  <Layout>
    <div id="latestPosts">
      <h1>Latest Posts</h1>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <h2>{node.frontmatter.title} </h2>
          <p>{node.frontmatter.date}</p>
          <p>{node.excerpt}</p>
          <Link to={node.fields.slug}>Read more...</Link>
        </div>
      ))}
    </div>
  </Layout>
);

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY MMMM DD HH:mm")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;

export default IndexPage;
