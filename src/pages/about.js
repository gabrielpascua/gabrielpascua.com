import React from 'react';
import {Helmet} from 'react-helmet';
import PageTitle from '../components/page-title';

const MetaData = () => (
  <Helmet>
    <title>About</title>
  </Helmet>
);

export default ({data}) => (
  <div className="container">
    <MetaData />
    <PageTitle text="About the Site" />
  </div>
);