const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === 'MarkdownRemark') {
    const path = createFilePath({ node, getNode, basePath: 'pages' });
    const pathRegEx = /^\/(.+)\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/;
    const pathParts = path.match(pathRegEx);
    const pathSegments = [pathParts[1]]
      .concat(pathParts[2].split('-'))
      .concat([pathParts[3]]);
    const slug = pathSegments.join('/');
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `)
      .then(result => {
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: path.resolve('./src/templates/posts.js'),
            context: {
              // Data passed to context is available in page queries as GraphQL variables.
              slug: node.fields.slug,
            },
          });
        });
        resolve();
      });
  });
};