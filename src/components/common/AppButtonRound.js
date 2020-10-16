import React from 'react'
import {
  TouchableOpacity,
  Text,
} from 'react-native'

const style = {
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#00A3FF',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#118BFC',
    bottom: 10,
    right: 10,
    width: 80,
    height: 80,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  appButtonText: {
    fontSize: 47,
    color: '#fff',
  }
}

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={style.appButtonContainer}>
    <Text style={style.appButtonText}>{title}</Text>
  </TouchableOpacity>
)

export default AppButton
