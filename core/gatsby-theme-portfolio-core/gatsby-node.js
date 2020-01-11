const { slugify } = require("@arshad/gatsby-theme-core/utils")
const fs = require("fs")
const withDefaults = require(`./theme-options`)

exports.onPreBootstrap = ({ reporter }, themeOptions) => {
  const { contentPath } = withDefaults(themeOptions)

  // Check if content directory exists.
  if (!fs.existsSync(contentPath)) {
    reporter.warn(`The ${contentPath} directory is missing. Creating it now...`)
    fs.mkdirSync(contentPath, { recursive: true })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type Project implements Node @dontInfer {
      id: ID!
      title: String!
      excerpt(pruneLength: Int = 150): String
      slug: String!
      body: String!
      url: String!
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
    Project: {
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
  if (node.internal.type !== "Mdx") {
    return
  }

  const parent = getNode(node.parent)
  if (parent.sourceInstanceName !== `project`) {
    return
  }

  const { basePath } = withDefaults(themeOptions)
  const nodeType = `Project`

  // Create Post nodes from Mdx nodes.
  if (nodeType) {
    actions.createNode({
      id: createNodeId(`${nodeType}-${node.id}`),
      title: node.frontmatter.title,
      excerpt: node.frontmatter.excerpt,
      slug: `${basePath}/${node.frontmatter.slug ||
        slugify(parent.relativeDirectory)}`,
      image: node.frontmatter.image,
      url: node.frontmatter.url,
      parent: node.id,
      internal: {
        type: nodeType,
        contentDigest: createContentDigest(node.internal.contentDigest),
      },
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }, themeOptions) => {
  const result = await graphql(`
    query {
      allProject(sort: { fields: title, order: DESC }) {
        projects: nodes {
          id
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(`There was an error fetching projects.`, result.errors)
  }

  const { projects } = result.data.allProject

  // Create project pages.
  projects.forEach(project => {
    actions.createPage({
      path: project.slug,
      component: require.resolve(`./src/templates/project-query.js`),
      context: {
        id: project.id,
      },
    })
  })

  // Create projects page.
  const { pageTitle, pageExcerpt, basePath } = withDefaults(themeOptions)
  actions.createPage({
    path: basePath,
    component: require.resolve(`./src/templates/projects-query.js`),
    context: {
      pageTitle,
      pageExcerpt,
    },
  })
}
