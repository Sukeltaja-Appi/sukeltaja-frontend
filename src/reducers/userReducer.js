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
