import React from 'react';
import 'purecss/build/pure-min.css';

export default ({ children }) => (
  <div className="pure-g">
    <div className="pure-u-1">
      {children()}
    </div>
  </div>
);