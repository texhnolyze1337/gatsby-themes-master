const { paginate } = require("gatsby-awesome-pagination")
const { slugify } = require("@arshad/gatsby-theme-core/utils")
const fs = require("fs")
const withDefaults = require(`./theme-options`)

exports.onPreBootstrap = ({ reporter }, themeOptions) => {
  const { contentPath } = withDefaults(themeOptions)

  // Check if photos directory exists.
  if (!fs.existsSync(contentPath)) {
    reporter.warn(`The ${contentPath} directory is missing. Creating it now...`)
    fs.mkdirSync(contentPath, { recursive: true })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type Photo implements Node @dontInfer {
      id: ID!
      title: String!
      date: Date! @dateformat
      excerpt(pruneLength: Int = 150): String
      slug: String!
      body: String!
      image: File @fileByRelativePath
    }
  `)
}

// Helper to resolve mdx fields.
const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`)
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  })
  const resolver = type.getFields()[fieldName].resolve
  return await resolver(mdxNode, args, context, {
    fieldName,
  })
}

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    Photo: {
      body: {
        resolve: mdxResolverPassthrough(`body`),
      },
    },
  })
}

exports.onCreateNode = async (
  { node, actions, getNode, createNodeId, createContentDigest },
  themeOptions
) => {
  if (node.internal.type !== `Mdx`) {
    return
  }

  const parent = getNode(node.parent)
  if (parent.sourceInstanceName !== `photo`) {
    return
  }

  const { basePath } = withDefaults(themeOptions)
  const nodeType = `Photo`

  // Create Photo nodes from Mdx nodes.
  if (nodeType) {
    actions.createNode({
      id: createNodeId(`${nodeType}-${node.id}`),
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      excerpt: node.frontmatter.excerpt,
      slug: `${basePath}/${node.frontmatter.slug ||
        slugify(parent.relativeDirectory)}`,
      image: node.frontmatter.image,
      parent: node.id,
      internal: {
        type: nodeType,
        contentDigest: createContentDigest(node.internal.contentDigest),
      },
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }, themeOptions) => {
  const { createPage } = actions
  const { basePath, photosPerPage, pageTitle, pageExcerpt } = withDefaults(
    themeOptions
  )

  const result = await graphql(`
    query {
      allPhoto(sort: { fields: date, order: DESC }) {
        photos: nodes {
          id
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(`There was an error fetching photos.`, result.errors)
  }

  const { photos } = result.data.allPhoto

  // Create paginated photo pages
  paginate({
    createPage,
    items: photos,
    itemsPerPage: photosPerPage,
    pathPrefix: ({ pageNumber }) =>
      pageNumber === 0 ? basePath : `${basePath}/page`,
    component: require.resolve(`./src/templates/photos-query.js`),
    context: {
      total: photos.length,
      pageTitle,
      pageExcerpt,
    },
  })

  // Create photo pages.
  photos.forEach(node => {
    actions.createPage({
      path: node.slug,
      component: require.resolve(`./src/templates/photo-query.js`),
      context: {
        id: node.id,
      },
    })
  })
}
