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
    currentTarget: state.ongoingEvent && state.ongoingEvent.target ? state.ongoingEvent.target : null,
    targets: state.targets,
    ongoingDive: state.ongoingDive,
    dives: state.dives,
    ongoingEvent: state.ongoingEvent,
    events: state.events,
    user: state.user,
    users: state.users,
    selectedUsers: state.selectedUsers,
    selectedMessages: state.selectedMessages,
    messages: state.messages,
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
