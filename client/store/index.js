// Imports
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'

import rootReducer from './rootReducer'

// Initializations
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(rootReducer, middleware)

// Exports
export default store
export * from './reducers/layoutReducer'
export * from './reducers/twilioReducer'
export * from './reducers/userReducer'
