import React from "react";
import {
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  Image,
} from "react-native";

const style = {
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#00A3FF',
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 15
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
    font: 'Nunito'
  }
}

const AppButton = ({ onPress, title}) => (
  <TouchableOpacity onPress={onPress} style={style.appButtonContainer}>
    <Text style={style.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

export default AppButton
