import React from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import styles from '../../styles/global'
import colors from '../../styles/colors'
import { startEvent } from '../../reducers/eventReducer'

const style = {
  button: {
    backgroundColor: colors.green,
    width: 100,
    height: 100,
    borderRadius: 50,
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

  return (
    <View style={styles.centered}>
      <Text h1>Aloita sukellus</Text>

      <Text style={styles.h5}>
        Voit aloittaa uuden sukelluksen nopeasti joko alla olevalla napilla,
        tai luomalla uuden tapahtuman Tapahtumat-välilehdellä.
      </Text>

      <View style={styles.bottom}>
        <Button title='Aloita' onPress={() => startButton()} buttonStyle={style.button} raised />
      </View>
    </View>
  )
}

export default connect(
  null,
  { startEvent }
)(StartEventScreen)
