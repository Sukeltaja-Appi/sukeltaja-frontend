import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { CheckBox, Button } from 'react-native-elements'
import styles from '../../styles/global'
import colors from '../../styles/colors'
import { connect } from 'react-redux'
import { loadAllUsers, selectUser, deselectUser, clearSelectedUsers } from '../../reducers/userReducer'
import { sendMessage } from '../../reducers/messageReducer'
import { mergeOngoingEvent, getOngoingEvent } from '../../reducers/eventReducer'

import {
  usernameOrId, userEqualsObject,
  userIsInArray
} from '../../utils/utilityFunctions'

const style = {
  subtitle: {
    fontStyle: 'italic',
    fontSize: 14
  },
  buttonRow: {
    justifyContent: 'center',
    padding: 10
  },
  buttonDivider: {
    height: 10
  },
  buttonGreen: {
    backgroundColor: colors.green,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10
  }
}

class InviteScreen extends React.Component {
  constructor(props) {
    super(props)
    this.showList = this.showList.bind(this)
  }

  logSelectedUsers = () => {
    let { selectedUsers } = this.props

    console.log('SelectedUsers:')
    console.log(selectedUsers.length)
    for(let i=0; i<selectedUsers.length; i++) console.log(selectedUsers[i].username || selectedUsers[i])
  }

  debugLogPending = (pending) => {
    console.log('selectedUsers---------------------------------------')
    const { selectedUsers } = this.props

    for(let i = 0; i < selectedUsers.length; i++) console.log(selectedUsers[i])
    console.log('pending---------------------------------------------')
    for(let i = 0; i < pending.length; i++) console.log(pending[i])
    console.log('----------------------------------------------------')
  }

  refreshComponent = () => {
    this.navigate('OngoingEventScreen')
    this.navigate('InviteScreen')
  }

  componentDidMount() {
    if(this.props.users.length === 0) this.loadUsers()
  }

  navigate = (value) => this.props.navigation.navigate(value)

  loadUsers = async () => {
    await this.props.loadAllUsers()
  }

  inviteAdmins = async () => {
    let { sendMessage, user, selectedUsers, ongoingEvent, clearSelectedUsers } = this.props
    let { creator, pending } = ongoingEvent
    let pendingUsers = []

    for(let i = 0; i < pending.length; i++) pendingUsers[i] = pending[i].user

    if(userEqualsObject(user, creator)) {

      await sendMessage(
        'invitation_admin',
        ongoingEvent,
        { id: user.id, username: user.username },
        selectedUsers
      )

      this.debugLogPending(ongoingEvent.pending)
      await getOngoingEvent(ongoingEvent)
      this.debugLogPending(ongoingEvent.pending)

      clearSelectedUsers()
      this.loadUsers()
    }
  }

  inviteParticipants = async () => {
    let { sendMessage, user, selectedUsers, ongoingEvent, clearSelectedUsers } = this.props
    let { creator, admins, pending } = ongoingEvent
    let pendingUsers = []

    for(let i = 0; i < pending.length; i++) pendingUsers[i] = pending[i].user

    if(userEqualsObject(user, creator) || userIsInArray(user, admins)) {

      await sendMessage(
        'invitation_participant',
        ongoingEvent,
        { id: user.id, username: user.username },
        selectedUsers
      )

      this.debugLogPending(ongoingEvent.pending)
      await getOngoingEvent(ongoingEvent)
      this.debugLogPending(ongoingEvent.pending)

      clearSelectedUsers()
      this.loadUsers()
    }
  }

  backButton = async () => {
    await getOngoingEvent(this.props.ongoingEvent)
    this.navigate('OngoingEventScreen')
  }

  pressUser = (u) => {
    let { selectUser, deselectUser, selectedUsers } = this.props

    if (!userIsInArray(u, selectedUsers)) selectUser(u)
    else deselectUser(u)

    this.refreshComponent()
  }

  renderListItem = (u) => {
    const { selectedUsers } = this.props

    if (selectedUsers.includes(u)) {
      return (
        <CheckBox
          title={usernameOrId(u)}
          onPress={() => this.pressUser(u)}
          checked={true}
        />
      )
    }

    return (
      <CheckBox
        title={usernameOrId(u)}
        onPress={() => this.pressUser(u)}
        checked={false}
      />
    )
  }

  showList = () => {
    const { users } = this.props

    if (users.length === 0) {
      return (
        <View style={styles.centered}>
          <Text style={styles.h5}>Ei käyttäjiä.</Text>
        </View>
      )
    } else {
      return (
        <FlatList
          data={users}
          renderItem={({ item }) => this.renderListItem(item) }
          keyExtractor={item => item.id}
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.noPadding}>

        {this.showList()}

        <View style={style.bottom}>
          <View style={style.buttonDivider}/>
          <Button
            title="+ Kutsu Ylläpitäjiä"
            onPress={this.inviteAdmins}
            buttonStyle={style.buttonGreen}
            raised
          />
          <View style={style.buttonDivider}/>
          <Button
            title="+ Kutsu Osallistujia"
            onPress={this.inviteParticipants}
            buttonStyle={style.buttonGreen}
            raised
          />
          <View style={style.buttonDivider}/>
          <Button
            title="<-- Takaisin"
            onPress={this.backButton}
            raised
          />
        </View>

      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  selectedUsers: state.selectedUsers,
  users: state.users,
  user: state.user
})

export default connect(
  mapStateToProps,
  { sendMessage, loadAllUsers, selectUser,
    deselectUser, clearSelectedUsers, mergeOngoingEvent,
    getOngoingEvent }
)(InviteScreen)
