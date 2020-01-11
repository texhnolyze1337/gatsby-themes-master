const { paginate } = require("gatsby-awesome-pagination")
const { slugify } = require("@arshad/gatsby-theme-core/utils")
const withDefaults = require("./theme-options")
const isRelativeUrl = require("is-relative-url")
const path = require("path")

exports.onPreBootstrap = ({ reporter }, themeOptions) => {
  const { feedUrl } = withDefaults(themeOptions)

  if (!feedUrl) {
    reporter.panic(`Required theme option "feedUrl" missing.`)
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type PodcastSocialLink implements Node @dontInfer {
      id: ID!
      name: String!
      url: String!
    }

    type Podcast implements Node @dontInfer {
      id: ID!
      name: String!
      description: String!
      image: File
      social: [PodcastSocialLink]
    }

    type PodcastEpisode implements Node @dontInfer {
      id: ID!
      guid: String!
      title: String!
      slug: String!
      date: Date! @dateformat
      duration: Int!
      subtitle: String!
      summary: String!
      url: String!
    }
  `)
}

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest, getNodesByType },
  themeOptions
) => {
  const { podcast } = withDefaults(themeOptions)
  const { createNode } = actions

  // Handle image.
  let imageNode = null
  if (podcast.image && isRelativeUrl(podcast.image)) {
    // Find the local image file.
    const fileNodes = getNodesByType(`File`)
    if (fileNodes.length) {
      imageNode = fileNodes.find(({ absolutePath }) => {
        return absolutePath == path.resolve(podcast.image)
      })
    }
  }

  // Create podcast.
  createNode({
    id: createNodeId(`Podcast-${podcast.name}`),
    ...podcast,
    image: imageNode,
    internal: {
      type: `Podcast`,
      contentDigest: createContentDigest(podcast),
    },
  })
}

exports.onCreateNode = (
  { node, actions, createNodeId, createContentDigest },
  themeOptions
) => {
  if (node.internal.type !== `FeedPodcastEpisode`) {
    return
  }

  const nodeType = `PodcastEpisode`
  const { basePath } = withDefaults(themeOptions)

  const fields = {
    id: createNodeId(`${nodeType}-${node.id}`),
    guid: node.guid,
    title: node.title,
    slug: (basePath ? `${basePath}/` : "") + slugify(node.title),
    date: new Date(node.pubDate),
    duration: parseInt(node.itunes.duration),
    subtitle: node.itunes.subtitle,
    summary: node.itunes.summary,
    url: node.enclosure.url,
  }

  // TODO: Update the contentDigest to use the mdx content.
  actions.createNode({
    ...fields,
    parent: node.id,
    internal: {
      type: nodeType,
      contentDigest: createContentDigest(node.internal.contentDigest),
    },
  })
}

exports.createPages = async ({ actions, graphql, reporter }, themeOptions) => {
  const { createPage } = actions
  const { basePath, episodesPerPage, pageTitle, pageExcerpt } = withDefaults(
    themeOptions
  )

  const result = await graphql(`
    query {
      allPodcastEpisode {
        episodes: nodes {
          id
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(`Failed to fetch episode data.`, result.errors)
  }

  const { episodes } = result.data.allPodcastEpisode

  // Create paginated episodes pages
  paginate({
    createPage,
    items: episodes,
    itemsPerPage: episodesPerPage,
    pathPrefix: ({ pageNumber }) =>
      pageNumber === 0 ? basePath : `${basePath}/page`,
    component: require.resolve(`./src/templates/episodes-query.js`),
    context: {
      total: episodes.length,
      pageTitle,
      pageExcerpt,
    },
  })

  episodes.forEach(episode => {
    createPage({
      path: episode.slug,
      component: require.resolve(`./src/templates/episode-query.js`),
      context: {
        id: episode.id,
      },
    })
  })
}
