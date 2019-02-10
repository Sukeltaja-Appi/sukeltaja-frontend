import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { eventReducer, ongoingEventReducer } from './reducers/eventReducer'
import userReducer from './reducers/userReducer'
import { targetReducer } from './reducers/targetReducer'

const reducer = combineReducers({
  ongoingEvent: ongoingEventReducer,
  events: eventReducer,
  user: userReducer,
  targets: targetReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
