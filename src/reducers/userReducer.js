import loginService from '../services/login'
import userService from '../services/users'
import { clearState } from '../store'

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

export const logout = () => clearState()

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
