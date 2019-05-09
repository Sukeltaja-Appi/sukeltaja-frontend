import React from 'react'
import { View, FlatList } from 'react-native'
import { Text, Button, CheckBox } from 'react-native-elements'
import { Duration } from 'luxon'
import { connect } from 'react-redux'

import colors from '../../../../styles/colors'
import styles from '../../../../styles/global'
import { paddingSides } from '../../../../styles/global'

import locationService from '../../../../services/location'
import { startDives, endDives } from '../../../../reducers/diveReducer'
import { getOngoingEvent } from '../../../../reducers/eventReducer'
import { eventToID } from '../../../../utils/eventHandler'

const style = {
  headline: {
    alignItems: 'center',
    marginBottom: 10
  },
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
  listText: {
    fontSize: 20
  },
  divider: {
    height: 10
  },
  top: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    padding: paddingSides,
    marginTop: 10
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    padding: paddingSides,
    marginBottom: 12
  }
}

class DiveScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
      ongoing: false,
      selectedUsers: []
    }
    this.showList = this.showList.bind(this)
    this.showListTitle = this.showListTitle.bind(this)
  }

  navigate = (value) => this.props.navigation.navigate(value)

  counterUpdate = () => {
    const { counter, ongoing } = this.state

    if(ongoing) this.setState({ counter: counter + 1 })
  }

  userIsAdmin = () => {
    const { ongoingEvent, user } = this.props

    if(ongoingEvent.creator._id === user._id) return true
    if(ongoingEvent.admins.map(u => u._id).includes(user._id)) return true

    return false
  }

  selectParticipantUser = () => {
    const { user, ongoingEvent } = this.props
    const participant = ongoingEvent.participants.find(p => p._id === user._id)

    this.setState({ counter: 0, ongoing: false, selectedUsers: [participant] })
  }

  componentDidMount() {
    this.interval = setInterval(() => this.counterUpdate(), 1000)

    if(!this.userIsAdmin()) {
      this.selectParticipantUser()
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  diveButton = async () => {
    const { selectedUsers } = this.state

    if(selectedUsers && selectedUsers.length > 0) {

      let { ongoingEvent, startDives, user } = this.props

      let latitude = 0
      let longitude = 0

      try {
        const location = await locationService.getLocationAsync()

        latitude = location.coords.latitude
        longitude = location.coords.longitude
      } catch(err) { console.log('Geolocation unavailable.') }

      let dives = []

      selectedUsers.forEach(u => {
        dives.push({
          event: ongoingEvent._id,
          startdate: new Date(),
          user: u._id,
          latitude,
          longitude
        })
      })

      await startDives(dives, user._id)

      this.setState({ counter: 0, ongoing: true })
    }
  }

  endButton = async () => {
    let { endDives, ongoingDives, user } = this.props

    endDives(ongoingDives, user._id)

    if(this.userIsAdmin()) this.setState({ ongoing: false, selectedUsers: [] })
    else this.selectParticipantUser()
  }

  duration = () => Duration.fromMillis(this.state.counter * 1000).toFormat('hh:mm:ss')

  toggleUserSelection = (user) => {
    const { ongoing, selectedUsers } = this.state

    if(!ongoing && this.userIsAdmin()){
      if (!selectedUsers.includes(user)) {
        this.setState({ selectedUsers: [...selectedUsers, user] })
      } else {
        this.setState({ selectedUsers: selectedUsers.filter(u => u._id !== user._id) })
      }
    }
  }

  userIsDiving = (user) => {
    const { dives } = this.props.ongoingEvent

    if (dives.filter(d => !d.enddate).map(d => d.user._id).includes(user._id)) return true

    return false
  }

  setUserColor = (user) => {
    if (this.userIsDiving(user)) return { backgroundColor: colors.lightBlue }

    return {}
  }

  renderListItem = (user) => {
    const { selectedUsers } = this.state

    if(this.userIsAdmin()) {
      return (
        <CheckBox
          title={user.username}
          onPress={() => this.toggleUserSelection(user)}
          checked={selectedUsers.map(u => u._id).includes(user._id)}
          containerStyle={this.setUserColor(user)}
        />
      )
    } else {
      const userID = this.props.user._id

      return (
        <CheckBox
          title={user.username}
          onPress={() => this.toggleUserSelection(user)}
          checked={userID === user._id}
          containerStyle={this.setUserColor(user)}
        />
      )
    }
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

  showListTitle = () => {
    if(this.userIsAdmin()) return (<Text style={style.listText}>Valitse sukeltajat</Text>)

    return (<Text style={style.listText}>Sukeltajat</Text>)
  }

  noOneIsSelected = () => {
    const { selectedUsers } = this.state

    if(selectedUsers && selectedUsers.length > 0) return false

    return true
  }

  render() {
    const { creator, admins, participants } = this.props.ongoingEvent
    const participantList = [ creator, ...admins, ...participants ]
    const { ongoing } = this.state

    if(!ongoing) {
      return (
        <View style={styles.noPadding}>

          <View style={style.top}>
            <View style={style.headline}>
              {this.showListTitle()}
            </View>
            {this.showList(participantList)}
          </View>

          <View style={style.bottom}>
            <View style={style.divider}/>
            <Button
              title='Aloita sukellus'
              onPress={this.diveButton}
              buttonStyle={style.buttonDive}
              disabled={this.noOneIsSelected()}
              raised />
            <View style={style.divider}/>
            <Button title='Sukelluslistalle ->' onPress={() => this.navigate('DiveListScreen')} raised />
          </View>

        </View>
      )

    } else {
      return (
        <View style={styles.noPadding}>

          <View style={style.top}>
            <View style={style.headline}>
              <Text style={{ fontSize: 20 }}>Valitut sukeltajat</Text>
            </View>
            {this.showList(participantList)}
          </View>

          <View style={style.bottom}>
            <View style={style.divider}/>
            <Text h1 style={style.counter}>{this.duration()}</Text>
            <View style={style.divider}/>
            <Button title='Lopeta sukellus' onPress={this.endButton} buttonStyle={style.buttonEndDives} raised />
            <View style={style.divider}/>
            <Button title='Sukelluslista ->' onPress={() => this.navigate('DiveListScreen')} raised />
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
