import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import styles from './stylesGlobal';

const stylesLocal = StyleSheet.create({
  roundButton: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f44336',
    width: 100,
    height: 100,
    borderRadius: 50
  }
})

class OngoingEventScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 0
    }
  }
  
  navigate = (value) => this.props.navigation.navigate(value);
  handlePress = () => this.setState({ counter: this.state.counter + 1 })

  mapButton = () => this.handlePress()
  inviteButton = () => this.handlePress()
  endButton = () => this.navigate('Events')

  render() {
    const uri = 'https://upload.wikimedia.org/wikipedia/commons/c/c2/US_Navy_explosive_ordnance_disposal_%28EOD%29_divers.jpg'
    //const startTime = new Date()
    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri }}style={styles.imgBackground} >

          <Text style={styles.h1}>Tapahtuma käynnissä</Text>
          <Text>Counter: {this.state.counter}</Text>

          <TouchableOpacity onPress={this.mapButton} style={styles.button} >
              <Text style={styles.buttonText}>Kartta</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.inviteButton} style={styles.button} >
              <Text style={styles.buttonText}>Kutsu</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.endButton} style={stylesLocal.roundButton} >
            <Text style={styles.buttonText}>Lopeta</Text>
          </TouchableOpacity>

        </ImageBackground>
      </View>
    )
  }
}

export default OngoingEventScreen
