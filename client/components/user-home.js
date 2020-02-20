import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// Component
export const UserHome = ({email}) => {
  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

// Container
const mapStateToProps = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapStateToProps)(UserHome)

// Prop Types
UserHome.propTypes = {
  email: PropTypes.string
}
