import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import 'purecss/build/pure-min.css';
import '../../sass/base.scss';
import '../../sass/markdown.scss';
import 'prismjs/themes/prism-tomorrow.css'; // syntax highlighting
import '../../sass/resume.scss';

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
      <>
        <Helmet>
          <html lang="en" />
        </Helmet>
        <main role="main">{children}</main>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
