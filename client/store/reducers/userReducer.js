// Imports
import axios from 'axios'

import history from '../../history'
import {toggledPreloaderActionCreator} from '..'
import {toastNotificationGenerator} from '../../helpers'

// Initial State
const initialState = {}

// Action Types
const GOT_USER = 'GOT_USER'
const REMOVED_USER = 'REMOVED_USER'

// Action Creators
export const gotUserActionCreator = user => ({type: GOT_USER, user})
export const removedUserActionCreator = () => ({type: REMOVED_USER})

// Thunk Creators
export const me = () => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me')

    dispatch(gotUserActionCreator(data || initialState))
  } catch (error) {
    console.error(error)
  }
}

export const completeSignup = (
  googleId,
  role,
  language,
  phone
) => async dispatch => {
  try {
    dispatch(toggledPreloaderActionCreator(true))

    const {data} = await axios.put(`/api/users/${googleId}`, {
      role,
      language,
      phone
    })

    dispatch(gotUserActionCreator(data || initialState))
    dispatch(toggledPreloaderActionCreator(false))

    toastNotificationGenerator('Completed Signup Successfully', 'green')
  } catch (error) {
    console.error(error)
    toastNotificationGenerator('Error! Unable To Complete Signup', 'red')
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')

    dispatch(removedUserActionCreator())
    history.push('/')
  } catch (error) {
    console.error(error)
  }
}

// Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return action.user

    case REMOVED_USER:
      return initialState

    default:
      return state
  }
}

export default userReducer
