import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { diveReducer, ongoingDiveReducer } from './reducers/diveReducer'
import { eventReducer, ongoingEventReducer } from './reducers/eventReducer'
import { targetReducer } from './reducers/targetReducer'
import { userReducer, usersReducer } from './reducers/userReducer'
import { messageReducer }from './reducers/messageReducer'

const appReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  messages: messageReducer,
  ongoingEvent: ongoingEventReducer,
  events: eventReducer,
  ongoingDive: ongoingDiveReducer,
  dives: diveReducer,
  targets: targetReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_STATE') {
    state = undefined
  }

  return appReducer(state, action)
}

export const clearState = () => {
  return { type: 'CLEAR_STATE' }
}

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export default store
