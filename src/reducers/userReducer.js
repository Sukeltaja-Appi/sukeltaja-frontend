import loginService from '../services/login'

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

export default userReducer
