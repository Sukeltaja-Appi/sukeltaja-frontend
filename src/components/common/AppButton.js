import React from 'react'
import {
  TouchableOpacity,
  Text,
} from 'react-native'

const style = {
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#00A3FF',
    borderRadius: 25,
    borderWidth: 4,
    borderColor: '#118BFC',
    paddingVertical: 20,
    paddingHorizontal: 15
  },
  appButtonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'nunito-bold',
    alignSelf: 'center',
  }
}

const AppButton = ({ onPress, title, containerStyle, textStyle }) => {
  const extraContainerStyle = containerStyle ?? {}
  const extraTextStyle = textStyle ?? {}

  return (
    <TouchableOpacity onPress={onPress} style={{ ...style.appButtonContainer, ...extraContainerStyle }} >
      <Text style={{ ...style.appButtonText, ...extraTextStyle }}>{title}</Text>
    </TouchableOpacity >
  )
}

export default AppButton
