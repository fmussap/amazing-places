import * as actions from '../types'

const INITIAL_STATE = {
  isLoading: false
}

const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.UI_START_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case actions.UI_STOP_LOADING:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}

export default uiReducer
