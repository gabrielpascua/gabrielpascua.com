import React from 'react';
import {Helmet} from 'react-helmet';
import {TopNav} from '../components/top-nav';

const MetaData = () => (
  <Helmet>
    <title>About</title>
  </Helmet>
);

export default ({data}) => (
  <div>
    <MetaData />
    <TopNav />
    <h1>About the Site</h1>
  </div>
);