import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import EventInfoForm from '../../common/EventInfoForm'

import { setOngoingEvent, getOngoingEvent } from '../../../reducers/eventReducer'
import { endDives } from '../../../reducers/diveReducer'
import styles from '../../../styles/global'
import { now, inTenMinutes } from '../../../utils/dates'

class EventInfoScreen extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()

    this.state = {
      event: {
        title: '',
        description: '',
        startdate: now(),
        enddate: inTenMinutes(),
      }
    }
  }

  onButtonPress = () => {
    this.props.navigation.navigate('CustomTargetScreen')
    console.log(this.state)
  }

  render() {
    const { event } = this.state

    return (
      <View style={styles.noPadding}>
        <EventInfoForm
          event = {event}
          onFormChange={(event) => this.setState({ event })}   
          onButtonPress={this.onButtonPress}     
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  ongoingDives: state.ongoingDives,
  user: state.user
})

export default connect(
  mapStateToProps,
  { endDives, setOngoingEvent, getOngoingEvent }
) (EventInfoScreen)
