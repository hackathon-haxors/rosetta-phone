// Imports
import React from 'react'

// Component
const Home = () => {
  return (
    <div className="component-container center">
      <div>Welcome to Rosetta Phone!</div>

      <div className="description">DESCRIPTION</div>

      <div className="made-by">
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
          href="https://www.linkedin.com/in/tal-luigi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-style-bold text-color-blue">Tal Luigi</span>
        </a>
      </div>
    </div>
  )
}

// Exports
export default Home
