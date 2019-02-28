import eventService from '../services/events'

export const eventReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_EVENT':
      return [ ...state, action.newEvent ]
    case 'UPDATE_EVENT': {
      const id = action.updatedEvent.id

      return state.map(event => event.id !== id ? event : action.updatedEvent)
    }
    case 'INIT_EVENTS':
      return action.events
    default:
      return state
  }
}

export const ongoingEventReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_EVENT':
      return action.currentEvent
    default:
      return state
  }
}

export const initializeEvents = () => {
  return async (dispatch) => {
    const events = await eventService.getAll()

    dispatch({
      type: 'INIT_EVENTS',
      events
    })
  }
}

export const startEvent = (event) => {
  return async (dispatch) => {
    const newEvent = await eventService.create(event)

    dispatch({
      type: 'NEW_EVENT',
      newEvent
    })
    dispatch({
      type: 'SET_CURRENT_EVENT',
      currentEvent: newEvent
    })
  }
}

export const endEvent = (event) => {
  event.enddate = new Date()

  return async (dispatch) => {
    const updatedEvent = await eventService.update(event.id, event)

    dispatch({
      type: 'UPDATE_EVENT',
      updatedEvent
    }),
    dispatch({
      type: 'SET_CURRENT_EVENT',
      currentEvent: null
    })
  }
}

export const createEvent = (event) => {

  return async (dispatch) => {
    const newEvent = await eventService.create(event)

    dispatch({
      type: 'NEW_EVENT',
      newEvent
    })

    return newEvent
  }
}

export const updateEvent = (event) => {

  return async (dispatch) => {
    const updatedEvent = await eventService.update(event.id, event)

    dispatch({
      type: 'UPDATE_EVENT',
      updatedEvent
    })

    return updatedEvent
  }
}

export const forgetEvents = () => {
  return (dispatch) => {
    dispatch({
      type: 'INIT_EVENTS',
      events: []
    })
    dispatch({
      type: 'SET_CURRENT_EVENT',
      currentEvent: []
    })
  }
}

export const getOngoingEvent = (event) => {

  return async (dispatch) => {
    const updatedEvent = await eventService.get(event)

    dispatch({
      type: 'SET_CURRENT_EVENT',
      currentEvent: updatedEvent
    })
  }
}

// Merges the corresponding event on the server, with the clients event.
// 1. Only the creator can add admins
// 2. creator and admins can add users.
// 3. Everyone can add new dives.
export const mergeOngoingEvent = (event, userID) => {

  return async (dispatch) => {
    let updatedEvent = await eventService.get(event)

    let edited = false

    for (i = 0; i < event.dives.length; i++) {
      if(!updatedEvent.dives.includes(event.dives[i])) {
        updatedEvent.dives.push(event.dives[i])
        edited = true
      }
    }

    if(updatedEvent.creator == userID || updatedEvent.admins.includes(userID)) {
      for (i = 0; i < event.participants.length; i++) {
        if(!updatedEvent.participants.includes(event.participants[i])) {
          updatedEvent.participants.push(event.participants[i])
          edited = true
        }
      }
    }

    if(updatedEvent.creator == userID) {
      for (i = 0; i < event.admins.length; i++) {
        if(!updatedEvent.admins.includes(event.admins[i])) {
          updatedEvent.admins.push(event.admins[i])
          edited = true
        }
      }
      if(typeof ongoingEvent.title != 'undefined') updatedEvent.title = event.title
      if(typeof ongoingEvent.description != 'undefined') updatedEvent.description = event.description
      if(typeof ongoingEvent.target != 'undefined') updatedEvent.target = event.target
    }

    if(edited) updatedEvent = await eventService.update(updatedEvent.id, updatedEvent)

    dispatch({
      type: 'SET_CURRENT_EVENT',
      currentEvent: updatedEvent
    })
  }
}
