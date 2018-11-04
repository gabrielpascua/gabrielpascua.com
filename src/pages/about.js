import React from 'react';
import { Helmet } from 'react-helmet';
import PageTitle from '../components/page-title';

const MetaData = () => (
  <Helmet>
    <title>About</title>
  </Helmet>
);

export default ({ data }) => (
  <div className="container">
    <MetaData />
    <PageTitle text="About the Site" />
    <p>
      <strong>Site:</strong> <a href="https://www.gatsbyjs.org/">Gatsby v2</a>
    </p>
    <p>
      <strong>Codebase:</strong>{' '}
      <a href="https://github.com/gabrielpascua/gabrielpascua.github.io">
        GitHub
      </a>
    </p>
    <p>
      <strong>Hosting:</strong> <a href="https://www.netlify.com/">Netlify</a>
    </p>
    <p>
      <strong>SSL Certificate:</strong>{' '}
      <a href="https://letsencrypt.org/">Let's Encrypt</a>
    </p>
    <p>
      <strong>Domain:</strong>{' '}
      <a href="https://domains.google/#/">Google Domains</a>
    </p>
  </div>
);
