import React from 'react'

import { USERNAME, PASSWORD } from 'react-native-dotenv'
import eventService from './services/events'
import targetService from './services/targets'
import diveService from './services/dives'
import Navigator from './Navigator'

class AppEntry extends React.Component {
  componentDidMount = async () => {
    await this.props.initializeEvents()
    await this.props.initializeDives()
    const credentials = {
      username: USERNAME,
      password: PASSWORD
    }

    await this.props.login(credentials)

    const { user } = this.props

    if (user) {
      eventService.setToken(user.token)
      targetService.setToken(user.token)
      diveService.setToken(user.token)
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
