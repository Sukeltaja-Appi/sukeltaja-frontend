import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import styles from '../stylesGlobal'
import {addAmount} from '../reducers/EventReducer'

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
  }

  static navigationOptions = {
    header: null ,
  };

  navigate = (value) => this.props.navigation.navigate(value);
  handlePress = () => this.props.addAmount(1)

  mapButton = () => this.handlePress()
  inviteButton = () => this.handlePress()
  endButton = () => this.navigate('EventScreen')

  render() {
    const uri = 'https://upload.wikimedia.org/wikipedia/commons/c/c2/US_Navy_explosive_ordnance_disposal_%28EOD%29_divers.jpg'
    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri }}style={styles.imgBackground} >

          <Text style={styles.h1}>Tapahtuma käynnissä</Text>
          <Text>Counter: {this.props.counter}</Text>

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

const mapStateToProps = (state) => {
  return {
    counter: state
  }
}

const mapDispatchToProps = {
  addAmount
}

const ConnectedOngoingEventScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(OngoingEventScreen)

export default ConnectedOngoingEventScreen
