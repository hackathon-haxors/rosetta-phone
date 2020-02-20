// Imports
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {auth} from '../store'

// Component
const AuthForm = ({name, displayName, error, handleSubmit}) => {
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>

          <input name="email" type="text" />
        </div>

        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>

          <input name="password" type="password" />
        </div>

        <div>
          <button type="submit">{displayName}</button>
        </div>

        {error && error.response && <div> {error.response.data} </div>}
      </form>

      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

// Container
/**
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 **/
const mapLoginToProps = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignupToProps = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(event) {
      event.preventDefault()
      const formName = event.target.name
      const email = event.target.email.value
      const password = event.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLoginToProps, mapDispatchToProps)(AuthForm)
export const Signup = connect(mapSignupToProps, mapDispatchToProps)(AuthForm)

// Prop Types
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired
}
