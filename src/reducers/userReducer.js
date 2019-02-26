import loginService from '../services/login'
import userService from '../services/users'

const userReducer = (store = [], action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return action.user
    case 'LOGIN_FAILURE':
      return []
    case 'LOGOUT':
      return []
    default:
      return store
  }
}

export const friendReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_FRIEND':
      return [ ...state, action.user ]
    case 'DELETE_FRIEND': {
      let newState = state
      newState.splice(newState.indexOf(action.user), 1)
      return newState
    }
    case 'LOAD_FRIENDS':
      return action.users
    default:
      return state
  }
}

export const selectedUserReducer = (state = [], action) => {
  switch (action.type) {
    case 'SELECT_USER':
      return [ ...state, action.user ]
    case 'SELECT_USERS':
      return [ ...state, ...action.users ]
    case 'SET_SELECTED_USERS':
      return action.users
    default:
      return state
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username: credentials.username,
        password: credentials.password
      })

      dispatch({
        type: 'LOGIN_SUCCESS',
        user
      })
    } catch (exception) { // can log failed login attempts here
      dispatch({
        type: 'LOGIN_FAILURE'
      })
    }
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

export const loadFriends = () => {
  return async (dispatch) => {
    const users = await userService.getAll()

    dispatch({
      type: 'LOAD_FRIENDS',
      users
    })
  }
}

export default userReducer
