// Imports
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'

import userReducer from './reducers/userReducer'
import layoutReducer from './reducers/layoutReducer'
import meetupsReducer from './reducers/meetupsReducer'

// Initializations
const reducer = combineReducers({
  user: userReducer,
  meetups: meetupsReducer,
  layout: layoutReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

// Exports
export default store
export * from './reducers/userReducer'
