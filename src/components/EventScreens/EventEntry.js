import React from 'react'
import { connect } from 'react-redux'
import EventMenuStack from './index'
import NoUserScreen from '../common/NoUserScreen'

// The entry point for EventScreens.
class EventEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  static router = EventMenuStack.router

  render() {
    // If user is not logged in, render NoUserScreen, otherwise EventMenuStack.
    return this.props.user ? <EventMenuStack {...this.props} /> : <NoUserScreen {...this.props} />
  }
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(
  mapStateToProps,
  null
)(EventEntry)
