import React from 'react';

export default class TopNav extends React.Component {
  render() {
    return (
      <nav className="sticky">
        <div className="container">
          <ul>
            <li>
              <a href="/" className="home">
                <div className="text-flip-container">
                  <span style={{ '--i': 1}}>g</span>
                  <span style={{ '--i': 2}}>a</span>
                  <span style={{ '--i': 3}}>b</span>
                  <span style={{ '--i': 4}}>r</span>
                  <span style={{ '--i': 5}}>i</span>
                  <span style={{ '--i': 6}}>e</span>
                  <span style={{ '--i': 7}}>l</span>
                  <span style={{ '--i': 8}}>p</span>
                </div>
              </a>
            </li>
            <li>
              <a href="/notes">Notes</a>
            </li>
            <li>
              <a href="/clips">Clips</a>
            </li>
            <li>
              <a href="/about">Credits</a>
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
