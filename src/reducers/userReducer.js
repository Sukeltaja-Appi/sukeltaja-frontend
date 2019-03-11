import loginService from '../services/login'
import userService from '../services/users'

export const userReducer = (store = [], action) => {
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
