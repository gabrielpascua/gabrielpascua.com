import React from 'react';
import {Helmet} from 'react-helmet';
import graphql from 'graphql';
import PageTitle from '../components/page-title';

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
      <div className="container content">
        <PageTitle text={post.frontmatter.title} />
        <div className="markdown" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
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