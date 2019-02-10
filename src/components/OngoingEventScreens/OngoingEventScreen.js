import React from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-elements'

const OngoingEventScreen = (props) => {
  return (
    <View>
      <Text h1>Hello OngoingEvent</Text>
      <Button
        buttonStyle={{ marginTop: 50 }}
        onPress={() => props.navigation.navigate('DiveScreen')}
        title="To Dive screen"
      />
    </View>
  )
}

export default OngoingEventScreen
