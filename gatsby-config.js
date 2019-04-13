const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Gabriel Pascua',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gabrielpascua.com',
        short_name: 'gabrielp',
        start_url: '/',
        background_color: '#ed143d',
        theme_color: '#ed143d',
        icon: 'static/img/grp.png',
      },
    },
    {
      // for serving json files
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: path.join(__dirname, 'data'),
      },
    },
    {
      // for markdown file transformations
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: path.join(__dirname, './src/posts'),
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            // for code highlighting
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
            },
          },
        ],
      },
    },
  ],
};
