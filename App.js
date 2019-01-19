import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default class App extends React.Component {
  render () {
    const uri = 'https://upload.wikimedia.org/wikipedia/commons/5/50/USS_Scorpion_sail.jpg'
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Sukeltaja App Hello World!</Text>
        <Image source={{ uri }} style={{ width: 500, height: 400 }} />
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
