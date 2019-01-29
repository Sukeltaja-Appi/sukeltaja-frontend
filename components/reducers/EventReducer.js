
let initialState = {
  userID: "None",
  currentID: 0,
  all: [
    {
      id: 0,
      content: "None",
      startdate: new Date(),
      enddate: new Date(),
      counter: 0
    }
  ]
}

const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_EVENT':
      return {currentID: action.data.newID, all:[...state.all, action.data.newEvent]}
    case 'ADD_AMOUNT': {
      const id = state.currentID
      const eventToChange = state.all.find(e => e.id === id)
      const changedEvent = {...eventToChange, counter: eventToChange.counter + action.data}
      console.log(eventToChange)
      console.log(changedEvent)
      return {currentID: id, all: state.all.map(event => event.id !== id ? event : changedEvent )}
    }
    case 'SET_START_TIME': {
      const id = state.currentID
      const eventToChange = state.all.find(e => e.id === id)
      const changedEvent = {...eventToChange, startdate: new Date()}
      console.log(eventToChange)
      console.log(changedEvent)
      return {currentID: id, all: state.all.map(event => event.id !== id ? event : changedEvent )}
    }
    case 'SET_END_TIME': {
       const id = state.currentID
       const eventToChange = state.all.find(e => e.id === id)
       const changedEvent = {...eventToChange, enddate: new Date()}
       console.log(eventToChange)
       console.log(changedEvent)
       return {currentID: id, all: state.all.map(event => event.id !== id ? event : changedEvent )}
    }
  }
  return state
}

export const newEvent = (pID) => {
  return {
    type: 'NEW_EVENT',
    data: {
      newID: pID,
      newEvent: {
          counter: 0,
          startTime: new Date(),
          endTime: new Date(),
          id: pID
      }
    }
  }
}

export const addAmount = (amount) => {
  return {
    type: 'ADD_AMOUNT',
    data: amount
  }
}

export const startTime = () => {
  return {
    type: 'SET_START_TIME'
  }
}

export const endTime = () => {
  return {
    type: 'SET_END_TIME'
  }
}

export default EventReducer
