import React, { useState } from 'react'
import { connect } from 'react-redux'
//import { USERNAME, PASSWORD } from '@env'
//import userService from './services/users'
import Navigator from './Navigator'
import { login } from './reducers/userReducer'
import { initializeEvents } from './reducers/eventReducer'
import { initializeDives } from './reducers/diveReducer'
import { getAll } from './reducers/targetReducer'
import ServerListener from './ServerListener'
import OfflineNotifier from './OfflineNotifier'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { enableScreens } from 'react-native-screens'

enableScreens()

// * AppEntry is the first component where the store is available.
// * App startup code can be placed here.
// * Components that need to render outside of the Navigator can be
//   placed here. These may include:
//   - Renderless components, or notification components that need to
//     always stay active.

function AppEntry() {
  const getFonts = () =>
    Font.loadAsync({
      'nunito-regular': require('../assets/fonts/Nunito-Regular.ttf'),
      'nunito-bold': require('../assets/fonts/Nunito-Bold.ttf'),
      'nunito-extrabold': require('../assets/fonts/Nunito-ExtraBold.ttf'),
    })

  const [fontsLoaded, setFontsLoaded] = useState(false)

  // //Autologin code to speed up development:
  // componentDidMount = async () => {
  //   const credentials = {
  //     username: USERNAME,
  //     password: PASSWORD
  //   }
  //
  //   await this.props.login(credentials)
  //
  //   const { user } = this.props
  //
  //   if (user) {
  //     userService.setToken(user.token)
  //
  //     await this.props.initializeEvents()
  //     //await this.props.initializeDives()
  //     await this.props.getAll()
  //   } else {
  //     // notify user of wrong username/pw
  //   }
  // }

  if (fontsLoaded) {
    return (
      <React.Fragment>
        <OfflineNotifier />
        <Navigator />
        <ServerListener />
      </React.Fragment>
    )
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    )
  }
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(mapStateToProps, {
  login,
  initializeEvents,
  initializeDives,
  getAll,
})(AppEntry)
