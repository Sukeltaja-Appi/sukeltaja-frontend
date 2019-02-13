import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { diveReducer, ongoingDiveReducer } from './reducers/diveReducer'
import { eventReducer, ongoingEventReducer } from './reducers/eventReducer'
import { targetReducer } from './reducers/targetReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  dives: diveReducer,
  events: eventReducer,
  ongoingDive: ongoingDiveReducer,
  ongoingEvent: ongoingEventReducer,
  targets: targetReducer,
  user: userReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
