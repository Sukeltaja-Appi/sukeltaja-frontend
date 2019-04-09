import React from 'react'
import { View, FlatList } from 'react-native'
import { Text, Button, CheckBox } from 'react-native-elements'
import { Duration } from 'luxon'
import { connect } from 'react-redux'

import styles from '../../styles/global'
import colors from '../../styles/colors'

import locationService from '../../services/location'
import { startDives, endDives } from '../../reducers/diveReducer'
import { getOngoingEvent } from '../../reducers/eventReducer'
import { eventToID } from '../../utils/eventHandler'

const style = {
  buttonEndDives: {
    backgroundColor: colors.red
  },
  buttonDive: {
    backgroundColor: colors.green
  },
  counter: {
    backgroundColor: colors.secondary,
    color: 'white',
    textAlign: 'center'
  },
  list: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listText: {
    fontSize: 20
  },
  main: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 10,
  },
  divider: {
    height: 10
  },
  buttonGreen: {
    backgroundColor: colors.green,
  },
  top: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 10
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20
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
    const { counter, ongoing, selectedUsers } = this.state

    if(ongoing) this.setState({ counter: counter + 1, ongoing, selectedUsers })
  }

  componentDidMount() {
    this.interval = setInterval(() => this.counterUpdate(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  diveButton = async () => {
    let { ongoingEvent, startDives, getOngoingEvent, user } = this.props
    const { selectedUsers } = this.state

    let latitude = magic1 // + Math.random()
    let longitude = magic2 // + Math.random()

    try {
      const location = await locationService.getLocationAsync()

      latitude = location.coords.latitude
      longitude = location.coords.longitude
    } catch(err) { console.log('Geolocation unavailable.') }

    const event = eventToID(ongoingEvent)
    const startdate = new Date()

    let dives = []

    selectedUsers.forEach(u => {
      dives.push({
        event,
        startdate,
        user: u._id,
        latitude,
        longitude
      })
    })

    await startDives(dives, user._id)
    await getOngoingEvent(ongoingEvent)

    this.setState({ counter: 0, ongoing: true, selectedUsers })
  }

  endButton = async () => {
    let { endDives, ongoingDives, user } = this.props

    endDives(ongoingDives, user._id)

    this.setState({ counter: this.state.counter, ongoing: false, selectedUsers: [] })
  }

  duration = () => Duration.fromMillis(this.state.counter * 1000).toFormat('hh:mm:ss')

  toggleUserSelection = (user) => {
    const { counter, ongoing, selectedUsers } = this.state

    if(!ongoing){
      if (!selectedUsers.includes(user)) {
        this.setState({ counter, ongoing, selectedUsers: [...selectedUsers, user] })
      } else {
        this.setState({ counter, ongoing, selectedUsers: selectedUsers.filter(u => u._id !== user._id) })
      }
    }
  }

  userIsDiving = (user) => {
    const { selectedUsers, ongoing } = this.state

    if(selectedUsers.map(u => u._id).includes(user._id) && ongoing) return true

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

    return (
      <CheckBox
        title={user.username}
        onPress={() => this.toggleUserSelection(user)}
        checked={selectedUsers.map(u => u._id).includes(user._id)}
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
        <FlatList
          data={participantList}
          renderItem={({ item }) => this.renderListItem(item) }
          keyExtractor={item => item._id}
          extraData={this.state}
        />
      )
    }
  }

  render() {
    const { creator, admins, participants } = this.props.ongoingEvent
    const participantList = [ creator, ...admins, ...participants ]
    const { ongoing } = this.state

    if(!ongoing) {
      return (
        <View style={styles.noPadding}>

          <View style={style.top}>
            <Text style={style.listText}>Valitse sukeltajat:</Text>
            {this.showList(participantList)}
          </View>

          <View style={style.bottom}>
            <View style={style.divider}/>
            <Button title='Aloita sukellus' onPress={this.diveButton} buttonStyle={style.buttonDive} raised />
          </View>

        </View>
      )

    } else {
      return (
        <View style={styles.noPadding}>

          <View style={style.top}>
            <Text style={{ fontSize: 20 }}>Valitut sukeltajat:</Text>
            {this.showList(participantList)}
          </View>

          <View style={style.bottom}>
            <View style={style.divider}/>
            <Text h1 style={style.counter}>{this.duration()}</Text>
            <View style={style.divider}/>
            <Button title='Lopeta sukellus' onPress={this.endButton} buttonStyle={style.buttonEndDives} raised />
          </View>
        </View>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  ongoingDives: state.ongoingDives,
  ongoingEvent: state.ongoingEvent,
  user: state.user
})

export default connect(
  mapStateToProps,
  { endDives, startDives, getOngoingEvent }
)(DiveScreen)
