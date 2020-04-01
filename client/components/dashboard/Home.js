// Imports
import React, {Fragment} from 'react'

import {Groups} from '../index'

// Component
const Home = () => {
  return (
    <Fragment>
      <Groups />

      <div className="center">
        {'Made with ❤ by '}
        <a
          className="author-link"
          href="https://www.linkedin.com/in/talluigi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-style-bold text-color-blue">Tal Luigi</span>
        </a>
      </div>
    </Fragment>
  )
}

export default Home
