import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { ListItem, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import styles from '../../../styles/global'
import colors from '../../../styles/colors'
import locationService from '../../../services/location'
import { getAll } from '../../../reducers/targetReducer'
import haversine from '../../../utils/haversine'
import Target from '../../common/Target'

const style = {
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
}

class TargetScreen extends React.Component {
  componentDidMount() {
    this.loadTargets()
  }

  loadTargets = async () => {
    if (this.props.targets.length === 0) {
      await this.props.getAll()
    }
  }

  render() {
    const { currentTarget } = this.props

    return currentTarget
      ? <Target {...this.props} target={currentTarget} />
      : <ClosestTargets {...this.props} />
  }
}

class ClosestTargets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      closestTargets: []
    }
  }

  formattedDistance = (distance) => distance > 1000 ? `${(distance / 1000).toFixed(1)} km` : `${distance} m`

  updateLocation = async () => {
    const location = await locationService.getLocationAsync()

    return location ? location.coords : null
  }

  getClosestTargets = async (amount) => {
    const { targets } = this.props
    const userLocation = await this.updateLocation()

    if (!userLocation) return

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
    const numberOfTargets = 10

    return (
      <View style={styles.noPadding}>
        <Button
          title='Valitse kohde kartalta'
          onPress={() => this.props.navigation.navigate('CustomTargetScreen')}
        />
        <Button
          title='Päivitä lähimmät kohteet'
          onPress={() => this.getClosestTargets(numberOfTargets)}
          buttonStyle={{ backgroundColor: colors.success }}
        />
        <FlatList
          data={this.state.closestTargets}
          renderItem={({ item }) => {
            const { name, distance } = item

            return (
              <ListItem
                onPress={() => this.navigate('Target', item)}
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title>
                    <Text style={style.title}>{name}</Text>
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    {`Etäisyys: ${this.formattedDistance(distance)}`}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            )
          }
          }
          keyExtractor={item => item._id}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  currentTarget: state.ongoingEvent && state.ongoingEvent.target ? state.ongoingEvent.target : null,
  targets: state.targets
})

export default connect(
  mapStateToProps,
  { getAll }
)(TargetScreen)
