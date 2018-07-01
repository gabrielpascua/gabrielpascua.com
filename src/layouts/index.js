import React from 'react';
import 'purecss/build/pure-min.css';
import '../../sass/base.scss';
import '../../sass/markdown.scss';

export default ({ children }) => (
  <div className="container">
    {children()}
  </div>
);