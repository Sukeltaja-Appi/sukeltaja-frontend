import React from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-elements'
import styles from '../../styles/global'
import colors from '../../styles/colors'

const NoUserScreen = (props) => {
  return (
    <View style={styles.centered}>
      <Text h1>Et ole kirjautunut sisään.</Text>

      <Text style={styles.h5}>
        Voit aloittaa ja muokata sukellustapahtumia kirjautumalla sisään.
      </Text>

      <View style={styles.bottom}>
        <Button
          title='Kirjaudu sisään'
          onPress={() => props.navigation.navigate('LoginScreen')}
          buttonStyle={{ backgroundColor: colors.green, width: '100%' }}
        />
      </View>
    </View>
  )
}

export default NoUserScreen
