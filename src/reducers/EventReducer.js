
let initialState = {
  userID: "None",
  currentID: 0,
  all: []
}

const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_EVENT':
      return {userID: "None", currentID: action.data.newID, all:[...state.all, action.data.newEvent]}
    case 'SET_START_TIME': {
      const id = state.currentID
      const eventToChange = state.all.find(e => e.id === id)
      const changedEvent = {...eventToChange, startdate: new Date()}
      return {userID: "None", currentID: id, all: state.all.map(event => event.id !== id ? event : changedEvent )}
    }
    case 'SET_END_TIME': {
       const id = state.currentID
       const eventToChange = state.all.find(e => e.id === id)
       const changedEvent = {...eventToChange, enddate: new Date()}
       return {userID: "None", currentID: id, all: state.all.map(event => event.id !== id ? event : changedEvent )}
    }
  }
  return state
}

export const newEvent = (pID) => {
  return {
    type: 'NEW_EVENT',
    data: {
      userID: 'None',
      newID: pID,
      newEvent: {
          startdate: new Date(),
          enddate: new Date(),
          id: pID
      }
    }
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
