import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { CheckBox, Button } from 'react-native-elements'
import styles from '../../styles/global'
import { connect } from 'react-redux'
import { usernameOrId, userEqualsObject, userIsInArray } from '../../utils/utilityFunctions'
import { loadAllUsers, selectUser, deselectUser, clearSelectedUsers } from '../../reducers/userReducer'
import { sendMessage } from '../../reducers/messageReducer'

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
    this.state = {
      dummy: 0
    }
  }

  refreshComponent = () => {
    this.navigate('OngoingEventScreen')
    this.navigate('InviteScreen')
  }

  componentDidMount() {
    if(this.props.users.length == 0) this.loadUsers()
  }

  navigate = (value) => this.props.navigation.navigate(value)

  loadUsers = async () => {
    await this.props.loadAllUsers()
  }

  inviteAdmins = async () => {
    const { sendMessage, user, selectedUsers, ongoingEvent, clearSelectedUsers } = this.props
    const { creator, pending } = ongoingEvent
    console.log(selectedUsers.length)
    if(userEqualsObject(user, creator)) {

      for(let i = 0; i < selectedUsers.length; i++) {
        pending.push({
          user: selectedUsers[i].id,
          access: 'admin'
        })
      }

      await sendMessage(
        'invitation_admin',
        ongoingEvent,
        { id: user.id, username: user.username },
        selectedUsers
      )

      await clearSelectedUsers()
      this.refreshComponent()
    }
  }

  inviteParticipants = async () => {
    const { sendMessage, user, selectedUsers, ongoingEvent, clearSelectedUsers } = this.props
    const { creator, admins, pending } = ongoingEvent
    console.log(selectedUsers.length)
    if(userEqualsObject(user, creator) || userIsInArray(user, admins)) {

      for(let i = 0; i < selectedUsers.length; i++) {
        pending.push({
          user: selectedUsers[i].id,
          access: 'participant'
        })
      }

      await sendMessage(
        'invitation_participant',
        ongoingEvent,
        { id: user.id, username: user.username },
        selectedUsers
      )

      await clearSelectedUsers()
      this.refreshComponent()
    }
  }

  pressUser = (u) => {
    const { selectUser, deselectUser, selectedUsers } = this.props

    if (!selectedUsers.includes(u)) selectUser(u)
    else deselectUser(u)

    // Navigation is done to force rerendering because
    // this.forceUpdate() is not enough for some reason.
    // This is very slow however so it should be fixed.
    // this.navigate('OngoingEventScreen')
    // this.navigate('InviteScreen')
    this.refreshComponent()

    console.log('SelectedUsers:')
    console.log(selectedUsers.length)
    for(let i=0; i<selectedUsers.length; i++) console.log(selectedUsers[i].username || selectedUsers[i])
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
  { sendMessage, loadAllUsers, selectUser, deselectUser, clearSelectedUsers }
)(InviteScreen)
