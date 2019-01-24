import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import styles from './stylesGlobal';

class EventListScreen extends React.Component {

  render() {
    const uri = 'https://upload.wikimedia.org/wikipedia/commons/5/50/USS_Scorpion_sail.jpg'
    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri }}style={styles.imgBackground} >

          <Text style={styles.h1}>Menneet Tapahtumat</Text>


        </ImageBackground>
      </View>
    )
  }
}

export default EventListScreen
