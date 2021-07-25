// Imports
import React from 'react'

// Component
const MadeBy = () => {
  return (
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
  )
}

// Exports
export default MadeBy
