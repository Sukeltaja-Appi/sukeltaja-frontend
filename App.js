import { AppRegistry } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import store from './src/store'
import AppEntry from './src/AppEntry'
import ServerListener from './src/ServerListener'

const ProviderPackedApp = () => {
  return (
    <Provider store={store}>
      <AppEntry />
      <ServerListener />
    </Provider>
  )
}

AppRegistry.registerComponent('SukeltajaApp', () => ProviderPackedApp)

export default ProviderPackedApp
