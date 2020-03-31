// Imports
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// Component
const Home = ({firstName}) => {
  return (
    <div className="center">
      <h4>{`Welcome to Meetup Tracker, ${firstName}.`}</h4>
    </div>
  )
}

// Container
const mapStateToProps = state => ({
  firstName: state.user.firstName
})

export default connect(mapStateToProps)(Home)

// Prop Types
Home.propTypes = {
  firstName: PropTypes.string
}
