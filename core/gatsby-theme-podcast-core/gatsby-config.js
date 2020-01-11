const withDefaults = require("./theme-options")

module.exports = themeOptions => {
  const { feedUrl } = withDefaults(themeOptions)

  return {
    plugins: [
      `@arshad/gatsby-theme-core`,
      {
        resolve: `@arshad/gatsby-source-podcast`,
        options: {
          url: feedUrl,
        },
      },
    ],
  }
}
