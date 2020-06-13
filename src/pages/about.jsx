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
    <PageTitle text="About the Site" />
    <p>
      <strong>Site:</strong> <a href="https://www.gatsbyjs.org/">Gatsby</a>
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
  </Layout>
);
