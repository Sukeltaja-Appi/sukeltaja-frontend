import { AppRegistry } from 'react-native'

import React from 'react'

import { connect, Provider } from 'react-redux'
import store from './src/store'

import { login } from './src/reducers/userReducer'
import { initializeEvents } from './src/reducers/eventReducer'
import { initializeDives } from './src/reducers/diveReducer'

import AppEntry from './src/AppEntry'

const mapStateToProps = (state) => {
  return {
    currentTarget: state.ongoingEvent && state.ongoingEvent.target ? state.ongoingEvent.target : null,
    ongoingDive: state.ongoingDive,
    ongoingEvent: state.ongoingEvent,
    dives: state.dives,
    events: state.events,
    targets: state.targets,
    user: state.user,
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  { login, initializeEvents, initializeDives }
)(AppEntry)

const ProviderPackedApp = () => {
  return (
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  )
}

AppRegistry.registerComponent('SukeltajaApp', () => ProviderPackedApp)

export default ProviderPackedApp
