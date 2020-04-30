// Imports
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {sendTextThunkCreator} from '../../store/reducers/twilioReducer'

// Initializations
const regex = /[^\w\s,.!?'"]/gi

// Component
const TextForm = ({sendTextThunk}) => {
  const handleSubmit = event => {
    event.preventDefault()

    const googleId = event.target.googleId.value
    const text = event.target.text.value.replace(regex, '')

    console.log({googleId, text})

    const check = googleId.length && text.length
    if (check) {
      sendTextThunk(googleId, text)
    }
  }

  return (
    <div className="center">
      <h4>Send Message</h4>

      <form
        className="center auth-form-container"
        name={name}
        onSubmit={handleSubmit}
      >
        <div className="form-containee">
          <label htmlFor="googleId">
            <span>Patient ID</span>

            <span className="text-color-red">*</span>
          </label>

          <input
            type="text"
            id="googleId"
            name="googleId"
            pattern="[0-9]{21}"
            required
          />
        </div>

        <div className="form-containee">
          <label htmlFor="text">
            <span>Text</span>

            <span className="text-color-red">*</span>
          </label>

          <textarea
            id="text"
            name="text"
            minLength="1"
            maxLength="4000"
            rows="5"
            cols="25"
            required
          />
        </div>

        <div className="form-button-containee">
          <button className="btn" type="submit">
            <span>Send</span>
          </button>
        </div>
      </form>
    </div>
  )
}

// Container
const mapDispatchToProps = dispatch => ({
  sendTextThunk(googleId, text) {
    dispatch(sendTextThunkCreator(googleId, text))
  }
})

export default connect(null, mapDispatchToProps)(TextForm)

// Prop Types
TextForm.propTypes = {
  sendTextThunk: PropTypes.func
}
