import React from 'react'
import { connect } from 'react-redux'
import OngoingEventTabs from './index'
import StartEvent from './StartEvent'

class OngoingEventScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  static router = OngoingEventTabs.router

  render() {
    return this.props.ongoingEvent ? <OngoingEventTabs {...this.props} /> : <StartEvent {...this.props} />
  }
}

const mapStateToProps = (state) => ({ ongoingEvent: state.ongoingEvent })

export default connect(
  mapStateToProps,
  null
)(OngoingEventScreen)
