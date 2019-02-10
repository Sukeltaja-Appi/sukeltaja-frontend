import React from 'react'
import { connect } from 'react-redux'
import { updateEvent } from '../../reducers/eventReducer'
import { View, ScrollView } from 'react-native'
import styles from '../../styles/global'
import colors from '../../styles/colors'
import EventForm from '../simple/EventForm'

class EditEventScreen extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()

    const { navigation } = props

    const {
      startdate,
      enddate,
      description
    } = navigation.getParam('item')

    this.state = {
      event: {
        description,
        startdate: new Date(startdate),
        enddate: new Date(enddate)
      }
    }
  }

  render() {
    const { event } = this.state

    return (
      <View style={styles.noPadding}>
        <ScrollView
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <EventForm
            ref={this.ref}
            event={event}
            onFormChange={(event) => this.setState({ event })}
            onButtonPress={this.createButton}
            buttonStyle={{ backgroundColor: colors.success }}
            buttonTitle="Muokkaa tapahtumaa"
          />
        </ScrollView>
      </View>
    )
  }
}

export default connect(
  null,
  { updateEvent }
)(EditEventScreen)
