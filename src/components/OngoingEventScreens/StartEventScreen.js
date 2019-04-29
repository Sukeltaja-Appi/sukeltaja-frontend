import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { startEvent } from '../../reducers/eventReducer'
import styles from '../../styles/global'
import colors from '../../styles/colors'

const StartEventScreen = (props) => {

  const { startEvent, user } = props

  const startButton = async () => {
    const event = {
      title: user.username + ': sukellustapahtuma',
      dives: []
    }

    await startEvent(event)
  }

  return (
    <View style={styles.centered}>
      <Text h1>Ei aktiivista tapahtumaa.</Text>

      <Text style={styles.h5}>
        Voit aloittaa uuden sukellustapahtuman nopeasti joko alla olevalla napilla,
        tai luomalla uuden tapahtuman Tapahtumat-välilehdellä.
      </Text>

      <View style={styles.bottom}>
        <Button
          title='Aloita uusi tapahtuma'
          onPress={() => startButton()}
          buttonStyle={{ backgroundColor: colors.green, width: '100%' }}
        />
      </View>
    </View>
  )
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(
  mapStateToProps,
  { startEvent }
)(StartEventScreen)
