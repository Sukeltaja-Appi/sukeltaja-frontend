import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styles from '../stylesGlobal'
import { endEvent } from '../../reducers/EventReducer'

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

  static navigationOptions = {
    header: null,
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ counter: this.state.counter + 1 }), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  navigate = (value) => this.props.navigation.navigate(value)

  inviteButton = () => {
    console.log(this.props)
  }
  endButton = () => {
    this.props.endEvent(this.props.ongoingEvent)

    return this.navigate('EventScreen')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Tapahtuma käynnissä</Text>

        <TouchableOpacity onPress={this.inviteButton} style={styles.button} >
          <Text style={styles.buttonText}>Kutsu</Text>
        </TouchableOpacity>

        <Text style={styles.h1}>{this.state.counter}</Text>

        <TouchableOpacity onPress={this.endButton} style={stylesLocal.roundButton} >
          <Text style={styles.buttonText}>Lopeta</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ongoingEvent: state.ongoingEvent
  }
}

const ConnectedOngoingEventScreen = connect(
  mapStateToProps,
  { endEvent }
)(OngoingEventScreen)

export default ConnectedOngoingEventScreen
