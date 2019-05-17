import { css } from "@emotion/core"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { rhythm } from "../utils/typography.js"

const Header = ({ siteTitle }) => (
  <header
    css={css`
      margin: 0 auto;
      max-width: 700px;
      padding-top: ${rhythm(1.5)};
    `}
  >
    <Link to="/">
      <h3
        css={css`
          margin-bottom: ${rhythm(2)};
          padding: 30px;
          display: inline-block;
          font-style: normal;
        `}
      >
        {siteTitle}
      </h3>
    </Link>
    <Link to="/posts/">
      <h3
        css={css`
          margin-bottom: ${rhythm(2)};
          display: inline-block;
          padding: 30px;
          font-style: normal;
        `}
      >
        Posts
      </h3>
    </Link>
    <Link to="/demos/">
      <h3
        css={css`
          margin-bottom: ${rhythm(2)};
          display: inline-block;
          padding: 30px;
          font-style: normal;
        `}
      >
        Demos
      </h3>
    </Link>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
