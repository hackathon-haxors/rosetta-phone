// Imports
import {combineReducers} from 'redux'

import userReducer from './reducers/userReducer'
import twilioReducer from './reducers/twilioReducer'
import layoutReducer from './reducers/layoutReducer'

// Initializations
const rootReducer = combineReducers({
  user: userReducer,
  twilio: twilioReducer,
  layout: layoutReducer
})

// Exports
export default rootReducer
