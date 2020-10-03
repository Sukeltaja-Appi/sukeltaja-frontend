import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Image } from 'react-native'
import { Text, Overlay, Button } from 'react-native-elements'
import ClusteredMapView from 'react-native-maps-super-cluster'
import { Marker, Callout } from 'react-native-maps'
import colors from '../../../styles/colors'
import decimalToDMS from '../../../utils/coordinates'
import { paddingSides } from '../../../styles/global'

import { getAll } from '../../../reducers/targetReducer'
import Target from '../../common/Target'

class CustomTargetScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      initialRegion: {
        latitude: 65.5,
        longitude: 26.5,
        latitudeDelta: 0,
        longitudeDelta: 0.6
      },
      query: '',
      target: null,
    }
  }

  onPress = evt => {
    const coord = evt.nativeEvent.coordinate;

    console.log(coord)

    this.setState({
      target: { ...coord }
    })
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

  selectTarget = () => {
    this.navigate('Target', this.state.target)
  }

  render() {
    const { initialRegion, target, overlay, query } = this.state

    // Map needs coordinates in target.location
    const mapTarget = target ? {
      ...this.state.target,
      location: {
        longitude: this.state.target.longitude,
        latitude: this.state.target.latitude,
      }
    } : null;

    return (
      <View style={style.container}>
          <View style={style.mapContainer}>
            <ClusteredMapView
              style={{ width: 10, height: 10 }}
              ref={(r) => { this.map = r }}
              maxZoom={12}
              mapPadding={{ bottom: 10, left: 68, right: 50 }}
              radius={42}
              data={mapTarget ? [mapTarget] : []}
              initialRegion={initialRegion}
              onMarkerPress={this.onMarkerPress}
              renderMarker={this.renderMarker}
              renderCluster={this.renderCluster}
              showsUserLocation={true}
              userLocationAnnotationTitle=''
              onPress={this.onPress}
              width={360}
              height={450}
            />
          </View>
        <View style={style.bottom}>
          <Button
            buttonStyle={style.button}
            title='Seuraava'
            onPress={() => this.selectTarget()}
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
  },
  button: {
    marginBottom: 10,
    marginHorizontal: 60,
    backgroundColor: '#00A3FF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderColor: '#118BFC',
    borderWidth: 3,
    borderRadius: 40,
  },
  mapContainer: {
    top: '6%',
    overflow: 'hidden',
    borderRadius: 10,
    borderColor: '#118BFC',
    borderWidth: 3
  }
})

const mapStateToProps = (state) => ({
  currentTarget: state.ongoingEvent && state.ongoingEvent.target ? state.ongoingEvent.target : null,
  targets: state.targets,
})

export default connect(
  mapStateToProps,
  { getAll }
)(CustomTargetScreen)
