const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const createPaginatedPages = require('gatsby-paginate');

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
              },
              frontmatter{
                title,
                date
              }
            }
          }
        }
      }
    `)
      .then(result => {
        const pageLength = 10;

        createPaginatedPages({
          edges: result.data.allMarkdownRemark.edges
            .filter((edge) => edge.node.fields.slug.indexOf('books') === 0)
            .sort((e1, e2) => {
              let d1 = Date.parse(e1.node.frontmatter.date);
              let d2 = Date.parse(e2.node.frontmatter.date);

              if(d2 > d1) { return 1; }
              if(d2 > d1) { return -1; }
              if(d2 === d1) { return 0; }
            }),
          createPage: createPage,
          pageTemplate: 'src/templates/list.js',
          pageLength: pageLength,
          pathPrefix: 'books/page',
          buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}/${index}` : '/books'
        });

        createPaginatedPages({
          edges: result.data.allMarkdownRemark.edges
            .filter((edge) => edge.node.fields.slug.indexOf('notes') === 0)
            .sort((e1, e2) => {
              let d1 = Date.parse(e1.node.frontmatter.date);
              let d2 = Date.parse(e2.node.frontmatter.date);

              if(d2 > d1) { return 1; }
              if(d2 > d1) { return -1; }
              if(d2 === d1) { return 0; }
            }),
          createPage: createPage,
          pageTemplate: 'src/templates/list.js',
          pageLength: pageLength,
          pathPrefix: 'notes/page',
          buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}/${index}` : '/notes'
        });

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