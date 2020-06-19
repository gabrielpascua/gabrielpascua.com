import React from 'react';
import { Helmet } from 'react-helmet';
import PageTitle from '../components/page-title';
import Layout from '../components/layout';

const MetaData = () => (
  <Helmet>
    <title>About</title>
  </Helmet>
);

export default ({ data }) => (
  <Layout>
    <MetaData />
    <div className="page-heading">
      <div className="container">
        <PageTitle text="Site Credits" />
      </div>
    </div>
    <div className="page-content">
      <div className="container">
        <ul className="inline-block two-column list-type-none mt-3">
          <li>
            <small className="muted">Site</small>
            <a href="https://www.gatsbyjs.org/" className="muted">
              GatsbyJS
            </a>
          </li>
          <li>
            <small className="muted">Codebase</small>
            <a
              href="https://github.com/gabrielpascua/gabrielpascua.github.io"
              className="muted"
              target="_blank"
            >
              GitHub
            </a>
          </li>
          <li>
            <small className="muted">Hosting</small>
            <a
              href="https://www.netlify.com/"
              className="muted"
              target="_blank"
            >
              Netlify
            </a>
          </li>
          <li>
            <small className="muted">SSL</small>
            <a
              href="https://letsencrypt.org/"
              className="muted"
              target="_blank"
            >
              Let's Encrypt
            </a>
          </li>
          <li>
            <small className="muted">Domain</small>
            <a
              href="https://domains.google/#/"
              className="muted"
              target="_blank"
            >
              Google Domains
            </a>
          </li>
          <li>
            <small className="muted">Font</small>
            <a
              href="http://mozilla.github.io/Fira/"
              className="muted"
              target="_blank"
            >
              Fira Sans
            </a>
          </li>
        </ul>
      </div>
    </div>
  </Layout>
);
