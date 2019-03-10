import { AppRegistry } from 'react-native'

import React from 'react'

import { connect, Provider } from 'react-redux'
import store from './src/store'

import { login } from './src/reducers/userReducer'
import { initializeEvents } from './src/reducers/eventReducer'
import { initializeDives } from './src/reducers/diveReducer'
import { getAll } from './src/reducers/targetReducer'

import AppEntry from './src/AppEntry'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    selectedUsers: state.selectedUsers,
    selectedMessages: state.selectedMessages,
    messages: state.messages,
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
  { login, initializeEvents, initializeDives, getAll }
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
