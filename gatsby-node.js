const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const createPaginatedPages = require('gatsby-paginate');
const sass = require('node-sass');
const fs = require('fs');

const allPostQuery = `
{
  allMarkdownRemark {
    edges {
      node {
        fields {
          slug
        },
        frontmatter{
          title,
          date,
          read
        }
      }
    }
  }
}
`;

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
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

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(allPostQuery).then(result => {
      createListPages(result, 'books', createPage);
      createListPages(result, 'notes', createPage);
      createContentPages(result, createPage);
      resolve();
    });
  });
};

exports.onPreBuild = () => {
  sass.render(
    {
      outputStyle: 'compressed',
      file: './sass/base.scss',
      includePaths: ['./node_modules'],
    },
    (err, result) => {
      fs.writeFileSync('./static/css/main.min.css', result.css);
    }
  );
};

const createListPages = function(result, category, fnCreatePage) {
  const pageLength = 10;
  createPaginatedPages({
    edges: result.data.allMarkdownRemark.edges
      .filter(edge => edge.node.fields.slug.indexOf(category) === 0)
      .sort((e1, e2) => {
        // sort descending
        let d1 = Date.parse(
          e1.node.frontmatter.read || e1.node.frontmatter.date
        );
        let d2 = Date.parse(
          e2.node.frontmatter.read || e2.node.frontmatter.date
        );

        if (d2 > d1) {
          return 1;
        }
        if (d1 > d2) {
          return -1;
        }
        if (d2 === d1) {
          return 0;
        }
      }),
    createPage: fnCreatePage,
    pageTemplate: 'src/templates/list.jsx',
    pageLength: pageLength,
    pathPrefix: `${category}/page`,
    buildPath: (index, pathPrefix) =>
      index > 1 ? `${pathPrefix}/${index}` : `/${category}`,
    context: {
      category: category,
    },
  });
};

const createContentPages = function(result, fnCreatePage) {
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    fnCreatePage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/posts.jsx'),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    });
  });
};
