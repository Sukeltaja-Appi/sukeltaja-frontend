import React from 'react'
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
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

const AppButton = ({ onPress, title, containerStyle, textStyle, showLoadingIconOnPress }) => {
  const extraContainerStyle = containerStyle ?? {}
  const extraTextStyle = textStyle ?? {}

  if (showLoadingIconOnPress) {
    return (
      <TouchableOpacity style={{ ...style.appButtonContainer, ...extraContainerStyle }}>
        <ActivityIndicator size="large" color="white" />
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity onPress={onPress} style={{ ...style.appButtonContainer, ...extraContainerStyle }}>
      <Text style={{ ...style.appButtonText, ...extraTextStyle }}>{title}</Text>
    </TouchableOpacity >
  )
}

export default AppButton
