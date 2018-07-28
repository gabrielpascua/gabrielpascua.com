import React from 'react';

const TopNav = () => (
  <nav className="top-nav pure-g border-bottom">
    <div className="pure-u-1 container">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/notes">Notes</a></li>
        <li><a href="/books">Books</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </div>
  </nav>
);

export { TopNav };