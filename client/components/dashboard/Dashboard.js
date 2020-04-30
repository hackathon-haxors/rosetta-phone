// Imports
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {AuthForm} from '../index'

// Component
const Dashboard = ({googleId, completedSignup}) => {
  return (
    <div className="component-container center">
      <div>
        <span className="text-style-bold">Your ID is: </span>

        <span>{googleId ? googleId : 'N/A'}</span>
      </div>

      <div className="description">
        Share it with your Doctor to receive updates from them.
      </div>

      {completedSignup ? '<TextForm />' : <AuthForm />}
    </div>
  )
}

// Container
const mapStateToProps = state => ({
  googleId: state.user.googleId,
  completedSignup: state.user.completedSignup
})

export default connect(mapStateToProps)(Dashboard)

// Prop Types
Dashboard.propTypes = {
  googleId: PropTypes.string,
  completedSignup: PropTypes.bool
}
