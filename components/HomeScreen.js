import React from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 24
  },
  image: {
    width: 500,
    height: 400
  }
})

class HomeScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 0
    }
  }

  handlePress = () => this.setState({ counter: this.state.counter + 1 })

  render() {
    const uri = 'https://upload.wikimedia.org/wikipedia/commons/5/50/USS_Scorpion_sail.jpg'

    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Sukeltaja App Hello World!</Text>
        <Image source={{ uri }} style={styles.image} />
        <Text>Counter: {this.state.counter}</Text>
        <Button onPress={this.handlePress} title="Press me" />
      </View>
    )
  }
}

export default HomeScreen
