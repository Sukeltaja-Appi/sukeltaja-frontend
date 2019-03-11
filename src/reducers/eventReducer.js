import eventService from '../services/events'
import { mergeUserLists, objectToID,
  userIsInArray, eventToID
} from '../utils/utilityFunctions'

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
  event.creator = objectToID(event.creator)

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

export const setOngoingEvent = (event) => {
  return {
    type: 'SET_ONGOING_EVENT',
    ongoingEvent: event
  }
}

export const forgetEvents = () => {
  return (dispatch) => {
    dispatch({
      type: 'INIT_EVENTS',
      events: []
    })

    dispatch({
      type: 'SET_ONGOING_EVENT',
      ongoingEvent: null
    })
  }
}

export const joinOngoingEvent = (event) => {

  return async (dispatch) => {
    console.log('Event-------------------------------------------------')
    console.log(event)
    console.log('EventID-----------------------------------------------')
    console.log(objectToID(event))
    console.log('------------------------------------------------------')
    const ongoingEvent = await eventService.acceptEventInvite(objectToID(event))

    dispatch({
      type: 'NEW_EVENT',
      newEvent: ongoingEvent
    })
    dispatch({
      type: 'SET_ONGOING_EVENT',
      ongoingEvent: ongoingEvent
    })
  }
}

export const getOngoingEvent = (event) => {

  return async (dispatch) => {
    const ongoingEvent = await eventService.get(eventToID(event))

    dispatch({
      type: 'SET_ONGOING_EVENT',
      ongoingEvent: ongoingEvent
    })
    dispatch({
      type: 'UPDATE_EVENT',
      updatedEvent: ongoingEvent
    })
  }
}

export const leaveOngoingEvent = () => {

  return (dispatch) => {

    dispatch({
      type: 'SET_ONGOING_EVENT',
      ongoingEvent: null
    })
  }
}

// Merges the corresponding event on the server, with the clients event.
export const mergeOngoingEvent = (event, userID) => {

  return async (dispatch) => {
    console.log('Before get--------------------------------------')
    console.log(event)
    let updatedEvent = await eventService.get(event.id)

    console.log('After get--------------------------------------')
    console.log(updatedEvent)

    let edited = false

    if(objectToID(updatedEvent.creator) === userID || userIsInArray(userID, updatedEvent.admins)) {
      updatedEvent.participants = mergeUserLists(updatedEvent.participants, event.participants)
      updatedEvent.pending = mergeUserLists(updatedEvent.pending, event.pending)

      for (let i = 0; i < updatedEvent.pending.length; i++) {
        let request = updatedEvent.pending[i]

        updatedEvent.pending[i] = {
          access: request.access,
          user: objectToID(request.user)
        }
      }
      edited = true
    }

    if(objectToID(updatedEvent.creator) === userID) {
      if(typeof updatedEvent.title !== 'undefined') {
        updatedEvent.title = event.title
        //edited = true
      }
      if(typeof updatedEvent.description !== 'undefined') {
        updatedEvent.description = event.description
        //edited = true
      }
      if(typeof updatedEvent.target !== 'undefined') {
        updatedEvent.target = event.target
        //edited = true
      }

      updatedEvent.admins = mergeUserLists(updatedEvent.admins, event.admins)
      //edited = true
    }

    if(edited) {
      updatedEvent.creator = objectToID(updatedEvent.creator)
      updatedEvent = await eventService.update(updatedEvent.id, updatedEvent)
      console.log('After put--------------------------------------')
      console.log(updatedEvent)
    }

    dispatch({
      type: 'UPDATE_EVENT',
      updatedEvent
    })
    dispatch({
      type: 'SET_ONGOING_EVENT',
      ongoingEvent: updatedEvent
    })
  }
}
