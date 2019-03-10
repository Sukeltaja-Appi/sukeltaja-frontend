import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { CheckBox, Button } from 'react-native-elements'
import styles from '../../styles/global'
import colors from '../../styles/colors'
import { connect } from 'react-redux'
import { loadAllUsers, selectUser, deselectUser, clearSelectedUsers } from '../../reducers/userReducer'
import { sendMessage } from '../../reducers/messageReducer'
import { mergeOngoingEvent, getOngoingEvent } from '../../reducers/eventReducer'
import { objectToID } from '../../utils/utilityFunctions'

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
    marginBottom: 10
  }
}

class InviteScreen extends React.Component {
  constructor(props) {
    super(props)
    this.showList = this.showList.bind(this)
  }

  refreshComponent = () => {
    this.navigate('OngoingEvent')
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

      await getOngoingEvent(ongoingEvent)

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

      await getOngoingEvent(ongoingEvent)

      clearSelectedUsers()
      this.loadUsers()
    }
  }

  backButton = async () => {
    const { ongoingEvent, getOngoingEvent } = this.props

    await getOngoingEvent(ongoingEvent)
    this.navigate('OngoingEvent')
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
          keyExtractor={item => objectToID(item)}
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.noPadding}>

        <View style={style.top}>
          {this.showList()}
        </View>

        <View style={style.bottom}>
          <View style={style.divider}/>
          <Button
            title="+ Kutsu Ylläpitäjiä"
            onPress={this.inviteAdmins}
            buttonStyle={style.buttonGreen}
            raised
          />
          <View style={style.divider}/>
          <Button
            title="+ Kutsu Osallistujia"
            onPress={this.inviteParticipants}
            buttonStyle={style.buttonGreen}
            raised
          />
          <View style={style.divider}/>
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
