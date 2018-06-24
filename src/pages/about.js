import React from 'react';
import {Helmet} from 'react-helmet';
import {TopNav} from '../shared/top-nav';

const MetaData = function(){
  return <Helmet>
    <title>About</title>
  </Helmet>;
};

export default ({data}) => {
  return <div>
    <MetaData />
    <TopNav />
    <h1>About</h1>
  </div>;
};