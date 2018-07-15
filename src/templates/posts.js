import React from 'react';
import {Helmet} from 'react-helmet';
import graphql from 'graphql';
import { TopNav } from '../components/top-nav';

const MetaData = ({fm}) => (
  <Helmet>
    <title>{fm.title}</title>
  </Helmet>
);

export default ({data}) => {
  const post = data.markdownRemark;
  return (
    <div>
      <MetaData fm={post.frontmatter} />
      <TopNav />
      <h1>{post.frontmatter.title}</h1>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;