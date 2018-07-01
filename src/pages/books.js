import React from 'react';
import {Helmet} from 'react-helmet';
import {TopNav} from '../shared/top-nav';
import graphql from 'graphql';

const MetaData = () => (
  <Helmet>
    <title>Books</title>
  </Helmet>
);

export default ({data}) => {
  const books = data.allMarkdownRemark.edges;

  return (
    <div>
      <MetaData />
      <TopNav />
      <h1>Books</h1>
      <ul>
        {
          books.map((book) => {
            return (
              <li key={book.node.fields.slug}>
                <a href={book.node.fields.slug}>
                  {book.node.frontmatter.title}
                </a>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export const booksQuery = graphql `
  query BooksQuery {
    allMarkdownRemark(filter: {frontmatter: {categories: {eq: "books"}}}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;