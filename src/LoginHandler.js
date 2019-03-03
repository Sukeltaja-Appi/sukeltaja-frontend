import React from 'react'
import { connect } from 'react-redux'

import eventService from './services/events'
import targetService from './services/targets'
import diveService from './services/dives'
import userService from './services/users'
import { initializeEvents, forgetEvents } from './reducers/eventReducer'
import { initializeDives, forgetDives } from './reducers/diveReducer'
import { loginR, logoutR } from './reducers/userReducer'

class LoginHandler extends React.Component {

  login = async (credentials) => {
    //const { login, initializeEvents, initializeDives } = this.props

    const user = await this.props.loginR(credentials)

    if (user) {
      eventService.setToken(user.token)
      targetService.setToken(user.token)
      diveService.setToken(user.token)
      userService.setToken(user.token)

      await this.props.initializeEvents()
      await this.props.initializeDives()

      return true

    } else {
      console.log('Wrong username or password')

      return false
    }
  }

  logout = () => {
    //const { logout, forgetEvents, forgetDives } = this.props

    this.props.forgetEvents()
    this.props.forgetDives()
    this.props.logoutR()
    eventService.setToken('dummy')
    targetService.setToken('dummy')
    diveService.setToken('dummy')
    userService.setToken('dummy')
  }

  render() {
    return null
  }
}

export default connect(
  null,
  { initializeEvents, forgetEvents,
    initializeDives, forgetDives,
    loginR, logoutR
  }
)(LoginHandler)

// let lh = null
//
// const initLoginHandler = () => {
//   lh = new connect(
//     null,
//     { initializeEvents, forgetEvents,
//       initializeDives, forgetDives,
//       loginR, logoutR
//     }
//   )(LoginHandlerClass)
//   console.log(lh)
// }

// const login = (credentials) => lh.handleLogin(credentials)
// const logout = () => lh.handleLogout()
//
// export default { initLoginHandler, login, logout }
