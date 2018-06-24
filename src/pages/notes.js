import React from 'react';
import {Helmet} from 'react-helmet';
import {TopNav} from '../shared/top-nav';

const MetaData = function(){
  return <Helmet>
    <title>Notes</title>
  </Helmet>;
};

export default ({data}) => {
  return <div>
    <MetaData />
    <TopNav />
    <h1>Notes</h1>
  </div>;
};