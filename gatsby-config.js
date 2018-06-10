var path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Gabriel Pascua',
  },
  plugins: [
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        transpileOnly: true, // default
        compilerOptions: {
          target: 'esnext',
          experimentalDecorators: true,
          jsx: 'react',
        }, // default
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: path.join(__dirname, 'data'),
      },
    },
    'gatsby-transformer-json',
  ],
};