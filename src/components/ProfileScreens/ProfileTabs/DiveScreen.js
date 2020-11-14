import React from 'react'
import { View } from 'react-native'
import { Text, Divider } from 'react-native-elements'
import { connect } from 'react-redux'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'

import styles, { paddingSides } from '../../../styles/global'
import { formatDate } from '../../../utils/dates'
import colors from '../../../styles/colors'
import CommonButton from '../../common/AppButton'
import AppButton from '../../common/AppButton'
import { setOngoingEvent } from '../../../reducers/eventReducer'

const style = {
  container: {
    paddingHorizontal: paddingSides,
    paddingVertical: 20,
    backgroundColor: 'white'
  },
  iconContainer: {
    flex: 1.25,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#379EFE',
    alignItems: 'center',
    height: 100,
  },
  title: {
    fontSize: 20,
    fontFamily: 'nunito-bold',
    marginLeft: 10,
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
  }
}

const n6 = 6

class DiveScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  lengthOfDive = (startTime, endTime) => {
    const diff = new Date(endTime) - new Date(startTime)
    const minutes = Math.round((diff/1000)/60)

    return minutes
  }

  nameOfEvent = (eventId) => {
    const { events } = this.props
    const event = events.find(e => e._id === eventId)

    return event.title
  }

  targetOfEvent = (eventId) => {
    const { events } = this.props
    const event = events.find(e => e._id === eventId)

    if (event.target===undefined) {
      return 'Oma kohde: nimetön'
    }

    if (event.target.type===undefined) {
      return 'Oma kohde: ' + event.target.name
    }
    const targetName = event.target.name + '/' + event.target.type

    return targetName
  }

  navigate = (value) => this.props.navigation.navigate(value)

  navigateToEvent = (event) => {
    const item = this.props.events.find(e => e._id === event)

    //setOngoingEvent(item)

    //this.props.navigation.navigate('Kutsut', { event })
    console.log(item)
  }

  Dive = () => {
    const dive = this.props.route.params.dive
    const { startdate, enddate, event, latitude, longitude } = dive
    const eventName = this.nameOfEvent(event)

    return (
      <View style={style.noPadding}>
        <View style={style.container}>
          <View style={styles.row}>
            <View style={style.iconContainer}>
              <FontAwesome5 name='water' size={36} color={'#fff'} />
            </View>
            <View style={style.container}>
              <Text style={style.title}>
                {this.targetOfEvent(event)}, {formatDate(startdate)}
              </Text>
            </View>
          </View>
          <Divider style={style.divider} />
          <View style={{ flexDirection: 'row', marginTop: 0 }}>
            <MaterialIcons name='schedule' size={20} color={colors.secondary}/>
            <Text style={style.text}>
              Kesto: {this.lengthOfDive(startdate, enddate)} min
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <MaterialIcons name='room' size={20} color={colors.secondary}/>
            <Text style={style.text}>
              L: {parseFloat(latitude).toFixed(n6)}; P: {parseFloat(longitude).toFixed(n6)}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <MaterialIcons name='date-range' size={20} color={colors.secondary}/>
            <Text style={style.text}> {eventName} </Text>
          </View>
          <Divider style={style.divider} />
          <AppButton
            title= {eventName}
            onPress={() => this.navigateToEvent(event)}
          />
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
  { }
)(DiveScreen)