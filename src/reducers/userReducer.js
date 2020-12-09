import * as SecureStore from 'expo-secure-store'

import loginService from '../services/login'
import userService from '../services/users'

// Holds the user that logs in to the app.
export const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return action.user
    case 'LOGIN_FAILURE':
      return null
    default:
      return state
  }
}

// Holds users that user gets from the server when searching for people
// to invite to an event. { username, _id }
export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_USERS':
      return action.users
    default:
      return state
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const { username, password } = credentials
      const user = await loginService.login({ username, password })

      SecureStore.setItemAsync('currentUser', JSON.stringify({
        _id: user._id,
        token: user.token,
        username: user.username,
        // We don't want to store all these
        events: [],
        dives: [],
        messages: [],
      }))
        .catch(err => console.error(err))

      userService.setToken(user.token)
      dispatch({
        type: 'LOGIN_SUCCESS',
        user
      })

      return user
    } catch (exception) { // can log failed login attempts here
      dispatch({
        type: 'LOGIN_FAILURE'
      })

      return null
    }
  }
}

export const loadAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()

    dispatch({
      type: 'LOAD_USERS',
      users
    })
  }
}

export default userReducer
