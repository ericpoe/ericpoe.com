import React from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/layout';

const IndexPage = ({ data }) => (
  <>
    <Helmet
      meta={[
        {
          name: 'description',
          content: 'List of blog entries for ericpoe.com',
        },
      ]}
    />
    <Layout>
      <div id="latestPosts" className="px-2">
        <h1 className="md:pb-6">Latest Posts</h1>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <article key={node.id} className="py-2 border-t-2">
            <h2>{node.frontmatter.title} </h2>
            <p className="my-1">
              <strong>Published:</strong> {node.frontmatter.date}
            </p>
            <p className="my-2 leading-normal">{node.excerpt}</p>
            <Link to={node.fields.slug}>Read more...</Link>
          </article>
        ))}
      </div>
    </Layout>
  </>
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
            date(formatString: "YYYY MMMM DD")
          }
          fields {
            slug
          }
          excerpt(pruneLength: 256)
        }
      }
    }
  }
`;

export default IndexPage;
