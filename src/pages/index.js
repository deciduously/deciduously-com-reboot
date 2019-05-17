import { css } from "@emotion/core"
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  return (
    <Layout>
      <SEO
        title="Home"
        keywords={[`gatsby`, `application`, `react`, "deciduously", "blog"]}
      />
      <h2
        css={css`
          display: inline-block;
          border-bottom: 1px dotted;
        `}
      >
        Ben Lovy
      </h2>
      <h4>The Various Places I Am</h4>
      <table
        css={css`
          display: inline-block;
        `}
      >
        <tbody>
          <tr>
            <td>GitHub</td>
            <td>
              <a href="https://github.com/deciduously">deciduously</a>
            </td>
          </tr>
          <tr>
            <td>Dev.to</td>
            <td>
              <a
                css={css`
                  text-decoration: none;
                `}
                href="https://dev.to/deciduously"
              >
                <img
                  src="https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg"
                  alt="Ben Lovy's DEV Profile"
                  height="30"
                  width="30"
                />
              </a>
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              <a href="mailto:ben@deciduously.com">ben@deciduously.com</a>
            </td>
          </tr>
          <tr>
            <td>Discord</td>
            <td>deciduously#8939</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>867-5309</td>
          </tr>
        </tbody>
      </table>
      <div />
    </Layout>
  )
}
