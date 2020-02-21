// Imports
import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Hello from './hello'
import {logout} from '../store'

// Component
const Navbar = ({isLoggedIn, handleClick}) => {
  return (
    <div className="navbar-container">
      <h1 className="navbar-logo-containee">Boilermaker</h1>

      <nav className="row-links-containee">
        {isLoggedIn ? (
          <div>
            <Hello />

            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>

            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>

            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
    </div>
  )
}

// Container
const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

// Prop Types
Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
}
