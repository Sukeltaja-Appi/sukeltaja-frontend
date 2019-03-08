import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { SearchBar, Text } from 'react-native-elements'
import ClusteredMapView from 'react-native-maps-super-cluster'
import { Marker, Callout } from 'react-native-maps'
import colors from '../../styles/colors'
import decimalToDMS from '../../utils/coordinates'

import { getAll } from '../../reducers/targetReducer'
import Target from './Target'

class MainMapScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialRegion: {
        latitude: 64.5,
        longitude: 26,
        latitudeDelta: 12,
        longitudeDelta: 12
      },
      overlay: false,
      search: '',
      target: null
    }
  }

  componentDidMount() {
    if (this.props.targets.length === 0) {
      this.loadTargets()
    }
  }

  renderCluster = (cluster, onPress) => {
    const { pointCount, coordinate, clusterId } = cluster

    return (
      <Marker identifier={`cluster-${clusterId}`} coordinate={coordinate} onPress={onPress}>
        <View style={style.cluster}>
          <Text>
            {pointCount}
          </Text>
        </View>
      </Marker>
    )
  }

  renderMarker = (pin) => {
    const { id, location, name, type } = pin

    return (
      <Marker
        identifier={`pin-${id}`}
        key={id || Math.random()}
        coordinate={location}
        onCalloutPress={() => this.setState({ overlay: true })}
      >
        <Callout>
          <Text style={{ fontWeight: 'bold' }}>{name}</Text>
          {type && <Text>{type}</Text>}
          <Text>{`${decimalToDMS(location.latitude)} N`}</Text>
          <Text>{`${decimalToDMS(location.longitude)} E`}</Text>
        </Callout>
      </Marker>
    )
  }

  loadTargets = async () => {
    await this.props.getAll()
  }

  // According to react-native-maps-super-cluster,
  // use onMarkerPress instead of using onPress directly on Markers
  onMarkerPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate
    const target = this.props.targets.find(
      m => m.latitude === latitude && m.longitude === longitude
    )

    if (target) {
      this.setState({ target })
    }
  }

  filteredTargets = () => {
    const search = this.state.search.trim().toLowerCase()
    const { targets } = this.props

    return search ? targets.filter(t => t.name.toLowerCase().startsWith(search)) : targets
  }

  search = (search) => {
    const map = this.map.getMapRef()

    this.setState({ search }, () => {
      if (!search) {
        map.animateToRegion(this.state.initialRegion)
      } else if (this.filteredTargets().length > 0) {
        map.fitToCoordinates(this.filteredTargets().map(m => m.location))
      }
    })
  }

  render() {
    const { initialRegion, target } = this.state
    const { targets } = this.props

    targets.map(t => t.location = { longitude: t.longitude, latitude: t.latitude })

    return(
      <View style={style.container}>
        <ClusteredMapView
          ref={(r) => { this.map = r }}
          maxZoom={12}
          mapPadding={{ top: 100, left: 50, right: 50 }}
          style={style.map}
          radius={42}
          data={this.filteredTargets()}
          initialRegion={initialRegion}
          onMarkerPress={this.onMarkerPress}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster}
          showsUserLocation={true}
          userLocationAnnotationTitle=''
        />

        <SearchBar
          placeholder='Etsi kohde'
          containerStyle={style.searchContainer}
          inputContainerStyle={style.searchInputContainer}
          inputStyle={style.searchInput}
          lightTheme
          clearIcon={{ name: 'x', type: 'feather', size: 28 }}
          onChangeText={this.search}
          value={this.state.search}
        />

        { this.state.overlay
          && <Target
            isVisible={this.state.overlay}
            onBackdropPress={() => this.setState({ overlay: false })}
            target={target}
          />
        }

      </View>
    )
  }
}

const style = StyleSheet.create({
  cluster: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: 'center',
    borderColor: colors.primary_light,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  searchContainer: {
    backgroundColor: 'transparent',
    width: '95%',
    position: 'absolute',
    top: 20,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  searchInputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height: 50,
    borderColor: colors.lightgray,
    borderBottomColor: colors.gray,
    borderWidth: 1,
    borderBottomWidth: 1,
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: 'black'
  }
})

const mapStateToProps = (state) => ({ targets: state.targets })

export default connect(
  mapStateToProps,
  { getAll }
)(MainMapScreen)
