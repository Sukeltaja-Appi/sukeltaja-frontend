import { AppRegistry } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import store from './src/store'
import AppEntry from './src/AppEntry'
import { ReduxNetworkProvider } from 'react-native-offline'

const ProviderPackedApp = () => {
  return (
    <Provider store={store}>
      <ReduxNetworkProvider>
        <AppEntry />
      </ReduxNetworkProvider>
    </Provider>
  )
}

AppRegistry.registerComponent('SukeltajaApp', () => ProviderPackedApp)

export default ProviderPackedApp
