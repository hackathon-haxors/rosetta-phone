// Imports
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {AuthForm, TextForm} from '../index'

// Component
const Dashboard = ({googleId, role, completedSignup}) => {
  return (
    <div className="component-container center">
      <div>
        <span className="text-style-bold">Your Patient ID is: </span>

        <span>{googleId ? googleId : 'N/A'}</span>
      </div>

      <div className="description">
        <div>Share it with your Doctor to receive updates from them.</div>

        <div>Do not share it with anyone else!</div>
      </div>

      {!completedSignup ? (
        <AuthForm />
      ) : role === 'Doctor' ? (
        <TextForm />
      ) : null}
    </div>
  )
}

// Container
const mapStateToProps = state => ({
  googleId: state.user.googleId,
  role: state.user.role,
  completedSignup: state.user.completedSignup
})

// Prop Types
Dashboard.propTypes = {
  googleId: PropTypes.string,
  role: PropTypes.string,
  completedSignup: PropTypes.bool
}

// Exports
export default connect(mapStateToProps)(Dashboard)
