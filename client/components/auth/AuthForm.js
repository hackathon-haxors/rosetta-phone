// Imports
import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {auth} from '../../store'

// Component
const AuthForm = ({name, displayName, error, authThunk}) => {
  const [passwordValidationError, setPasswordValidationError] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()

    const formName = event.target.name
    const email = event.target.email.value
    const password = event.target.password.value
    const passwordValidation = event.target.passwordValidation
      ? event.target.passwordValidation.value
      : null
    const firstName = event.target.firstName
      ? event.target.firstName.value
      : null
    const lastName = event.target.lastName ? event.target.lastName.value : null

    if (
      formName === 'login' ||
      (formName === 'signup' && password === passwordValidation)
    ) {
      setPasswordValidationError(false)
      authThunk(formName, email, password, firstName, lastName)
    } else {
      setPasswordValidationError(true)
    }
  }

  return (
    <div className="center">
      <h4>{displayName}</h4>

      <form
        className="center auth-form-container"
        name={name}
        onSubmit={handleSubmit}
      >
        <div className="form-containee">
          <label htmlFor="email">
            <span>Email</span>

            <span className="text-color-red">*</span>
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            autoComplete="email"
            required
          />
        </div>

        <div className="form-containee">
          <label htmlFor="password">
            <span>Password</span>

            <span className="text-color-red">*</span>
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            minLength="3"
            autoComplete="password"
            required
          />
        </div>

        {name === 'signup' ? (
          <Fragment>
            <div className="form-containee">
              <label htmlFor="passwordValidation">
                <span>Password Validation</span>

                <span className="text-color-red">*</span>
              </label>

              <input
                type="password"
                name="passwordValidation"
                placeholder="Re-enter Password"
                minLength="3"
                autoComplete="password-validation"
                required
              />
            </div>

            <div className="form-containee">
              <label htmlFor="firstName">
                <span>First Name</span>

                <span className="text-color-red">*</span>
              </label>

              <input
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                autoComplete="first-name"
                required
              />
            </div>

            <div className="form-containee">
              <label htmlFor="lastName">
                <span>Last Name</span>

                <span className="text-color-red">*</span>
              </label>

              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                autoComplete="last-name"
                required
              />
            </div>
          </Fragment>
        ) : null}

        <div className="form-button-containee">
          <button className="btn" type="submit">
            <span>{displayName}</span>
          </button>
        </div>

        {error &&
          error.response && (
            <div className="text-style-bold text-color-red">
              {`Error! ${error.response.data}.`}
            </div>
          )}

        {passwordValidationError && (
          <div className="text-style-bold text-color-red">
            Error! Please re-enter your password.
          </div>
        )}
      </form>

      <div className="center google-oauth">
        <a href="/auth/google">{displayName} with Google</a>
      </div>
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
const mapLoginToProps = state => ({
  name: 'login',
  displayName: 'Log In',
  error: state.user.error
})

const mapSignupToProps = state => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: state.user.error
})

const mapDispatchToProps = dispatch => ({
  authThunk(formName, email, password, firstName, lastName) {
    dispatch(auth(formName, email, password, firstName, lastName))
  }
})

export const Login = connect(mapLoginToProps, mapDispatchToProps)(AuthForm)
export const Signup = connect(mapSignupToProps, mapDispatchToProps)(AuthForm)

// Prop Types
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object,
  authThunk: PropTypes.func.isRequired
}
