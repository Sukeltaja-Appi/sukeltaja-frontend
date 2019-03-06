import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { CheckBox, Button } from 'react-native-elements'
import styles from '../../styles/global'
import { connect } from 'react-redux'
import { loadAllUsers, selectUser, deselectUser, clearSelectedUsers } from '../../reducers/userReducer'
import { sendMessage } from '../../reducers/messageReducer'
import { mergeOngoingEvent } from '../../reducers/eventReducer'

import {
  usernameOrId, userEqualsObject,
  userIsInArray, objectToID,
  userObjEqualsUserObj
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
    width: 20
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
    let { sendMessage, user, selectedUsers, ongoingEvent, clearSelectedUsers, mergeOngoingEvent } = this.props
    let { creator, admins, participants, pending } = ongoingEvent

    if(userEqualsObject(user, creator)) {

      for(let i = 0; i < selectedUsers.length; i++) {
        if(!userIsInArray(selectedUsers[i], pending)
        && !userIsInArray(selectedUsers[i], admins)
        && !userIsInArray(selectedUsers[i], participants)
        && !userObjEqualsUserObj(selectedUsers[i], creator)) {
          pending.push({
            user: objectToID(selectedUsers[i]),
            access: 'admin',
            username: usernameOrId(selectedUsers[i])
          })
        }
      }

      await mergeOngoingEvent(ongoingEvent, user.id)

      await sendMessage(
        'invitation_admin',
        ongoingEvent,
        { id: user.id, username: user.username },
        selectedUsers
      )

      clearSelectedUsers()
      //this.refreshComponent()
      this.loadUsers()
    }
  }

  inviteParticipants = async () => {
    let { sendMessage, user, selectedUsers, ongoingEvent, clearSelectedUsers, mergeOngoingEvent } = this.props
    let { creator, admins, participants, pending } = ongoingEvent

    if(userEqualsObject(user, creator) || userIsInArray(user, admins)) {

      for(let i = 0; i < selectedUsers.length; i++) {
        if(!userIsInArray(selectedUsers[i], pending)
        && !userIsInArray(selectedUsers[i], admins)
        && !userIsInArray(selectedUsers[i], participants)
        && !userObjEqualsUserObj(selectedUsers[i], creator)) {
          pending.push({
            user: objectToID(selectedUsers[i]),
            access: 'participant',
            username: usernameOrId(selectedUsers[i])
          })
        }
      }

      await mergeOngoingEvent(ongoingEvent, user.id)

      await sendMessage(
        'invitation_participant',
        ongoingEvent,
        { id: user.id, username: user.username },
        selectedUsers
      )

      clearSelectedUsers()
      //this.refreshComponent()
      this.loadUsers()
    }
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

        <View style={{ ...styles.row, ...style.buttonRow }}>
          <Button
            title="<-Takaisin"
            onPress={() => this.navigate('OngoingEventScreen')}
          />
          <View style={style.buttonDivider}/>
          <Button
            title="KutsuA"
            onPress={this.inviteAdmins}
          />
          <View style={style.buttonDivider}/>
          <Button
            title="KutsuP"
            onPress={this.inviteParticipants}
          />
          <View style={style.buttonDivider}/>
          <Button
            title="Lataa"
            onPress={this.loadUsers}
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
  { sendMessage, loadAllUsers, selectUser, deselectUser, clearSelectedUsers, mergeOngoingEvent }
)(InviteScreen)
