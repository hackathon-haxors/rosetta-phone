// Imports
import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {Hello} from '../index'
import {logout} from '../../store'

// Component
const Links = ({isLoggedIn, handleClick}) => {
  return (
    <div>
      <nav className="links-nav">
        {isLoggedIn ? (
          <div className="links-nav-container">
            <Hello className="links-nav-containee" color="gray" />

            {/* The navbar will show these links after you log in */}
            <NavLink to="/" className="links-nav-containee">
              Home
            </NavLink>

            <a
              className="links-nav-containee"
              href="https://github.com/LuigiLegion/meetup-tracker"
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

            <NavLink to="/" className="links-nav-containee">
              Home
            </NavLink>

            <a
              className="links-nav-containee"
              href="https://github.com/LuigiLegion/meetup-tracker"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>

            <NavLink to="/login" className="links-nav-containee">
              Login
            </NavLink>

            <NavLink to="/signup" className="links-nav-containee">
              Signup
            </NavLink>
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
