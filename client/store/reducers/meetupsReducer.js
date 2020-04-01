// Imports
import axios from 'axios'

import {toggledPreloaderActionCreator} from './layoutReducer'
import {toastNotificationGenerator} from '../../helpers'

// Initial State
const initialState = {
  curatedMeetups: [],
  fetchedMeetups: false,
  meetupsFetchingError: null
}

// Actions Types
const GOT_CURATED_MEETUPS_SUCCESS = 'GOT_CURATED_MEETUPS_SUCCESS'
const GOT_CURATED_MEETUPS_ERROR = 'GOT_CURATED_MEETUPS_ERROR'

// Action Creators
const gotCuratedMeetupsSuccessActionCreator = curatedMeetups => ({
  type: GOT_CURATED_MEETUPS_SUCCESS,
  curatedMeetups
})

const gotCuratedMeetupsErrorActionCreator = error => ({
  type: GOT_CURATED_MEETUPS_ERROR,
  error
})

// Thunk Creators
export const getCuratedMeetupsThunkCreator = () => {
  return async dispatch => {
    try {
      dispatch(toggledPreloaderActionCreator(true))

      const nycCoders = await axios.get('/api/meetups/31377401')
      const bootcampersAnonymous = await axios.get('/api/meetups/19344391')
      const reactNyc = await axios.get('/api/meetups/22884788')
      const useReactNyc = await axios.get('/api/meetups/31543338')
      const vueNyc = await axios.get('/api/meetups/23275212')
      const graphqlNyc = await axios.get('/api/meetups/24714233')
      const mongodbNyc = await axios.get('/api/meetups/1629296')

      const curatedMeetups = [
        {
          name: 'NYC Coders',
          meetups: nycCoders.data.results
        },
        {
          name: 'Bootcampers Anonymous',
          meetups: bootcampersAnonymous.data.results
        },
        {
          name: 'React NYC',
          meetups: reactNyc.data.results
        },
        {
          name: 'useReactNYC',
          meetups: useReactNyc.data.results
        },
        {
          name: 'Vue NYC',
          meetups: vueNyc.data.results
        },
        {
          name: 'GraphQL NYC',
          meetups: graphqlNyc.data.results
        },
        {
          name: 'MongoDB NYC',
          meetups: mongodbNyc.data.results
        }
      ]

      dispatch(gotCuratedMeetupsSuccessActionCreator(curatedMeetups))
      dispatch(toggledPreloaderActionCreator(false))
    } catch (error) {
      console.error(error)
      dispatch(gotCuratedMeetupsErrorActionCreator(error))
      dispatch(toggledPreloaderActionCreator(false))
      toastNotificationGenerator('Error! Unable To Fetch Meetups', 'red')
    }
  }
}

// Reducer
const meetupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CURATED_MEETUPS_SUCCESS:
      return {
        ...state,
        curatedMeetups: action.curatedMeetups,
        fetchedMeetups: true,
        meetupsFetchingError: null
      }

    case GOT_CURATED_MEETUPS_ERROR:
      console.log('Meetups fetching error!', action.error.message)
      return {
        ...state,
        fetchedMeetups: true,
        meetupsFetchingError: action.error.message
      }

    default:
      return state
  }
}

export default meetupsReducer
