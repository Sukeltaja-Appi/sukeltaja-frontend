import React from 'react'
import { KYPPI_URL } from 'react-native-dotenv'
import { View, Text, FlatList, Linking } from 'react-native'
import { ListItem, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import styles from '../../styles/global'
import colors from '../../styles/colors'
import locationService from '../../services/location'
import { getAll, resetTargets } from '../../reducers/targetReducer'
import haversine from '../../utils/haversine'

const style = {
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
}

class TargetScreen extends React.Component {
  componentDidMount() {
    this.updateLocation()
    this.loadTargets()
  }

  loadTargets = async () => {
    await this.props.getAll()
  }

  formattedDistance = (distance) => distance > 1000 ? `${(distance/1000).toFixed(1)} km` : `${distance} m`

  updateLocation = async () => {
    const location = await locationService.getLocationAsync()

    return location.coords
  }

  render() {
    return this.props.currentTarget
      ? (
        <SelectedTarget
          {...this.props}
          updateLocation={this.updateLocation}
          formattedDistance={this.formattedDistance}
        />)
      : (
        <ClosestTargets
          {...this.props}
          updateLocation={this.updateLocation}
          formattedDistance={this.formattedDistance}
        />)
  }
}

class ClosestTargets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      closestTargets: []
    }
  }

  getClosestTargets = async (amount) => {
    const { targets, updateLocation } = this.props
    const userLocation = await updateLocation()

    targets.map(t => {
      const targetLocation = { longitude: t.longitude, latitude: t.latitude }

      t.distance = haversine(targetLocation, userLocation)
    })

    const sorted = targets.sort((a, b) => a.distance - b.distance)

    const closestTargets = sorted.slice(0, amount)

    this.setState({ closestTargets })
  }

  navigate = (value, target) => this.props.navigation.navigate(value, { target })

  render() {
    const { formattedDistance } = this.props

    return (
      <View style={styles.noPadding}>
        <Button
          title='Päivitä lähimmät kohteet'
          onPress={() => this.getClosestTargets(10)}
          buttonStyle={{ backgroundColor: colors.success }}
        />

        <FlatList
          data={this.state.closestTargets}
          renderItem={({ item }) => {
            const { name, distance } = item

            return (
              <ListItem
                title={<Text style={style.title}>{name}</Text>}
                subtitle={`Etäisyys: ${formattedDistance(distance)}`}
                onPress={() => this.navigate('SingleTargetScreen', item)}
                rightIcon={{ type: 'feather', name: 'chevron-right' }}
                bottomDivider
              />
            )}
          }
          keyExtractor={item => item._id}
        />
      </View>
    )
  }
}

class SelectedTarget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      distance: null
    }
  }

  componentDidMount() {
    this.getDistance()
  }

  getDistance = async () => {
    const { currentTarget, updateLocation } = this.props
    const { latitude, longitude } = currentTarget
    const userLocation = await updateLocation()

    const distance = haversine({ latitude, longitude }, userLocation)

    this.setState({ distance })
  }

  render() {
    const { formattedDistance, currentTarget } = this.props
    const { name, type, material, mj_id } = currentTarget
    const { distance } = this.state

    return (
      <View style={styles.noPadding}>
        <View style={style.container}>

          <Text style={style.title}>{name}</Text>
          <Text style={style.text}>Etäisyys kohteeseen: {formattedDistance(distance)}</Text>
          <Text style={style.text}>Kohteen tyyppi: {type}</Text>
          <Text style={style.text}>Kohteen materiaali: {material}</Text>
          <Button
            title='MJ-rekisteri'
            onPress={() => { Linking.openURL(`${KYPPI_URL}${mj_id}`) }}
            buttonStyle={{ marginTop: 8 }}
          />

          <Button
            title='Poista kohteen valinta'
            onPress={() => console.log('poistetaan valinta')}
            buttonStyle={{ backgroundColor: colors.warning, marginTop: 8 }}
          />

        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  currentTarget: state.ongoingEvent && state.ongoingEvent.target ? state.ongoingEvent.target : null,
  targets: state.targets,
  closestTargets: state.closestTargets
})

export default connect(
  mapStateToProps,
  { getAll, resetTargets }
)(TargetScreen)
