// Imports
import React, {Fragment} from 'react'

// Component
const Home = () => {
  return (
    <Fragment>
      <div className="center">PLACEHOLDER</div>

      <div className="center">
        {'Made with ❤ by '}

        <a
          className="author-link"
          href="https://www.linkedin.com/in/rae-hochwald/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-style-bold text-color-blue">Rae Hochwald</span>
        </a>

        {' and '}

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
