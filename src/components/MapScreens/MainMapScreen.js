import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import { MapView, Location, Permissions } from 'expo'

import styles from '../../styles/global'

import { getAll, selectTarget, resetTargets, setSelectedTargets } from '../../reducers/targetReducer'

const style = {
  buttonRow: {
    justifyContent: 'center',
    padding: 10
  },
  buttonDivider: {
    width: 20
  }
}

class MainMapScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mapRegion: {
        latitude: 60.1,
        longitude: 25.1,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      locationResult: null,
      location: {
        coords: {
          latitude: 60.1,
          longitude: 25.1
        }
      },
    }
  }

  componentDidMount() {
    this._getLocationAsync()
    this.loadTargets()
  }

  loadTargets = async () => {
    await this.props.getAll()
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion })
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      this.setState({
        locationResult: 'Paikannusta ei sallittu.',
        location,
      })
    }

    let location = await Location.getCurrentPositionAsync({})

    this.setState({ locationResult: JSON.stringify(location), location })
  }

  updateButton = () => {
    this.loadTargets()
  }

  resetTargetsButton = () => {
    this.props.resetTargets()
    this.render()
  }

  pressTarget = (target) => {
    let { selectedTargets, selectTarget, setSelectedTargets } = this.props
    let i = 0
    let found = false

    for (i=0; i<selectedTargets.length; i++) {
      if (selectedTargets[i].id === target.id) {
        found = true
        break
      }
    }
    if(!found) selectTarget(target)
    else {
      let targets = selectedTargets

      targets.splice(i, 1)
      setSelectedTargets(targets)
    }
    this.forceUpdate()
  }

  render() {
    const { coords } = this.state.location
    const { targets, selectedTargets } = this.props

    let markers = targets.map(target => {
      const {
        latitude,
        longitude,
        name,
        type
      } = target

      let color = 'blue'

      if(selectedTargets.includes(target)) color = 'green'

      return (
        <MapView.Marker
          coordinate={{
            latitude,
            longitude
          }}
          title={name}
          description={type}
          pinColor={color}
          key={Math.random().toString()} //Needed for update in gmaps.
          onPress={() => this.pressTarget(target)}
        />
      )
    }) || []

    return (
      <View style={styles.noPadding}>
        <MapView
          style={styles.flex}
          region={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.3688,
            longitudeDelta: 0.1684
          }}
        >
          <MapView.Marker
            coordinate={coords}
            title="Minä"
            description="Viimeisin sijaintini."
          />

          {markers}

        </MapView>

        <View style={{ ...styles.row, ...style.buttonRow }}>
          <Button
            title="Paikanna"
            onPress={this._getLocationAsync}
          />
          <View style={style.buttonDivider}/>
          <Button
            title="Päivitä"
            onPress={this.updateButton}
          />
          <View style={style.buttonDivider}/>
          <Button
            title="Poista Valinnat"
            onPress={this.resetTargetsButton}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedTargets: state.selectedTargets,
  targets: state.targets,
  ongoingEvent: state.ongoingEvent
})

export default connect(
  mapStateToProps,
  { getAll, selectTarget, resetTargets, setSelectedTargets }
)(MainMapScreen)
