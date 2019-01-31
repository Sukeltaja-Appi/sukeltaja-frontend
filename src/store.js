import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { EventReducer, ongoingEventReducer } from './reducers/EventReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  ongoingEvent: ongoingEventReducer,
  events: EventReducer,
  user: userReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
