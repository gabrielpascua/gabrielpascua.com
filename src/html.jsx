/**
 * Customized to implement sticky footer
 * https://css-tricks.com/couple-takes-sticky-footer/
 *
 * https://www.gatsbyjs.org/docs/custom-html/
 * cp .cache/default-html.js src/html.j
 */

import React from 'react';
import PropTypes from 'prop-types';
import FooterNav from './components/footer';
import TopNav from './components/top-nav';

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400&display=swap"
            rel="stylesheet"
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-82046772-1"
          />
          <script src="/js/gtag.js" />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <TopNav />
          <div
            key={'body'}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
          <FooterNav />
        </body>
      </html>
    );
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
