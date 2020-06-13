import React from 'react';

export default class TopNav extends React.Component {
  render() {
    return (
      <nav className="sticky">
        <div className="container">
          <ul>
            <li>
              <a href="/" className="home">
                gp
              </a>
            </li>
            <li>
              <a href="/notes">Notes</a>
            </li>
            <li>
              <a href="/books">Books</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="mailto:mail@gabrielpascua.com">Email</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
