import React from 'react'
import { connect } from 'react-redux'
import OngoingEvent from './OngoingEvent'
import StartEvent from './StartEvent'

const OngoingEventScreen = (props) => props.ongoingEvent ? <OngoingEvent {...props} /> : <StartEvent {...props} />

const mapStateToProps = (state) => ({ ongoingEvent: state.ongoingEvent })

export default connect(
  mapStateToProps,
  null
)(OngoingEventScreen)
