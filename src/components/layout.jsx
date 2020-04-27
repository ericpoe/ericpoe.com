import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {graphql, StaticQuery} from 'gatsby';

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
    render={(data) => (
      <>
        <Helmet
          defaultTitle={data.site.siteMetadata.title}
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
          defer={false}
        >
          <html lang="en" />
        </Helmet>
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
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
