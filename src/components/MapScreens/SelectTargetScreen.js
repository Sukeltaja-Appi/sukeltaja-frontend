import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Dimensions } from 'react-native'
import { SearchBar, Text, Overlay } from 'react-native-elements'
import ClusteredMapView from 'react-native-maps-super-cluster'
import { Marker } from 'react-native-maps'
import { SafeAreaView } from 'react-native-safe-area-context'

import colors from '../../styles/colors'
import { getAll } from '../../reducers/targetReducer'
import Target from './Target'
import CustomTarget from './CustomTarget'

class SelectTargetScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialRegion: {
        latitude: 64.5,
        longitude: 26,
        latitudeDelta: 12,
        longitudeDelta: 12
      },
      query: '',
      customTarget: null,
      target: null,
      previousTarget: this.props.route?.params?.previousTarget
    }
    this.searchInputRef = null
  }

  componentDidMount() {
    if (this.props.targets.length === 0) {
      this.loadTargets()
    }
  }

  loadTargets = async () => {
    await this.props.getAll()
  }

  onMarkerPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate
    const target = this.props.targets.find(
      m => m.latitude === latitude && m.longitude === longitude
    )

    if (target) {
      this.setState({ target })
    } else if (event.nativeEvent.id === this.state.previousTarget?._id) {
      this.setState({ target: this.state.previousTarget })
    } else if (event.nativeEvent.id === 'customLocation') {
      this.setState({ target: this.state.customTarget })
    }
  }

  onPress = event => {
    this.searchInputRef.blur()
    if (this.state.target) {
      return this.setState({
        customTarget: null,
        target: null,
      })
    }
    const customTarget = {
      _id: 'customLocation',
      name: 'Omavalintainen kohde',
      custom: true,
      ...event.nativeEvent.coordinate,
    }

    this.setState({
      customTarget,
      target: customTarget,
    })
  }

  filteredTargets = () => {
    const query = this.state.query.trim().toLowerCase()
    const { targets } = this.props

    return query ? targets.filter(t => t.name.toLowerCase().startsWith(query)) : [...targets]
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

  renderPinColor = (pin) => {
    if (pin._id === this.state.target?._id || pin._id === this.state.previousTarget?._id)
      return 'green'

    return pin.custom ? '#00A3FF' : 'red'
  }

  renderMarker = (pin) => {
    const { _id, name, type, location } = pin

    return (
      <Marker
        identifier={_id}
        key={`${_id}-${this.state.target?._id === _id}`}
        coordinate={location}
        pinColor={this.renderPinColor(pin)}
      />
    )
  }

  render() {
    const { initialRegion, customTarget, query, target, previousTarget } = this.state
    const targets = this.filteredTargets()
    // Map needs coordinates in target.location
    const customMapTarget = customTarget ? {
      ...customTarget,
      location: {
        longitude: customTarget.longitude,
        latitude: customTarget.latitude,
      }
    } : null

    // Map supports targetSelected either as prop or route param. Maybe a bit ugly.
    const targetSelected = this.props.targetSelected || this.props.route.params.targetSelected

    if (customMapTarget)
      targets.push(customMapTarget)
    if (previousTarget && !targets.some(t => t._id === previousTarget._id))
      targets.push(previousTarget)
    targets.forEach(t => t.location = { longitude: t.longitude, latitude: t.latitude })

    return (
      <Fragment>
        <View style={style.container}>
          <ClusteredMapView
            ref={(r) => { this.map = r }}
            maxZoom={12}
            mapPadding={{ top: 100, left: 50, right: 10 }}
            style={style.map}
            radius={42}
            data={targets}
            initialRegion={initialRegion}
            renderMarker={this.renderMarker}
            renderCluster={this.renderCluster}
            showsUserLocation={true}
            userLocationAnnotationTitle=''
            onPress={this.onPress}
            onMarkerPress={this.onMarkerPress}
            // Without this, there will be empty space at the bottom equal to the
            // size of the native status bar. This emtpy space is not visible when
            // bottom nav bar hides it.
            height={Dimensions.get('screen').height}
          />
          <SafeAreaView>
            <SearchBar
              placeholder='Etsi kohde'
              containerStyle={style.searchContainer}
              inputContainerStyle={style.searchInputContainer}
              inputStyle={style.searchInput}
              lightTheme
              clearIcon={{ name: 'x', type: 'feather', size: 28 }}
              onChangeText={this.search}
              value={query}
              ref={(val) => this.searchInputRef = val}
            />
          </SafeAreaView>
        </View>
        {target && (
          <View>
            { /* when statusBarTranslucent is true, overlay is not pushed up when keyboard is visible
               * and when statusBarTranslucent, overlay doesn't dim status bar area of the map. For this
               * reason we use separate overlay for the backdrop.
               */
            }
            <Overlay
              statusBarTranslucent
              overlayStyle={style.backdropOverlay}
              animationType='fade'
              isVisible
            >
              {/* children is required property so this can't be empty */}
              <Fragment />
            </Overlay>
            <Overlay
              onBackdropPress={() => this.setState({ target: null })}
              overlayStyle={style.overlay}
              // Hide backdrop, backdrop is done with separate overlay
              backdropStyle={{ backgroundColor: 'none' }}
              animationType='fade'
              isVisible
            >
              {target.custom ?
                <CustomTarget {...this.props} target={target} targetSelected={targetSelected} /> :
                <Target {...this.props} target={target} targetSelected={targetSelected} />
              }
            </Overlay>
          </View>
        )}
      </Fragment >
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
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 10,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    // Probably does not work correctly if we decide to support landscape mode
    // eslint-disable-next-line no-magic-numbers
    width: Dimensions.get('window').width * 0.95,
    position: 'relative',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    zIndex: 999,
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
  },
  callout: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#BABABA',
    backgroundColor: '#fff',
    padding: 5,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    padding: 0,
    width: '100%',
  },
  backdropOverlay: {
    display: 'none',
  }
})

const mapStateToProps = (state) => ({
  currentTarget: state.ongoingEvent && state.ongoingEvent.target ? state.ongoingEvent.target : null,
  targets: state.targets,
  user: state.user
})

export default connect(
  mapStateToProps,
  { getAll }
)(SelectTargetScreen)
