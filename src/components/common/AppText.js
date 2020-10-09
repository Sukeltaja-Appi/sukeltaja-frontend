import React from 'react'
import { Text } from 'react-native'

const style = {
  appText: {
    fontFamily: 'nunito-bold',
  },
}

const AppText = (props) => <Text style={[style.appText, props.style]}>{props.children}</Text>

export default AppText