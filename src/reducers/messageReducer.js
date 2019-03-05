import messageService from '../services/messages'
import { objectToID } from '../utils/utilityFunctions'

export const messageReducer = (state = [], action) => {
  switch(action.type) {
    case 'REMOVE_MESSAGE': {
      state.splice(state.findIndex((m) => {return m.id === action.id}), 1)

      return state
    }
    case 'SET_MESSAGES':
      return action.messages
    default:
      return state
  }
}

export const selectedMessageReducer = (state = [], action) => {
  switch(action.type) {
    case 'SELECT_MESSAGE':
      return [ ...state, action.message ]
    case 'SELECT_MESSAGES':
      return [ ...state, ...action.messages ]
    case 'SET_SELECTED_MESSAGES':
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
      messages
    })
  }
}

export const checkMessage = (message, userID, status) => {
  const userIndex = message.receivers.findIndex((u) => {return u === userID})

  message.received[userIndex] = status

  return async (dispatch) => {
    await messageService.update(message.id, message)

    dispatch ({
      type: 'REMOVE_MESSAGE',
      id: message.id
    })
  }
}

export const sendMessage = async (type, data, sender, receivers) => {
  for (let i=0; i<receivers.length; i++) receivers[i] = objectToID(receivers[i])
  sender = objectToID(sender)

  const received = []

  for (let i = 0; i < receivers.length; i++) received.push('pending')

  let message = {
    created: new Date(),
    sender,
    receivers,
    received,
    type,
    data
  }

  await messageService.create(message)
}
