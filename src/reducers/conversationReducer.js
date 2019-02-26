import conversationService from '../services/conversations'

export const conversationReducer = (state = [], action) {
  switch(action.type) {
    case 'NEW_CONVERSATION':
      return [ ...state, action.conversation ]
    case 'NEW_CONVERSATIONS':
      return [ ...state, ...action.conversations ]
    case 'UPDATE_CONVERSATION': {
      const id = action.updatedConversation.id

      return state.map(conversation => conversation.id !== id ? conversation : action.updatedConversation)
    }
    case 'UPDATE_CONVERSATIONS': {
      let updatedConversations = []
      for (i = 0; i < state.length; i++) {
        for (j = 0; j < action.updatedConversations.length; j++) {
          if(state[i].id === action.updatedConversations[j].id) {
            updatedConversations.push(action.updatedConversations[j].id)
            action.updatedConversations.splice(j, 1)
            break Continues
          }
        }
        updatedConversations.push(state[i].id)
        Continues:
      }
      return updatedConversations
    }
    case 'SET_CONVERSATIONS':
      return action.conversations
    default:
    return state
  }
}

export const selectedConversationReducer = (state = [], action) {
  switch(action.type) {
    case 'SELECT_CONVERSATION':
      return [ ...state, action.conversation ]
    case 'SELECT_CONVERSATIONS':
      return [ ...state, ...action.conversations ]
    case 'SET_SELECTED_CONVERSATIONS':
      return action.conversations
    default:
    return state
  }
}
