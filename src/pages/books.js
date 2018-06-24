import React from 'react';
import {Helmet} from 'react-helmet';
import {TopNav} from '../shared/top-nav';

const MetaData = function(){
  return <Helmet>
    <title>Books</title>
  </Helmet>;
};

export default ({data}) => {
  return <div>
    <MetaData />
    <TopNav />
    <h1>Books</h1>
  </div>;
};