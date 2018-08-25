import React from 'react';

export default class FooterNav extends React.Component {

  render(){
    return (
      <footer className="footer">
        <div className="container">
          <p>
            &copy; 2018
          </p>
          <p>
            <a href="/">Home</a> &nbsp;
            <a href="/notes">Notes</a> &nbsp;
            <a href="/books">Books</a> &nbsp;
            <a href="/about">About</a> &nbsp;
            <a href="mailto:mail@gabrielpascua.com">Email</a> &nbsp;
          </p>
        </div>
      </footer>
    );
  }

}