// Imports
import React, {Fragment, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {slide as Menu} from 'react-burger-menu'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {Hello} from '../index'
import {logout} from '../../store'
import {burgerStyles} from '../../styles'

// Component
const LinksBurger = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleStateChange = state => {
    setMenuOpen(state.isOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <Menu
      styles={burgerStyles}
      isOpen={menuOpen}
      right
      width="50%"
      onStateChange={state => handleStateChange(state)}
    >
      <div className="remove-outline">
        <div>
          <Hello color="white" />
        </div>

        <div>
          <NavLink to="/" onClick={closeMenu}>
            <span className="navbar-text-color">Home</span>
          </NavLink>
        </div>

        <div>
          <a href="/auth/meetup">
            <span className="navbar-text-color">Login</span>
          </a>
        </div>

        <div>
          <a href="/auth/meetup">
            <span className="navbar-text-color">Signup</span>
          </a>
        </div>
      </div>
    </Menu>
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

export default connect(mapStateToProps, mapDispatchToProps)(LinksBurger)

// Prop Types
LinksBurger.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
}
