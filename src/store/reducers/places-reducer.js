import * as actions from '../types'

const INITIAL_STATE = {
  places: [],
  placeAdded: false
}

const placessReducer = (state = INITIAL_STATE, action) => {
  // console.log('testando action', action)
  switch (action.type) {
    case actions.SET_PLACES:
      return {
        ...state,
        places: action.places
      }
    case actions.REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter((place) => action.key !== place.key)
      }
    case actions.PLACE_ADDED_START:
      return {
        ...state,
        placeAdded: true
      }
    case actions.PLACE_ADDED_END:
      return {
        ...state,
        placeAdded: false
      }
    default:
      return state
  }
}

export default placessReducer
