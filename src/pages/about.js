import React from 'react';
import {Helmet} from 'react-helmet';
// import {TopNav} from '../components/top-nav';

const MetaData = () => (
  <Helmet>
    <title>About</title>
  </Helmet>
);

export default ({data}) => (
  <div className="container">
    <MetaData />
    {/* <TopNav /> */}
    <h1 className="title">About the Site</h1>
  </div>
);