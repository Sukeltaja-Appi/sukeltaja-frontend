import React from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import styles from '../../styles/global'
import colors from '../../styles/colors'
import { createEvent } from '../../reducers/eventReducer'

const style = {
  button: {
    backgroundColor: colors.green,
    width: 100,
    height: 100,
    borderRadius: 50,
  }
}

const EventScreen = (props) => {

  const navigate = (value) => props.navigation.navigate(value)

  const startButton = async () => {
    const event = { content: 'Oma sukellustapahtuma 1' }

    await props.createEvent(event)

    navigate('OngoingDiveScreen')
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
  { createEvent }
)(EventScreen)
