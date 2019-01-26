import {createStore} from 'redux'

let initialState = 0

const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.data
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
  }
  return state
}

export const addAmount = (amount) => {
  return {
    type: 'ADD',
    data: amount
  }
}

export default EventReducer
