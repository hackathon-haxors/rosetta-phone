// Imports
import React, {useEffect} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {Home, PageNotFound} from './components'
import {me} from './store'

// Component
const Routes = ({loadInitialData, isLoggedIn}) => {
  useEffect(
    () => {
      loadInitialData()
    },
    [loadInitialData]
  )

  return (
    <Switch>
      {/* Routes placed here are available to all visitors */}
      <Route exact path="/" component={Home} />
      {isLoggedIn && (
        <Switch>
          {/* Routes placed here are only available after logging in */}
          <Route path="/:wildcard" component={PageNotFound} />
        </Switch>
      )}
      {/* Displays our Home component as a fallback */}
      <Route component={Home} />
    </Switch>
  )
}

// Container
const mapStateToProps = state => ({
  // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
  // Otherwise, state.user will be an empty object, and state.user.id will be falsey
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  loadInitialData() {
    dispatch(me())
  }
})

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes))

// Prop Types
Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loadInitialData: PropTypes.func.isRequired
}
