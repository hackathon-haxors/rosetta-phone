// Imports
import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Hello from './Hello'
import {logout} from '../store'

// Component
const Links = ({isLoggedIn, handleClick}) => {
  return (
    <div>
      <nav className="links-nav">
        {isLoggedIn ? (
          <div className="links-nav-container">
            <Hello className="links-nav-containee" color="gray" />

            {/* The navbar will show these links after you log in */}
            <Link className="links-nav-containee" to="/home">
              Home
            </Link>

            <a
              className="links-nav-containee"
              href="https://github.com/LuigiLegion/boilermaker"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>

            <a className="links-nav-containee" href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div className="links-nav-container">
            {/* The navbar will show these links before you log in */}
            <Hello className="links-nav-containee" color="gray" />

            <a
              className="links-nav-containee"
              href="https://github.com/LuigiLegion/boilermaker"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>

            <Link className="links-nav-containee" to="/login">
              Login
            </Link>

            <Link className="links-nav-containee" to="/signup">
              Signup
            </Link>
          </div>
        )}
      </nav>
    </div>
  )
}

// Container
const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  handleClick() {
    dispatch(logout())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Links)

// Prop Types
Links.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
}
