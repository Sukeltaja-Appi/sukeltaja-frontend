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
    user: state.user,
    users: state.users,
    selectedMessages: state.selectedMessages,
    messages: state.messages,
    selectedUsers: state.selectedUsers,
    ongoingEvent: state.ongoingEvent,
    events: state.events,
    ongoingDive: state.ongoingDive,
    dives: state.dives,
    selectedTargets: state.selectedTargets,
    targets: state.targets,

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
