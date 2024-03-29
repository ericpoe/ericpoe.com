import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import Header from './header';
import Colophon from './colophon';
import './css/index.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

const Layout = function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <section
        id="children"
        className="flex flex-col flex-1 max-w-4xl mx-auto w-full px-4 py-1 md:p-4"
      >
        {children}
      </section>
      <section
        id="colophon"
        className="flex flex-col flex-1 max-w-5xl mx-auto w-full px-4 py-1 md:p-4 border-t-4 border-indigo-900"
      >
        <Colophon />
      </section>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

export const Head = ({ data }) => (
  <>
    <html lang="en" />
    <title>${data.site.siteMetadata.title}</title>
  </>
);
