import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { SearchBar, Text, Overlay } from 'react-native-elements'
import ClusteredMapView from 'react-native-maps-super-cluster'
import { Marker, Callout } from 'react-native-maps'
import colors from '../../styles/colors'
import decimalToDMS from '../../utils/coordinates'

import { getAll } from '../../reducers/targetReducer'
import Target from '../common/Target'

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
      query: '',
      target: null
    }
  }

  componentDidMount() {
    if (this.props.targets.length === 0) {
      this.loadTargets()
    }
  }

  loadTargets = async () => {
    await this.props.getAll()
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

  renderPinColor = (pin) => this.props.currentTarget && this.props.currentTarget._id === pin._id ? 'green' : 'red'

  renderMarker = (pin) => {
    const { _id, name, type } = pin
    const { location, ...rest } = pin

    return (
      <Marker
        identifier={`pin-${_id}`}
        key={_id}
        coordinate={location}
        pinColor={this.renderPinColor(rest)}
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
    const query = this.state.query.trim().toLowerCase()
    const { targets } = this.props

    return query ? targets.filter(t => t.name.toLowerCase().startsWith(query)) : targets
  }

  search = (query) => {
    const map = this.map.getMapRef()

    this.setState({ query }, () => {
      if (!query) {
        map.animateToRegion(this.state.initialRegion)
      } else if (this.filteredTargets().length > 0) {
        map.fitToCoordinates(this.filteredTargets().map(m => m.location))
      }
    })
  }

  render() {
    const { initialRegion, target, overlay, query } = this.state
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
          value={query}
        />

        { overlay
          && (
            <Overlay
              isVisible={this.state.overlay}
              onBackdropPress={() => this.setState({ overlay: false })}
              width='100%'
              height='auto'
              overlayStyle={style.overlay}
              animationType='fade'
            >
              <Target {...this.props} target={target} />
            </Overlay>
          )
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
  overlay: {
    position: 'absolute',
    bottom: 0
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

const mapStateToProps = (state) => ({
  currentTarget: state.ongoingEvent && state.ongoingEvent.target ? state.ongoingEvent.target : null,
  targets: state.targets
})

export default connect(
  mapStateToProps,
  { getAll }
)(MainMapScreen)
