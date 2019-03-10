import React from 'react'
import { connect } from 'react-redux'
import locationService from '../../services/location'
import { View } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { endEvent } from '../../reducers/eventReducer'
import { startDive } from '../../reducers/diveReducer'
import styles from '../../styles/global'
import colors from '../../styles/colors'

const style = {
  buttonEnd: {
    ...styles.roundButton,
    backgroundColor: colors.red
  },
  buttonDive: {
    ...styles.roundButton,
    backgroundColor: colors.green,
  }
}

const OngoingEvent = (props) => {
  const { ongoingEvent, endEvent, navigation } = props

  const navigate = (value) => navigation.navigate(value)

  const endEventButton = () => {
    endEvent(ongoingEvent)
  }

  const diveButton = async () => {
    let dive = {
      event: props.ongoingEvent._id,
      startdate: new Date(),
      latitude: null,
      longitude: null
    }

    const location = await locationService.getLocationAsync()

    dive.latitude = location.coords.latitude
    dive.longitude = location.coords.longitude

    await props.startDive(dive)

    navigate('DiveScreen')
  }

  return (
    <View style={styles.centered}>
      <Text h1>{ongoingEvent.title}</Text>
      <View style={styles.bottom}>
        <Button title='Lopeta' onPress={() => endEventButton()} buttonStyle={style.buttonEnd} raised />
      </View>
      <View style={styles.bottom}>
        <Button title='Sukella' onPress={() => diveButton()} buttonStyle={style.buttonDive} raised />
      </View>
    </View>
  )
}

const mapStateToProps = (state) => ({ ongoingEvent: state.ongoingEvent })

export default connect(
  mapStateToProps,
  { endEvent, startDive }
)(OngoingEvent)
