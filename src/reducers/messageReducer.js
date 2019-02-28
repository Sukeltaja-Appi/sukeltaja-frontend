import messageService from '../services/messages'

export const messageReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_MESSAGE':
      return [ ...state, action.message ]
    case 'NEW_MESSAGES':
      return [ ...state, ...action.messages ]
    case 'UPDATE_MESSAGE': {
      const id = action.message.id

      return state.map(message => message.id !== id ? message : action.message)
    }
    case 'UPDATE_MESSAGES': {
      let updatedMessages = []

      for (i = 0; i < state.length; i++) {
        let found = false
block:
        if(!found) {
          for (j = 0; j < action.messages.length; j++) {
            if(state[i].id === action.messages[j].id) {
              updatedMessages.push(action.messages[j].id)
              action.updatedMessages.splice(j, 1)
              found = true
              break block
            }
          }
          updatedMessages.push(state[i].id)
        }
      }
      return updatedMessages
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
