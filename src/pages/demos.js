import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const DemosPage = () => (
  <Layout>
    <SEO title="Demos" />
    <h1>Demos</h1>
    <p>They're coming</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default DemosPage
