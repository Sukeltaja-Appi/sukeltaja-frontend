import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import ClusteredMapView from 'react-native-maps-super-cluster'
import { Marker, Callout } from 'react-native-maps'
import colors from '../../../styles/colors'
import decimalToDMS from '../../../utils/coordinates'
import { paddingSides } from '../../../styles/global'
import AppButton from '../../common/AppButton'

import { getAll } from '../../../reducers/targetReducer'
import { createEvent } from '../../../reducers/eventReducer'

class CustomTargetScreen extends React.Component {

  constructor(props) {
    super(props)
    const target = this.props.route.params.target
    const setTarget = props.route.params.setTarget
    const setNavFromCustomMap = props.route.params.setNavFromCustomMap

    this.state = {
      setTarget,
      setNavFromCustomMap,
      initialRegion: {
        latitude: 63.5,
        longitude: 26.5,
        latitudeDelta: 12,
        longitudeDelta: 12
      },
      query: '',
      target: target
    }
  }

  onPress = evt => {
    const coord = evt.nativeEvent.coordinate

    this.setState({
      target: { ...this.state.target, ...coord, location: { ...coord } }
    })
  }

  componentDidMount() {
    if (this.state.target !== 'undefined') {
      this.renderMarker(this.state.target)
    }
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
        key={_id || 'customLocation'}
        coordinate={location}
        pinColor={this.renderPinColor(rest)}
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

  navigate = (value, target) => this.props.navigation.navigate(value, { target, custom: true })

  selectTarget = async () => {
    if (this.state.target !== 'undefined') {
      this.state.setTarget(this.state.target)
      this.state.setNavFromCustomMap(true)
    }
    this.props.navigation.goBack()}

  render() {
    const { initialRegion, target } = this.state

    // Map needs coordinates in target.location
    const mapTarget = target ? {
      ...this.state.target,
      location: {
        longitude: this.state.target.longitude,
        latitude: this.state.target.latitude,
      }
    } : null

    return (
      <View style={style.container}>
        <ClusteredMapView
          style={style.map}
          ref={(r) => { this.map = r }}
          maxZoom={12}
          mapPadding={{ bottom: 160, left: 68, right: 50 }}
          radius={42}
          data={mapTarget ? [mapTarget] : []}
          initialRegion={initialRegion}
          onMarkerPress={this.onMarkerPress}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster}
          showsUserLocation={true}
          userLocationAnnotationTitle=''
          onPress={this.onPress}
        />
        <View style={style.bottom}>
          <AppButton
            buttonStyle={style.button}
            title='Valitse kohde'
            onPress={() => this.selectTarget()}
            containerStyle={{
              paddingVertical: 20,
              paddingHorizontal: 15,
              marginTop: 10,
              marginRight: 40,
              marginLeft: 40
            }}
          />
        </View>
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
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    height: 50,
    width: 50
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    padding: paddingSides
  }
})

const mapStateToProps = (state) => ({
  currentTarget: state.ongoingEvent && state.ongoingEvent.target ? state.ongoingEvent.target : null,
  targets: state.targets
})

export default connect(
  mapStateToProps,
  { getAll, createEvent }
)(CustomTargetScreen)
