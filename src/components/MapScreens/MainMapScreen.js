import React from 'react'
import { connect } from 'react-redux'
import { View, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import { MapView } from 'expo';

//import styles from '../../styles/global'
import { updateEvent } from '../../reducers/eventReducer'

class MainMapScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: null,
      targetLocation: null
    }
  }

  locateUser = () => {
    this.location = navigator.geolocation.getCurrentPosition()
  }

  updateLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => this.setState({location: position }),
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  locateTarget = () => {

  }

  render() {
    this.updateLocation()
    console.log(this.state.location)
    return (
      <View>

        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />

          <Button
            onPress={this.updateLocation}
            title="Paikanna"
          />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  events: state.events,
  ongoingEvent: state.ongoingEvent
})

export default connect(
  mapStateToProps,
  { updateEvent }
)(MainMapScreen)
