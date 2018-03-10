import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  locationUpdateRequested: ['coord'],
  locationUpdateFulfilled: []
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  location: null,
  requestion: false
})

/* ------------- Reducers ------------- */
export const locationUpdateRequested = (state, { coord }) => {
  console.log('location requested')
  return state.merge({ coord, requesting: true })
}

export const locationUpdateFulfilled = (state, { coord }) => {
  console.log('location fulfilled')
  return state.merge({ requesting: false })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOCATION_UPDATE_REQUESTED]: locationUpdateRequested,
  [Types.LOCATION_UPDATE_FULFILLED]: locationUpdateRequested
})
