import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView } from 'react-native'
import EventForm from '../../common/EventForm'

import { createEvent } from '../../../reducers/eventReducer'
import { now, inOneHour } from '../../../utils/dates'
import styles from '../../../styles/global'

class CreateEventScreen extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      event: {
        description: '',
        startdate: now(),
        enddate: inOneHour()
      }
    }
  }

  createButton = async () => {
    const validated = this.ref.current.getValue()
    const { event } = this.state

    if (validated) {
      await this.props.createEvent(event)

      this.props.navigation.replace('EventListScreen')
    }
  }

  render() {
    const { event } = this.state

    return (
      <View style={styles.noPadding}>
        <ScrollView>
          <EventForm
            ref={this.ref}
            event={event}
            onFormChange={(event) => this.setState({ event })}
            onButtonPress={this.createButton}
            buttonTitle="Luo tapahtuma"
          />
        </ScrollView>
      </View>
    )
  }
}

export default connect(
  null,
  { createEvent }
)(CreateEventScreen)
