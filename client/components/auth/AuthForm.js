// Imports
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {completeSignup} from '../../store'

// Component
const AuthForm = ({googleId, completeSignupThunk}) => {
  const handleSubmit = event => {
    event.preventDefault()

    const role = event.target.role.value
    const language = event.target.language.value
    const phone = event.target.phone.value

    const check = role.length && language.length && phone.length
    if (check) {
      completeSignupThunk(googleId, role, language, phone)
    }
  }

  return (
    <div className="center">
      <h4>Additional Information</h4>

      <form
        className="center auth-form-container"
        name={name}
        onSubmit={handleSubmit}
      >
        <div className="form-containee">
          <label htmlFor="role">
            <span>Role</span>

            <span className="text-color-red">*</span>
          </label>

          <select className="browser-default" id="role" required>
            <option value="">Please choose</option>
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>

        <div className="form-containee">
          <label htmlFor="language">
            <span>Language</span>

            <span className="text-color-red">*</span>
          </label>

          <select className="browser-default" id="language" required>
            <option value="">Please choose</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
        </div>

        <div className="form-containee">
          <label htmlFor="phone">
            <span>Phone</span>

            <span className="text-color-red">*</span>
          </label>

          <input
            type="tel"
            id="phone"
            name="phone"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
          />
        </div>

        <div className="form-button-containee">
          <button className="btn" type="submit">
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  )
}

// Container
const mapStateToProps = state => ({
  googleId: state.user.googleId
})

const mapDispatchToProps = dispatch => ({
  completeSignupThunk(googleId, role, language, phone) {
    dispatch(completeSignup(googleId, role, language, phone))
  }
})

// Prop Types
AuthForm.propTypes = {
  googleId: PropTypes.string,
  completeSignupThunk: PropTypes.func
}

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)
