import React from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import styles from '../../styles/global'
import colors from '../../styles/colors'
import { NavigationEvents } from 'react-navigation'
import { startEvent } from '../../reducers/eventReducer'

const style = {
  button: {
    ...styles.roundButton,
    backgroundColor: colors.green,
  }
}

const StartEventScreen = (props) => {

  const navigate = (value) => props.navigation.navigate(value)

  const startButton = async () => {
    const event = {
      description: 'Oma sukellustapahtuma 1',
      dives: []
    }

    await props.startEvent(event)

    navigate('OngoingEventScreen')
  }

  const reRouteIfOngoingEventExists = () => {
    const { ongoingEvent } = props

    if(typeof ongoingEvent !== 'undefined' && ongoingEvent !== null) {
      navigate('OngoingEventScreen')
    }
  }

  return (
    <View style={styles.centered}>
      <NavigationEvents
        onWillFocus={() => {
          reRouteIfOngoingEventExists()
        }}
      />

      <Text h1>Aloita Tapahtuma</Text>

      <Text style={styles.h5}>
        Voit aloittaa uuden tapahtuman nopeasti joko alla olevalla napilla,
        tai luomalla uuden tapahtuman Tapahtumat-välilehdellä.
      </Text>

      <View style={styles.bottom}>
        <Button title='Aloita' onPress={() => startButton()} buttonStyle={style.button} raised />
      </View>
    </View>
  )
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent
})

export default connect(
  mapStateToProps,
  { startEvent }
)(StartEventScreen)
