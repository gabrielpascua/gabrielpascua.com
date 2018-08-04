import React from 'react';
import 'purecss/build/pure-min.css';
import '../../sass/base.scss';
import '../../sass/markdown.scss';
import 'prismjs/themes/prism-tomorrow.css'; // syntax highlighting
import '../../sass/resume.scss';

export default ({ children }) => (
  <main role="main">
    {children()}
  </main>
);