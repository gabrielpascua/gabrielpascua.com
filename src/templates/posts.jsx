import React from 'react';
import { graphql } from 'gatsby';
import PageTitle from '../components/page-title';
import Layout from '../components/layout';

const Head = ({ fm }) => (
  <>
    <title>{fm.title}</title>
  </>
);

const PostsTemplate = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <Head fm={post.frontmatter} />
      <div className="page-heading">
        <div className="container">
          <PageTitle
            text={post.frontmatter.title}
            url={post.frontmatter.book_url}
          />
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <article
            className="markdown"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
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

export default PostsTemplate;