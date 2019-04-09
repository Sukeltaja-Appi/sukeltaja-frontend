import React from 'react'
import { View, FlatList } from 'react-native'
import { Text, Button, CheckBox } from 'react-native-elements'
import { Duration } from 'luxon'
import { connect } from 'react-redux'

import styles from '../../styles/global'
import colors from '../../styles/colors'

import locationService from '../../services/location'
import { startDive, endDive } from '../../reducers/diveReducer'
import { getOngoingEvent } from '../../reducers/eventReducer'
import { eventToID } from '../../utils/eventHandler'

const style = {
  buttonEndDive: {
    ...styles.roundButton,
    backgroundColor: colors.red
  },
  buttonDive: {
    ...styles.roundButton,
    backgroundColor: colors.green
  },
  counter: {
    marginTop: 50,
    backgroundColor: colors.secondary,
    color: 'white',
    paddingVertical: 21,
    flexGrow: 1,
    textAlign: 'center'
  },
  list: {
    flex: 1,
    backgroundColor: colors.background,
  },
  top: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 10
  },
  listText: {
    fontSize: 20
  }
}

const magic1 = 0.0
const magic2 = 0.0

class DiveScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 0,
      ongoing: false,
      selectedUsers: []
    }
    this.showList = this.showList.bind(this)
  }

  counterUpdate = () => {
    const { ongoing, selectedUsers } = this.state

    if(!ongoing) this.setState({ counter: this.state.counter + 1, ongoing, selectedUsers })
  }

  componentDidMount() {
    this.interval = setInterval(() => this.counterUpdate(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  diveButton = async () => {
    let { ongoingEvent, startDive, getOngoingEvent, user } = this.props

    let dive = {
      event: eventToID(ongoingEvent),
      user: user._id,
      startdate: new Date(),
      latitude: magic1, // + Math.random(),
      longitude: magic2// + Math.random()
    }

    try {
      const location = await locationService.getLocationAsync()

      dive.latitude = location.coords.latitude
      dive.longitude = location.coords.longitude
    } catch(err) { console.log('Geolocation unavailable.') }

    await startDive(dive)
    await getOngoingEvent(ongoingEvent)

    this.setState({ counter: 0, ongoing: true, selectedUsers: this.state.selectedUsers })
  }

  endButton = async () => {
    const { endDive, ongoingEvent, ongoingDive } = this.props

    ongoingDive.enddate = new Date()
    ongoingDive.event = ongoingEvent._id
    ongoingEvent.dives = [ ...ongoingEvent.dives, ongoingDive._id ]
    endDive(ongoingDive)

    this.state.ongoing = false
    this.render()
  }

  duration = () => Duration.fromMillis(this.state.counter * 1000).toFormat('hh:mm:ss')

  toggleUserSelection = (user) => {
    const { counter, ongoing, selectedUsers } = this.state

    if(ongoing){
      if (!selectedUsers.includes(user)) {
        this.setState({ counter, ongoing, selectedUsers: [...selectedUsers, user] })
      } else {
        this.setState({ counter, ongoing, selectedUsers: selectedUsers.filter(u => u._id !== user._id) })
      }
    }
  }

  userIsDiving = (user) => {
    const { selectedUsers, ongoing } = this.state

    if(selectedUsers.includes(user) && ongoing) return true

    //const { dives } = this.props.ongoingEvent

    //if (dives.map(d => d.user).includes(user)) return true

    return false
  }

  setUserColor = (user) => {
    if (this.userIsDiving(user)) return { backgroundColor: colors.lightBlue }

    return {}
  }

  renderListItem = (user) => {
    const { selectedUsers } = this.state

    console.log('selectedUsers----------------->', selectedUsers)
    console.log('user-------------------------->', user)

    return (
      <CheckBox
        title={user.username}
        onPress={() => this.toggleUserSelection(user)}
        checked={selectedUsers.includes(user)}
        containerStyle={this.setUserColor(user)}
      />
    )
  }

  showList = (participantList) => {
    if (participantList.length === 0) {
      return (
        <View style={styles.centered}>
          <Text style={styles.h5}>Ei osallistujia.</Text>
        </View>
      )
    } else {
      return (
        <View style={style.top}>
          <FlatList
            data={participantList}
            renderItem={({ item }) => this.renderListItem(item) }
            keyExtractor={item => item._id}
            extraData={this.state}
          />
        </View>
      )
    }
  }

  render() {
    const { creator, admins, participants } = this.props.ongoingEvent
    const participantList = [ creator, ...admins, ...participants ]
    const { ongoing } = this.state

    if(!ongoing) {
      return (
        <View style={styles.centered}>

          <Text style={style.listText}>Valitse sukeltajat:</Text>

          {this.showList(participantList)}

          <Text style={{ fontSize: 20 }}>Aloita sukellus</Text>

          <View style={styles.bottom}>
            <Button title='Sukella' onPress={this.diveButton} buttonStyle={style.buttonDive} raised />
          </View>

        </View>
      )

    } else {
      return (
        <View style={styles.centered}>

          <Text style={{ fontSize: 20 }}>Valitut sukeltajat:</Text>

          {this.showList(participantList)}

          <Text style={{ fontSize: 20 }}>Sukellus käynnissä</Text>

          <View style={styles.row}>
            <Text h1 style={style.counter}>{this.duration()}</Text>
          </View>

          <View style={styles.bottom}>
            <Button title='Lopeta' onPress={this.endButton} buttonStyle={style.buttonEndDive} raised />
          </View>

        </View>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  ongoingDive: state.ongoingDive,
  ongoingEvent: state.ongoingEvent,
  user: state.user
})

export default connect(
  mapStateToProps,
  { endDive, startDive, getOngoingEvent }
)(DiveScreen)
