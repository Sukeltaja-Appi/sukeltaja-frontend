import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Dimensions } from 'react-native'
import { SearchBar, Text } from 'react-native-elements'
import ClusteredMapView from 'react-native-maps-super-cluster'
import { Marker, Callout } from 'react-native-maps'
import { SafeAreaView } from 'react-native-safe-area-context'

import colors from '../../styles/colors'
import decimalToDMS from '../../utils/coordinates'
import { getAll } from '../../reducers/targetReducer'
import AppButton from '../common/AppButton'
import CustomMarker from './CustomMarker'
import { startEvent } from '../../reducers/eventReducer'

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
      query: '',
      customTarget: null,
      selectedTargetId: null,
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

  onMarkerPress = (event) => {
    this.setState({
      selectedTargetId: event.nativeEvent.id,
    })
  }

  onPress = event => {
    if (this.state.selectedTargetId) {
      return this.setState({
        customTarget: null,
        selectedTargetId: null,
      })
    }

    this.setState({
      customTarget: {
        _id: 'customLocation',
        name: 'Omavalintainen kohde',
        custom: true,
        ...event.nativeEvent.coordinate,
      },
      selectedTargetId: 'customLocation'
    })
  }

  async startEvent(target) {
    const { user, startEvent } = this.props
    const event = {
      title: user.username + ': sukellustapahtuma',
      dives: [],
      target: !target.custom ? target : undefined,
    }

    await startEvent(event)

    if (target.custom) {
      this.props.navigation.navigate('Event', {
        screen: 'TargetScreen',
        params: {
          screen: 'Target',
          params: {
            target: { ...target, name: undefined },
            custom: true
          }
        }
      })
    } else {
      this.props.navigation.navigate('Event')
    }
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
    if (pin.custom)
      return '#00A3FF'

    return this.props.currentTarget && this.props.currentTarget._id === pin._id ? 'green' : 'red'
  }

  renderMarker = (pin) => {
    const { _id, name, type, location } = pin
    const selectedTargetId = this.state.selectedTargetId

    return (
      <CustomMarker
        identifier={_id}
        key={_id}
        coordinate={location}
        pinColor={this.renderPinColor(pin)}
        calloutVisible={_id === selectedTargetId}
      >
        <Callout tooltip={true} onPress={() => this.startEvent(pin)}>
          <View style={style.callout}>
            <Text style={{ fontWeight: 'bold' }}>{name}</Text>
            {type && <Text>{type}</Text>}
            <Text>{`${decimalToDMS(location.latitude)} N`}</Text>
            <Text>{`${decimalToDMS(location.longitude)} E`}</Text>
            <AppButton title='Luo uusi tapahtuma'
              containerStyle={{ paddingVertical: 5, paddingHorizontal: 10, borderWidth: 2, marginTop: 10 }}
              textStyle={{ fontSize: 16 }}
            />
          </View>

        </Callout>
      </CustomMarker >
    )
  }

  render() {
    const { initialRegion, customTarget, query } = this.state
    const targets = this.filteredTargets()
    // Map needs coordinates in target.location
    const mapTarget = customTarget ? {
      ...customTarget,
      location: {
        longitude: customTarget.longitude,
        latitude: customTarget.latitude,
      }
    } : null

    targets.forEach(t => t.location = { longitude: t.longitude, latitude: t.latitude })

    if (mapTarget)
      targets.push(mapTarget)

    return (
      <View style={style.container}>
        <ClusteredMapView
          ref={(r) => { this.map = r }}
          maxZoom={12}
          mapPadding={{ top: 100, left: 50, right: 50 }}
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
          />
        </SafeAreaView>
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
    // Probably does not work correctly if we decide to support landscape mode
    // eslint-disable-next-line no-magic-numbers
    width: Dimensions.get('window').width * 0.95,
    position: 'relative',
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
  },
  callout: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#BABABA',
    backgroundColor: '#fff',
    padding: 5,
  }
})

const mapStateToProps = (state) => ({
  currentTarget: state.ongoingEvent && state.ongoingEvent.target ? state.ongoingEvent.target : null,
  targets: state.targets,
  user: state.user
})

export default connect(
  mapStateToProps,
  { getAll, startEvent }
)(MainMapScreen)
