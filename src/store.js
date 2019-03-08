import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { diveReducer, ongoingDiveReducer } from './reducers/diveReducer'
import { eventReducer, ongoingEventReducer } from './reducers/eventReducer'
import { targetReducer, currentTargetReducer } from './reducers/targetReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  currentTarget: currentTargetReducer,
  ongoingDive: ongoingDiveReducer,
  ongoingEvent: ongoingEventReducer,
  dives: diveReducer,
  events: eventReducer,
  targets: targetReducer,
  user: userReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
