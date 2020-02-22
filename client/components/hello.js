// Imports
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// Component
export const Hello = ({email}) => {
  const name = email.slice(0, email.indexOf('@'))

  return <span className="navbar-user-name">Hello, {name}.</span>
}

// Container
const mapStateToProps = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapStateToProps)(Hello)

// Prop Types
Hello.propTypes = {
  email: PropTypes.string
}
