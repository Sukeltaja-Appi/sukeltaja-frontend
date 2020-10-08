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
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  }
}

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={style.appButtonContainer}>
    <Text style={style.appButtonText}>{title}</Text>
  </TouchableOpacity>
)

export default AppButton
