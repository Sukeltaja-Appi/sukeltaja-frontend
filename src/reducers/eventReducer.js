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
  if ( typeof event.creator !== 'undefined'
    && typeof event.creator._id !== 'undefined'
  ) event.creator = event.creator._id

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
  if ( typeof event.creator !== 'undefined'
    && typeof event.creator._id !== 'undefined'
  ) event.creator = event.creator._id

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
    const ongoingEvent = await eventService.get(event)

    dispatch({
      type: 'NEW_EVENT',
      newEvent: ongoingEvent
    })
    dispatch({
      type: 'SET_CURRENT_EVENT',
      currentEvent: ongoingEvent
    })
  }
}

// Merges the corresponding event on the server, with the clients event.
export const mergeOngoingEvent = (event, userID) => {

  return async (dispatch) => {
    let updatedEvent = await eventService.get(event.id)

    let edited = false
    // if(updatedEvent.creator === userID || updatedEvent.admins.includes(userID)) {
    //
    // }

    if(updatedEvent.creator === userID) {
      if(typeof updatedEvent.title !== 'undefined') {
        updatedEvent.title = event.title
        edited = true
      }
      if(typeof updatedEvent.description !== 'undefined') {
        updatedEvent.description = event.description
        edited = true
      }
      if(typeof updatedEvent.target !== 'undefined') {
        updatedEvent.target = event.target
        edited = true
      }
    }

    if(edited) {
      if ( typeof updatedEvent.creator !== 'undefined'
        && typeof updatedEvent.creator._id !== 'undefined'
      ) updatedEvent.creator = updatedEvent.creator._id
      updatedEvent = await eventService.update(updatedEvent.id, updatedEvent)
    }

    dispatch({
      type: 'UPDATE_EVENT',
      updatedEvent
    })
    dispatch({
      type: 'SET_CURRENT_EVENT',
      currentEvent: updatedEvent
    })
  }
}
