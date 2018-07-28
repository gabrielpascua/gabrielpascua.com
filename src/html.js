/**
 * Customized to implement sticky footer
 * https://css-tricks.com/couple-takes-sticky-footer/
 *
 * https://www.gatsbyjs.org/docs/custom-html/
 * cp .cache/default-html.js src/html.j
 */

import React from 'react';

let stylesStr;
if (process.env.NODE_ENV === 'production') {
  try {
    stylesStr = require('!raw-loader!../public/styles.css');
  } catch (e) {
    console.log(e); //eslint-disable-line
  }
}

module.exports = class HTML extends React.Component {
  render() {
    let css;
    if (process.env.NODE_ENV === 'production') {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      );
    }
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {this.props.headComponents}
          {css}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={'body'}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
          <footer className="footer">
            <div className="container pure-g">
              <div className="pure-u-1-2 text-left">
                2018
              </div>
              <div className="pure-u-1-2">
                <ul>
                  <li className="text-right"><a href="/notes">Notes</a></li>
                  <li className="text-right"><a href="/books">Books</a></li>
                  <li className="text-right"><a href="/about">About</a></li>
                </ul>
              </div>
            </div>
          </footer>
        </body>
      </html>
    );
  }
};
