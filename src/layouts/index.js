import React from 'react';
import 'purecss/build/pure-min.css';
import '../../sass/base.scss';

export default ({ children }) => (
  <div className="container">
    {children()}
  </div>
);