import React from 'react'
import { connect } from 'react-redux'
import EventTabs from './index'
import NoUserScreen from '../simple/NoUserScreen'

// The entry point for EventScreens.
class EventEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  static router = EventTabs.router

  render() {
    // If user is not logged in, render NoUserScreen, otherwise EventTabs.
    return this.props.user ? <EventTabs {...this.props} /> : <NoUserScreen {...this.props} />
  }
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(
  mapStateToProps,
  null
)(EventEntry)
