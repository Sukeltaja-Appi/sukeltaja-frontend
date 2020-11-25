import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as SecureStore from 'expo-secure-store'
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
import userService from './services/users'

enableScreens()

// * AppEntry is the first component where the store is available.
// * App startup code can be placed here.
// * Components that need to render outside of the Navigator can be
//   placed here. These may include:
//   - Renderless components, or notification components that need to
//     always stay active.

const AppEntry = (props) => {

  const initApp = async () => {
    await Font.loadAsync({
      'nunito-regular': require('../assets/fonts/Nunito-Regular.ttf'),
      'nunito-bold': require('../assets/fonts/Nunito-Bold.ttf'),
    })

    try {
      let currentUser = await SecureStore.getItemAsync('currentUser')

      console.log('Current user: ' + currentUser)
      if (currentUser) {
        currentUser = JSON.parse(currentUser)
        userService.setToken(currentUser.token)
        await props.initializeEvents()
        await props.getAll()
        props.dispatch({
          type: 'LOGIN_SUCCESS',
          user: currentUser,
        })
      }
    } catch (err) {
      console.warn(err)
      userService.setToken(null)
    }
  }

  const [appReady, setAppReady] = useState(false)

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

  if (appReady) {
    return (
      <React.Fragment>
        <OfflineNotifier />
        <Navigator />
        <ServerListener />
      </React.Fragment>
    )
  } else {
    return (
      <AppLoading startAsync={initApp} onFinish={() => setAppReady(true)} />
    )
  }
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(mapStateToProps, dispatch => ({
  login: (...args) => dispatch(login(args)),
  initializeEvents: (...args) => dispatch(initializeEvents(args)),
  initializeDives: (...args) => dispatch(initializeDives(args)),
  getAll: (...args) => dispatch(getAll(args)),
  dispatch,
}))(AppEntry)
