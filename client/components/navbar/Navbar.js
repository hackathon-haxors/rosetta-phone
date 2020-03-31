// Imports
import React, {Fragment, useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Links from '../links/Links'
import Burger from '../links/Burger'
import Preloader from './Preloader'

// Component
const Navbar = ({isLoading}) => {
  const [width, setWidth] = useState(window.innerWidth)

  const largeViewCheck = width > 1007

  const updateNavbarDimensions = () => {
    setWidth(window.innerWidth)
  }

  useEffect(
    () => {
      updateNavbarDimensions()
      window.addEventListener('resize', updateNavbarDimensions)

      return () => {
        window.removeEventListener('resize', updateNavbarDimensions)
        updateNavbarDimensions()
      }
    },
    [width]
  )

  return (
    <Fragment>
      <div className="navbar-container">
        <NavLink to="/home" className="navbar-logo-navlink">
          <h2 className="navbar-logo-containee">
            {largeViewCheck ? 'Meetup Tracker' : 'MTracker'}
          </h2>
        </NavLink>

        {largeViewCheck ? <Links /> : <Burger />}
      </div>

      <div>{isLoading ? <Preloader /> : null}</div>
    </Fragment>
  )
}

// Container
const mapStateToProps = state => ({
  isLoading: state.layout.isLoading
})

export default connect(mapStateToProps)(Navbar)

// Prop Types
Navbar.propTypes = {
  isLoading: PropTypes.bool
}
