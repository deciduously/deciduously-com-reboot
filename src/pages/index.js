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
      <div>
        <pre>
          <code>
            -----BEGIN PGP PUBLIC KEY BLOCK-----
            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
            1eHLv3jE+Q4= =uxi1 -----END PGP PUBLIC KEY BLOCK-----
          </code>
        </pre>
      </div>
    </Layout>
  )
}
