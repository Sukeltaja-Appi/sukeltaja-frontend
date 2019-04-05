import messageService from '../services/messages'
import { messageToID } from '../utils/utilityFunctions'

export const messageReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_MESSAGE':
      return [ ...state, action.message ]
    case 'REMOVE_MESSAGE':
      return state.filter(message => messageToID(message) !== action.id)
    case 'SET_MESSAGES':
      return action.messages
    default:
      return state
  }
}

export const sentMessageReducer = (state = [], action) => {
  switch(action.type) {
    case 'SEND_MESSAGE':
      return [ ...state, action.message ]
    case 'SET_SENT_MESSAGES':
      return action.messages
    default:
      return state
  }
}

export const getMessages = () => {
  return async (dispatch) => {
    const messages = await messageService.getAll()

    dispatch ({
      type: 'SET_MESSAGES',
      messages,
      meta: {
        retry: true
      }
    })
  }
}

export const checkMessage = (message, status) => {

  return async (dispatch) => {
    await messageService.checkMessage(messageToID(message), status)

    dispatch ({
      type: 'REMOVE_MESSAGE',
      id: messageToID(message),
      meta: {
        retry: true
      }
    })
  }
}

export const sendMessage = (type, data, sender, receivers) => {
  if (!type || !data || !sender || !receivers || receivers.length === 0) return

  const received = Array(receivers.length).fill('pending')

  let message = {
    created: new Date(),
    sender,
    receivers,
    received,
    type,
    data
  }

  return async (dispatch) => {
    message = await messageService.create(message)

    dispatch ({
      type: 'SEND_MESSAGE',
      message,
      meta: {
        retry: true
      }
    })
  }
}

export const receiveMessage = (message) => {
  return (dispatch) => {
    dispatch({
      type: 'NEW_MESSAGE',
      message
    })
  }
}
