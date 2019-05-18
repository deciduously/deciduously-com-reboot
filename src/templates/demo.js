import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  const demo = data.allFile
  const name = demo.edges[0].node.relativeDirectory
  return (
    <Layout>
      <SEO title={name} />
      <div>
        <h1>{name}</h1>
        <iframe title={name} src={`../${name}`} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    allFile(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          relativeDirectory
          extension
        }
      }
    }
  }
`
