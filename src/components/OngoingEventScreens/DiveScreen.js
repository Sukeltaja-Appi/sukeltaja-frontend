import React from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { Duration } from 'luxon'
import { connect } from 'react-redux'

import styles from '../../styles/global'
import colors from '../../styles/colors'

import locationService from '../../services/location'
import { startDive, endDive } from '../../reducers/diveReducer'
import { getOngoingEvent } from '../../reducers/eventReducer'
import { eventToID } from '../../utils/utilityFunctions'

const style = {
  buttonEndDive: {
    ...styles.roundButton,
    backgroundColor: colors.red
  },
  buttonDive: {
    ...styles.roundButton,
    backgroundColor: colors.green
  },
  counter: {
    marginTop: 50,
    backgroundColor: colors.secondary,
    color: 'white',
    paddingVertical: 21,
    flexGrow: 1,
    textAlign: 'center'
  }
}

const magic1 = 0.0
const magic2 = 0.0

class DiveScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 0,
      ongoing: false
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ counter: this.state.counter + 1 }), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  diveButton = async () => {
    let { ongoingEvent, startDive, getOngoingEvent } = this.props

    let dive = {
      event: eventToID(ongoingEvent),
      startdate: new Date(),
      latitude: magic1, // + Math.random(),
      longitude: magic2// + Math.random()
    }

    try {
      const location = await locationService.getLocationAsync()

      dive.latitude = location.coords.latitude
      dive.longitude = location.coords.longitude
    } catch(err) { console.log('Geolocation unavailable.') }

    await startDive(dive)
    await getOngoingEvent(ongoingEvent)

    this.state.ongoing = true
    this.state.counter = 0
    this.render()
  }

  endButton = async () => {
    const { endDive, ongoingEvent, ongoingDive } = this.props

    ongoingDive.enddate = new Date()
    ongoingDive.event = ongoingEvent._id
    ongoingEvent.dives = [ ...ongoingEvent.dives, ongoingDive._id ]
    endDive(ongoingDive)

    this.state.ongoing = false
    this.render()
  }

  duration = () => Duration.fromMillis(this.state.counter * 1000).toFormat('hh:mm:ss')

  render() {
    if(!this.state.ongoing) {
      return (
        <View style={styles.centered}>
          <Text h1>Aloita sukellus</Text>

          <View style={styles.bottom}>
            <Button title='Sukella' onPress={this.diveButton} buttonStyle={style.buttonDive} raised />
          </View>

        </View>
      )

    } else {
      return (
        <View style={styles.centered}>
          <Text h1>Sukellus käynnissä</Text>

          <View style={styles.row}>
            <Text h1 style={style.counter}>{this.duration()}</Text>
          </View>

          <View style={styles.bottom}>
            <Button title='Lopeta' onPress={this.endButton} buttonStyle={style.buttonEndDive} raised />
          </View>

        </View>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  ongoingDive: state.ongoingDive,
  ongoingEvent: state.ongoingEvent,
  user: state.user
})

export default connect(
  mapStateToProps,
  { endDive, startDive, getOngoingEvent }
)(DiveScreen)
