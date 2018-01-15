import * as actions from '../types'

const INITIAL_STATE = {
  token: null,
  expiryDate: null
}

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token,
        expiryDate: action.expiryDate
      }
    case actions.AUTH_REMOVE_TOKEN:
      return {
        ...state,
        token: null,
        expiryDate: null
      }
    default:
      return state
  }
}

export default authReducer
