// Imports
import {createMemoryHistory, createBrowserHistory} from 'history'

// Initializations
const history =
  process.env.NODE_ENV === 'test'
    ? createMemoryHistory()
    : createBrowserHistory()

// Exports
export default history
