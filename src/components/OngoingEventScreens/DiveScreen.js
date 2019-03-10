import React from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import styles from '../../styles/global'
import colors from '../../styles/colors'
import { endDive } from '../../reducers/diveReducer'
import { Duration } from 'luxon'

const style = {
  button: {
    ...styles.roundButton,
    backgroundColor: colors.red,
  },
  counter: {
    marginTop: 50,
    backgroundColor: colors.secondary,
    color: 'white',
    paddingVertical: 21,
    flexGrow: 1,
    textAlign: 'center'
  }
}

class DiveScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 0
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ counter: this.state.counter + 1 }), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  endButton = () => {
    const { endDive, ongoingEvent, ongoingDive, navigation } = this.props

    ongoingDive.enddate = new Date()
    ongoingDive.event = ongoingEvent._id
    ongoingEvent.dives = [ ...ongoingEvent.dives, ongoingDive._id ]
    endDive(ongoingDive)

    return navigation.navigate('OngoingEventScreen')
  }

  duration = () => Duration.fromMillis(this.state.counter * 1000).toFormat('hh:mm:ss')

  render() {
    return (
      <View style={styles.centered}>
        <Text h1>Sukellus käynnissä</Text>

        <View style={styles.row}>
          <Text h1 style={style.counter}>{this.duration()}</Text>
        </View>

        <View style={styles.bottom}>
          <Button title='Lopeta' onPress={this.endButton} buttonStyle={style.button} raised />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  ongoingDive: state.ongoingDive,
  ongoingEvent: state.ongoingEvent
})

export default connect(
  mapStateToProps,
  { endDive }
)(DiveScreen)
