import React from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-elements'

import styles from '../../styles/global'
import colors from '../../styles/colors'

const style = {
  button: {
    backgroundColor: colors.green,
    width: 100,
    height: 100,
    borderRadius: 50,
  }
}

const OngoingEventScreen = (props) => {

  const navigate = (value) => props.navigation.navigate(value)

  const diveButton = () => {
    navigate('DiveScreen')
  }

  return (
    <View style={styles.centered}>
      <Text h1>Meneillään oleva tapahtuma</Text>
      <View style={styles.bottom}>
        <Button title='Sukella' onPress={() => diveButton()} buttonStyle={style.button} raised />
      </View>
    </View>
  )
}

export default OngoingEventScreen
