import React from 'react'

import { USERNAME, PASSWORD, API_URL } from 'react-native-dotenv'
import eventService from './services/events'
import targetService from './services/targets'
import diveService from './services/dives'
import userService from './services/users'
import loginService from './services/login'
import Navigator from './Navigator'

class AppEntry extends React.Component {
  componentDidMount = async () => {
    const credentials = {
      username: USERNAME,
      password: PASSWORD
    }

    console.log(API_URL)

    loginService.setUrl(API_URL)
    eventService.setUrl(API_URL)
    targetService.setUrl(API_URL)
    diveService.setUrl(API_URL)
    userService.setUrl(API_URL)

    await this.props.login(credentials)

    const { user } = this.props

    if (user) {
      eventService.setToken(user.token)
      targetService.setToken(user.token)
      diveService.setToken(user.token)
      userService.setToken(user.token)

      await this.props.initializeEvents()
      await this.props.initializeDives()
    } else {
      // notify user of wrong username/pw
    }
  }

  render() {
    return (
      <Navigator />
    )
  }
}

export default AppEntry
