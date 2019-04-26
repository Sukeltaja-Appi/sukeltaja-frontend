import React from 'react'
import { connect } from 'react-redux'
import OngoingEventTabs from './index'
import StartEventScreen from './StartEventScreen'
import NoUserScreen from '../simple/NoUserScreen'

// The entry point for OngoingEventScreens.
class OngoingEventEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  static router = OngoingEventTabs.router

  render() {
    const { ongoingEvent, user } = this.props

    // If user is not logged in, render NoUserScreen.
    if (!user) {
      return <NoUserScreen {...this.props} />
    }

    // Render StartEventScreen if no ongoing event, otherwise OngoingEventTabs.
    return ongoingEvent ? <OngoingEventTabs {...this.props} /> : <StartEventScreen {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  user: state.user
})

export default connect(
  mapStateToProps,
  null
)(OngoingEventEntry)
