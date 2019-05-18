/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type == `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  } else if (
    node.sourceInstanceName == `demos` &&
    node.internal.mediaType == `text/html`
  ) {
    // make the demos links
    pathParts = node.dir.split("/")
    demoName = pathParts[pathParts.length - 1]
    const slug = `/${demoName}_demo/`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `
      {
        posts: allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
        demos: allFile(filter: { sourceInstanceName: { eq: "demos" } }) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
  ).then(result => {
    result.data.posts.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      })
    })
    result.data.demos.edges.forEach(({ node }) => {
      if (node.fields != null) {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/demo.js`),
          context: {
            slug: node.fields.slug,
          },
        })
      }
    })
  })
}
