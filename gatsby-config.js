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
        icon: 'src/images/grp.png',
      },
    },
    'gatsby-plugin-offline',
  ],
};
