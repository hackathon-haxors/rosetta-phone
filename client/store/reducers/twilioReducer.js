// Imports
import axios from 'axios'

import {toggledPreloaderActionCreator} from './layoutReducer'
import {toastNotificationGenerator} from '../../helpers'

// Action Types
const SENT_TEXT = 'SENT_TEXT'

// Initial State
const initialState = {}

// Action Creators
export const sentTextActionCreator = response => ({
  type: SENT_TEXT,
  response
})

// Thunk Creators
export const sendTextThunkCreator = (googleId, text) => async dispatch => {
  try {
    dispatch(toggledPreloaderActionCreator(true))

    const {data} = await axios.post(`/api/twilio/sms`, {
      googleId,
      text
    })

    console.log({data})

    dispatch(sentTextActionCreator(data))
    dispatch(toggledPreloaderActionCreator(false))

    toastNotificationGenerator('Text Sent Successfully', 'green')
  } catch (error) {
    console.error(error)
    toastNotificationGenerator('Error! Unable To Send Text', 'red')
  }
}

// Reducer
const twilioReducer = (state = initialState, action) => {
  switch (action.type) {
    case SENT_TEXT:
      return action.response

    default:
      return state
  }
}

export default twilioReducer
