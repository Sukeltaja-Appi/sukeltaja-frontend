import React from 'react'
import { View } from 'react-native'
import { Text, Divider, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'

import styles, { paddingSides } from '../../../styles/global'
import { formatDate } from '../../../utils/dates'
import colors from '../../../styles/colors'
import { setOngoingEvent } from '../../../reducers/eventReducer'
import { deleteDive } from '../../../reducers/diveReducer'
import { TouchableOpacity } from 'react-native-gesture-handler'

const style = {
  container: {
    paddingHorizontal: paddingSides,
    paddingVertical: 25,
    backgroundColor: 'white'
  },
  iconContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#379EFE',
    alignItems: 'center',
    flexBasis: 100,
    flexGrow: 0,
    alignSelf: 'stretch',
  },
  title: {
    fontFamily: 'nunito-bold',
    color: '#379EFE',
    fontSize: 16,
    paddingRight: 20,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'nunito-bold',
    marginLeft: 5,
  },
  divider: {
    marginVertical: 30
  },
  text: {
    fontSize: 16,
    marginLeft: 5
  },
  flexRowCenter: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  }
}

const n6 = 6
const n60 = 60
const n1000 = 1000

class DiveScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  lengthOfDive = (startTime, endTime) => {

    if (endTime === null) {
      return null
    }

    const diff = new Date(endTime) - new Date(startTime)
    const minutes = Math.round((diff / n1000) / n60)

    return minutes
  }

  nameOfEvent = (eventId) => {
    const { events } = this.props
    const event = events.find(e => e.dives.some(item => item._id === eventId))

    if (event === undefined) {
      return
    }

    return event.title
  }

  targetOfEvent = (eventId) => {
    const { events } = this.props
    const event = events.find(e => e.dives.some(item => item._id === eventId))

    if (event === undefined) {
      return
    }

    if (event.target === undefined) {
      return 'Oma kohde: nimetön'
    }

    if (event.target.type === undefined) {
      return 'Oma kohde: ' + event.target.name
    }
    const targetName = event.target.name + '/' + event.target.type

    return targetName

  }

  navigate = (value) => this.props.navigation.navigate(value)

  navigateToEvent = (id) => {
    const { events } = this.props
    const event = events.find(e => e.dives.some(item => item._id === id))

    this.props.setOngoingEvent(event)
    this.props.navigation.navigate('Tapahtumat')
    this.props.navigation.navigate('Tapahtuma', { event })
  }

  navigateToEdit = (dive, id) => {
    const { events } = this.props
    const event = events.find(e => e.dives.some(item => item._id === id))

    this.props.navigation.navigate('DiveForm', {
      item: dive,
      ongoingEvent: event,
      diveHistory: true
    })
  }

  navigateToDiveHistory = () => {
    this.props.navigation.navigate('Profiili')
  }

  navigateToRemove = async (dive) => {
    const { user, deleteDive } = this.props

    await deleteDive(dive, user._id)
    this.navigateToDiveHistory()
  }

  Dive = () => {
    const dive = this.props.route.params.dive
    const { startdate, enddate, latitude, longitude, _id } = dive
    const eventName = this.nameOfEvent(_id)

    return (
      <View style={style.noPadding}>
        <View style={style.container}>
          <View style={{ ...styles.row, alignItems: 'center' }}>
            <View style={style.iconContaineritem}>
              <FontAwesome5 name='water' size={36} color={'#118BFC'} />
            </View>
            <View style={style.container}>
              <Text style={style.title}>
                {this.targetOfEvent(_id) + ',\n'}{formatDate(startdate)}
              </Text>
            </View>
          </View>
          <Divider style={style.divider} />
          <View style={{ flexDirection: 'row', marginTop: 0 }}>
            <MaterialIcons name='schedule' size={20} color={colors.primary} />
            <Text style={style.text}>
              Kesto: {this.lengthOfDive(startdate, enddate)} min
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <MaterialIcons name='room' size={20} color={colors.primary} />
            <Text style={style.text}>
              L: {parseFloat(latitude).toFixed(n6)}; P: {parseFloat(longitude).toFixed(n6)}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <MaterialIcons name='date-range' size={20} color={colors.primary} />
            <Text style={style.text}> {eventName} </Text>
          </View>
          <Divider style={style.divider} />
          <TouchableOpacity style={{ flexDirection: 'row', marginTop: 0, alignItems: 'center' }}
            onPress={() => this.navigateToEdit(dive, _id)}
          >
            <Icon
              name='edit'
              type='feather'
              size={40}
              color={colors.gray}
            />
            <Text style={style.text}>Muokkaa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}
            onPress={() => this.navigateToRemove(dive)}
          >
            <Icon
              name='trash'
              type='feather'
              size={40}
              color={colors.gray}
            />
            <Text style={style.text}>Poista</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}
            onPress={() => this.navigateToEvent(_id)}
          >
            <MaterialIcons
              name='date-range'
              type='feather'
              size={40}
              color={colors.gray}
            />
            <Text style={style.text}>Sukellustapahtumaan</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  render() {
    return this.Dive()
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  events: state.events,
  ongoingEvent: state.ongoingEvent
})

export default connect(
  mapStateToProps,
  { setOngoingEvent, deleteDive }
)(DiveScreen)