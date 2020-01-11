const withDefaults = require(`./theme-options`)

module.exports = themeOptions => {
  const { imagesPath } = withDefaults(themeOptions)

  return {
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `image`,
          path: imagesPath,
        },
      },
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
    ],
  }
}
