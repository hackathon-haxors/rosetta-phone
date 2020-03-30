// Imports
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// Component
const Home = ({firstName}) => {
  return (
    <div className="center">
      <h4>{`Welcome to Boilermaker, ${firstName}.`}</h4>

      <div className="home-message">PLACEHOLDER</div>
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
