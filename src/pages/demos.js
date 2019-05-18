import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const DemosPage = () => (
  <Layout>
    <SEO title="Demos" />
    <h1>Demos</h1>
    <p>They're coming</p>
    <a href="/dots_demo/">Dots</a>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default DemosPage
