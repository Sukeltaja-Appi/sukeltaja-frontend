import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import styles from '../../styles/global'
import colors from '../../styles/colors'
import locationService from '../../services/location'

const style = {
  buttonEnd: {
    ...styles.roundButton,
    backgroundColor: colors.red,
  },
  buttonInvite: {
    backgroundColor: colors.green
  },
  main: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50,
  },
  list: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
    alignItems: 'center'
  }
}

Number.prototype.toRad = function () {
  return this * Math.PI / 180;
}





class TargetScreen extends React.Component {
  constructor(props) {
    super(props)
    this.renderListItem = this.renderListItem.bind(this)
    this.state = {
      location: {
        coords: {
          latitude: 24.00,
          longitude: 55.55
        }
      }
    }
  }

  navigate = (value, target) => this.props.navigation.navigate(value, { target })

  getDistance = (lat1, lon1) => {
    const location = this.state.location
    const lat2 = location.coords.latitude
    const lon2 = location.coords.longitude
    var R = 6371; // km 
    var x1 = lat2 - lat1
    var dLat = x1.toRad()
    var x2 = lon2 - lon1
    var dLon = x2.toRad()
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c

    console.log(typeof d + ": distance funktiossa")

    return d * 1000
  }

  updateLocation = async () => {
    this.state.location = await locationService.getLocationAsync()
  }

  componentDidMount() {
    this.updateLocation()
  }

  renderListItem = (item) => {
    console.log("Renderöinti")
    const distance = this.getDistance(item.latitude, item.longitude)
    console.log(this.getDistance(item.latitude, item.longitude))

    return (
      <ListItem
        title={item.name}
        subtitle={`${distance.toFixed(2)} metriä`}
        onPress={() => this.navigate("SingleTargetScreen", item)}
        bottomDivider
      />
    )
  }

  render() {
    const { selectedTargets } = this.props

    console.log(typeof test)

    let target = null
    let length = selectedTargets.length
    if (length > 0) target = selectedTargets[length - 1]

    let targetName = 'No target selected'
    if (target !== null) targetName = target.name

    return (
      <View style={style.list}>
        <FlatList
          data={selectedTargets}
          renderItem={({ item }) =>
            this.renderListItem(item)
          }
          keyExtractor={item => item.id}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedTargets: state.selectedTargets
})

export default connect(
  mapStateToProps,
  null
)(TargetScreen)
