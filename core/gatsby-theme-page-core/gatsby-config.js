const withDefaults = require(`./theme-options`)

module.exports = themeOptions => {
  const { contentPath } = withDefaults(themeOptions)
  return {
    plugins: [
      `@arshad/gatsby-theme-core`,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      `gatsby-transformer-remark`,
      `gatsby-image`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `page`,
          path: contentPath,
        },
      },
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-prismjs`,
              options: {
                classPrefix: "language-",
                inlineCodeMarker: null,
                aliases: {},
              },
            },
            {
              resolve: `gatsby-remark-images`,
              options: {
                linkImagesToOriginal: false,
                quality: 100,
                withWebp: true,
              },
            },
          ],
          plugins: [`gatsby-remark-images`],
        },
      },
    ],
  }
}
