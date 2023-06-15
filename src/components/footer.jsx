import React from 'react';

export default class FooterNav extends React.Component {
  render() {
    const year = new Date().getFullYear();
    return (
      <footer className="footer">
        <div className="container">
          <p>
            <small>&copy; {year} Gabriel Pascua</small>
          </p>
        </div>
      </footer>
    );
  }
}
