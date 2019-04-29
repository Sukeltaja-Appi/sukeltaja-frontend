import eventService from '../services/events'
import { standardQueuing } from '../utils/offlineThunkHandler'
import { eventToID } from '../utils/eventHandler'

export const eventReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_EVENT':
      return [ ...state, action.newEvent ]
    case 'UPDATE_EVENT': {
      const id = action.updatedEvent._id

      return state.map(event => event._id !== id ? event : action.updatedEvent)
    }
    case 'DELETE_EVENT':
      return state.filter(e => e._id !== action.event._id)
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
  async function thunk (dispatch) {
    const newEvent = await eventService.create(event)

    dispatch({
      type: 'NEW_EVENT',
      newEvent
    })

    dispatch(setOngoingEvent(newEvent))
  }

  return standardQueuing(thunk)
}

export const createEvent = (event) => {

  async function thunk (dispatch) {
    const newEvent = await eventService.create(event)

    dispatch({
      type: 'NEW_EVENT',
      newEvent
    })
  }

  return standardQueuing(thunk)
}

export const deleteEvent = (event, ongoingEvent) => {

  async function thunk (dispatch) {
    await eventService.deleteReference(event._id)
    console.log('ongoingEvent in reducer---------->', ongoingEvent)
    if(ongoingEvent && event._id === ongoingEvent._id) dispatch(setOngoingEvent(null))

    dispatch({
      type: 'DELETE_EVENT',
      event
    })
  }

  return standardQueuing(thunk)
}

export const updateEvent = (event) => {
  return async (dispatch) => {
    const updatedEvent = await eventService.update(event._id, event)

    dispatch({
      type: 'UPDATE_EVENT',
      updatedEvent
    })
    dispatch({
      type: 'UPDATE_IF_ONGOING',
      event: updatedEvent
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

export const updateOngoingEventLocally = (event) => {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_EVENT',
      updatedEvent: event
    })
    dispatch(setOngoingEvent(event))
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

  async function thunk (dispatch) {
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

  return standardQueuing(thunk)
}
