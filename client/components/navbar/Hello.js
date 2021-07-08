// Imports
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// Component
export const Hello = ({firstName, color, onClick}) => {
  return (
    <span className={`navbar-user-name text-color-${color}`} onClick={onClick}>
      Hello, {firstName || 'guest'}.
    </span>
  )
}

// Container
const mapStateToProps = state => ({
  firstName: state.user.firstName
})

// Prop Types
Hello.propTypes = {
  firstName: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
}

// Exports
export default connect(mapStateToProps)(Hello)
