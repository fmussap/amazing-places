import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import places from './reducers/places-reducer'
import ui from './reducers/ui-reducer'
import auth from './reducers/auth-reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
  const store = createStore(
    combineReducers({
      auth,
      places,
      ui
    }),
    composeEnhancers(applyMiddleware(thunk))
  )

  return store
}
