import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import { SEO } from '../components/seo';

const IndexPage = function IndexPage({ data }) {
  return (
    <Layout>
      <div id="latestPosts" className="px-2">
        <h1 className="md:pb-8 md:pt-2">Latest Posts</h1>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <article key={node.id} className="py-2 border-t-2 border-gray-300">
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
  );
};

export const query = graphql`
  {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
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

export const Head = () => (
  <SEO title="Eric Poe" description="List of blog entries for ericpoe.com" />
);
