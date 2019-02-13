import React from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-elements'
//import { Location, Permissions } from 'expo'
import { connect } from 'react-redux'

import { endEvent } from '../../reducers/eventReducer'
import { startDive } from '../../reducers/diveReducer'

import styles from '../../styles/global'
import colors from '../../styles/colors'

const style = {
  buttonEnd: {
    backgroundColor: colors.red,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  buttonDive: {
    backgroundColor: colors.green,
    width: 100,
    height: 100,
    borderRadius: 50,
  }
}

const magic1 = 59.9
const magic2 = 24.9

const OngoingEventScreen = (props) => {

  const navigate = (value) => props.navigation.navigate(value)

  const endEventButton = () => {
    const { ongoingEvent, selectedTargets } = props
    const length = selectedTargets.length

    if(length > 0) ongoingEvent.target = selectedTargets[length-1].id

    props.endEvent(ongoingEvent)

    navigate('StartEventScreen')
  }

  // _getLocationAsync = async () => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION)
  //
  //   if (status !== 'granted') {
  //     this.setState({location})
  //   }
  //
  //   return await Location.getCurrentPositionAsync({})
  // }

  const diveButton = async () => {
    //const coords = await this._getLocationAsync().coords

    let dive = {
      event: props.ongoingEvent.id,
      startdate: new Date(),
      latitude: magic1 + Math.random(), // coords.latitude,
      longitude: magic2 + Math.random()//coords.longitude
    }

    await props.startDive(dive)

    navigate('DiveScreen')
  }

  return (
    <View style={styles.centered}>
      <Text h1>Meneillään oleva tapahtuma</Text>
      <View style={styles.bottom}>
        <Button title='Lopeta' onPress={() => endEventButton()} buttonStyle={style.buttonEnd} raised />
      </View>
      <View style={styles.bottom}>
        <Button title='Sukella' onPress={() => diveButton()} buttonStyle={style.buttonDive} raised />
      </View>
    </View>
  )
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  selectedTargets: state.selectedTargets
})

export default connect(
  mapStateToProps,
  { endEvent, startDive }
)(OngoingEventScreen)
