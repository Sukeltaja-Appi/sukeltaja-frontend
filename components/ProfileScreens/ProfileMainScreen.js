import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import styles from '../stylesGlobal';

class ProfileMainScreen extends React.Component {
  constructor() {
    super()
  }

  navigate = (value) => this.props.navigation.navigate(value);

  render() {
    const uri = 'https://upload.wikimedia.org/wikipedia/commons/5/50/USS_Scorpion_sail.jpg'
    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri }}style={styles.imgBackground} >

          <Text style={styles.h1}>Profiili</Text>


        </ImageBackground>
      </View>
    )
  }
}

export default ProfileMainScreen
