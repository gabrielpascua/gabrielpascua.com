import React from 'react';
import 'purecss/build/pure-min.css';
import '../../sass/base.scss';
import '../../sass/markdown.scss';
import 'prismjs/themes/prism-coy.css'; // syntax highlighting

export default ({ children }) => (
  <div className="container">
    {children()}
  </div>
);