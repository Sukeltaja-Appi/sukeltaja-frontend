import eventService from '../services/events'
import { eventToID } from '../utils/eventHandler'

export const eventReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_EVENT':
      return [ ...state, action.newEvent ]
    case 'UPDATE_EVENT': {
      const id = action.updatedEvent._id

      return state.map(event => event._id !== id ? event : action.updatedEvent)
    }
    case 'INIT_EVENTS':
      return action.events
    default:
      return state
  }
}

export const ongoingEventReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_ONGOING_EVENT': {
      return action.ongoingEvent
    }
    case 'UPDATE_IF_ONGOING': {
      if (state && state._id === action.event._id) return action.event

      return state
    }
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

    dispatch(setOngoingEvent(newEvent))
  }
}

export const endEvent = (event) => {
  event.enddate = new Date()

  return async (dispatch) => {
    const updatedEvent = await eventService.update(event._id, event)

    dispatch({
      type: 'UPDATE_EVENT',
      updatedEvent
    }),

    dispatch(setOngoingEvent(null))
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
    const updatedEvent = await eventService.update(event._id, event)

    dispatch({
      type: 'UPDATE_EVENT',
      updatedEvent
    })

    return updatedEvent
  }
}

export const updateLocalEvent = (event) => {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_EVENT',
      updatedEvent: event
    })
    dispatch({
      type: 'UPDATE_IF_ONGOING',
      event
    })
  }
}

export const setOngoingEvent = (event) => {
  return {
    type: 'SET_ONGOING_EVENT',
    ongoingEvent: event
  }
}

export const joinOngoingEvent = (event) => {

  return async (dispatch) => {
    const ongoingEvent = await eventService.acceptEventInvite(eventToID(event))

    dispatch({
      type: 'NEW_EVENT',
      newEvent: ongoingEvent
    })

    dispatch(setOngoingEvent(ongoingEvent))
  }
}

export const getOngoingEvent = (event) => {

  return async (dispatch) => {
    const ongoingEvent = await eventService.get(eventToID(event))

    dispatch({
      type: 'UPDATE_EVENT',
      updatedEvent: ongoingEvent,
      meta: {
        retry: true
      }
    })

    dispatch(setOngoingEvent(ongoingEvent))
  }
}
