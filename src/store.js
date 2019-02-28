import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { diveReducer, ongoingDiveReducer } from './reducers/diveReducer'
import { eventReducer, ongoingEventReducer } from './reducers/eventReducer'
import { targetReducer, selectedTargetReducer } from './reducers/targetReducer'
import { userReducer, usersReducer, selectedUsersReducer } from './reducers/userReducer'
import { messageReducer, selectedMessageReducer }from './reducers/messageReducer'

const reducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  selectedUsers: selectedUsersReducer,
  selectedMessages: selectedMessageReducer,
  messages: messageReducer,
  ongoingEvent: ongoingEventReducer,
  events: eventReducer,
  ongoingDive: ongoingDiveReducer,
  dives: diveReducer,
  selectedTargets: selectedTargetReducer,
  targets: targetReducer,
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
