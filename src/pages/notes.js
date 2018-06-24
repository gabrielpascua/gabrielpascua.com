import React from 'react';
import {Helmet} from 'react-helmet';
import {TopNav} from '../shared/top-nav';
import graphql from 'graphql';

const MetaData = () => (
  <Helmet>
    <title>Notes</title>
  </Helmet>
);

export default ({data}) => {
  const notes = data.allMarkdownRemark.edges;
  return (
    <div>
      <MetaData />
      <TopNav />
      <h1>Notes</h1>
      <ul>
        {
          notes.map((note) => {
            return (
              <li>
                <a href={note.node.fields.slug}>
                  {note.node.frontmatter.title}
                </a>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export const notesQuery = graphql`
  query NotesQuery {
    allMarkdownRemark(filter: {frontmatter: {categories: {eq: "notes"}}}) {
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