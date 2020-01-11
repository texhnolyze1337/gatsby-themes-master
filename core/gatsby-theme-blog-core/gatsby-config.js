const withDefaults = require(`./theme-options`)

module.exports = themeOptions => {
  const { contentPath, basePath } = withDefaults(themeOptions)

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
          name: `post`,
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
                classPrefix: `language-`,
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
      {
        resolve: `gatsby-plugin-feed`,
        options: {
          query: `
            {
              site {
                siteMetadata {
                  title
                  description
                  siteUrl
                  site_url: siteUrl
                }
              }
            }
          `,
          feeds: [
            {
              serialize: ({ query: { site, allPost } }) => {
                return allPost.posts.map(post => {
                  const url = site.siteMetadata.siteUrl + post.slug
                  return {
                    title: post.title,
                    description: post.excerpt,
                    date: post.date,
                    url,
                    guid: url,
                  }
                })
              },
              query: `
                {
                  allPost(sort: { fields: date, order: DESC }) {
                    posts: nodes {
                      id
                      title
                      date(formatString: "MMMM DD, YYYY")
                      excerpt
                      slug
                    }
                  } 
                }
              `,
              output: `${basePath}/rss.xml`,
              title: `RSS Feed`,
            },
          ],
        },
      },
    ],
  }
}
