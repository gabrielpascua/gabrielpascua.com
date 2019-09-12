import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import PageTitle from '../components/page-title';
import Layout from '../components/layout';

const MetaData = ({ fm }) => (
  <Helmet>
    <title>{fm.title}</title>
  </Helmet>
);

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <MetaData fm={post.frontmatter} />
      <div className="container content">
        <PageTitle text={post.frontmatter.title} url={post.frontmatter.book_url} />
        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        layout
        excerpt
        book_url
      }
    }
  }
`;
