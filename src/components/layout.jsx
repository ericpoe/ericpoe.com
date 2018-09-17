import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
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
          meta={[
            {
              name: 'description',
              content: 'Thoughts, news, and blog of Eric Poe',
            },
            {
              name: 'keywords',
              content:
                'programming, learning, mentoring, CoderDojo, PHP, JavaScript',
            },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="flex flex-col flex-1 max-w-xl mx-auto px-4 py-1 md:p-4 w-full">
          {children}
        </div>
      </div>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
