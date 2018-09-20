import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import Colophon from './colophon';
import './index.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div className="flex flex-col font-sans min-h-screen text-grey-darkest">
        <Helmet
          defaultTitle={data.site.siteMetadata.title}
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="flex flex-col flex-1 max-w-xl mx-auto px-4 py-1 md:p-4 w-full">
          {children}
        </div>
        <div className="flex w-full xs:my-6 sm:my-6 xs:py2 sm:py-2 xs:border-t-4 sm:border-t-4 sm:border-purple-darkest">
          <Colophon />
        </div>
      </div>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
