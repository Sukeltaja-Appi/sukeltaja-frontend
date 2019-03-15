import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { CheckBox, Button } from 'react-native-elements'
import styles from '../../styles/global'
import colors from '../../styles/colors'
import { connect } from 'react-redux'
import { loadAllUsers } from '../../reducers/userReducer'
import { sendMessage } from '../../reducers/messageReducer'
import { getOngoingEvent } from '../../reducers/eventReducer'

const style = {
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
    this.state = {
      selectedUsers: []
    }
    this.showList = this.showList.bind(this)
  }

  componentDidMount() {
    if(this.props.users.length === 0) this.loadUsers()
  }

  navigate = (value) => this.props.navigation.navigate(value)

  loadUsers = async () => {
    await this.props.loadAllUsers()
  }

  userIsCreator = (user) => user._id === this.props.ongoingEvent.creator._id
  userIsAdmin = (user) => this.props.ongoingEvent.admins.map(a => a._id).includes(user._id)
  userIsParticipant = (user) => this.props.ongoingEvent.participants.map(p => p._id).includes(user._id)

  sendInvite = async (type) => {
    const { userIsCreator, userIsAdmin } = this
    const { selectedUsers } = this.state
    const { sendMessage, user, ongoingEvent, getOngoingEvent } = this.props

    if (!selectedUsers || !userIsCreator(user) && !userIsAdmin(user)) return

    const receivers = selectedUsers.map(receiver => receiver._id)

    await sendMessage(
      type,
      ongoingEvent,
      user._id,
      receivers
    )

    await getOngoingEvent(ongoingEvent)

    this.loadUsers()
  }

  inviteAdmins = () => this.sendInvite('invitation_admin')
  inviteParticipants = () => this.sendInvite('invitation_participant')

  inviteAdminButtonDisabled = () => {
    const { selectedUsers } = this.state

    return selectedUsers.length === 0 || selectedUsers.some(u => this.userIsAdmin(u))
  }
  inviteParticipantButtonDisabled = () => {
    const { selectedUsers } = this.state

    return selectedUsers.length === 0 || selectedUsers.some(u => this.userIsParticipant(u))
  }

  backButton = async () => {
    const { ongoingEvent, getOngoingEvent } = this.props

    await getOngoingEvent(ongoingEvent)
    this.navigate('OngoingEvent')
  }

  toggleUserSelection = (user) => {
    const { selectedUsers } = this.state

    if (!selectedUsers.includes(user)) {
      this.setState({ selectedUsers: [...selectedUsers, user] })
    } else {
      this.setState({ selectedUsers: selectedUsers.filter(u => u._id !== user._id) })
    }
  }

  renderListItem = (user) => {
    const { selectedUsers } = this.state

    return (
      <CheckBox
        title={user.username}
        onPress={() => this.toggleUserSelection(user)}
        checked={selectedUsers.includes(user)}
      />
    )
  }

  showList = (invitableUsers) => {
    if (invitableUsers.length === 0) {
      return (
        <View style={styles.centered}>
          <Text style={styles.h5}>Ei käyttäjiä.</Text>
        </View>
      )
    } else {
      return (
        <FlatList
          data={invitableUsers}
          renderItem={({ item }) => this.renderListItem(item) }
          keyExtractor={item => item._id}
          extraData={this.state}
        />
      )
    }
  }

  render() {
    const { userIsAdmin, userIsCreator } = this

    const invitableUsers = this.props.users.filter(u => !userIsAdmin(u) && !userIsCreator(u))

    return (
      <View style={styles.noPadding}>

        <View style={style.top}>
          {this.showList(invitableUsers)}
        </View>

        <View style={style.bottom}>
          <View style={style.divider}/>
          <Button
            title="+ Kutsu ylläpitäjäksi"
            onPress={this.inviteAdmins}
            buttonStyle={style.buttonGreen}
            raised
            disabled={this.inviteAdminButtonDisabled()}
          />
          <View style={style.divider}/>
          <Button
            title="+ Kutsu osallistujaksi"
            onPress={this.inviteParticipants}
            buttonStyle={style.buttonGreen}
            disabled={this.inviteParticipantButtonDisabled()}
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
  users: state.users,
  user: state.user
})

export default connect(
  mapStateToProps,
  { sendMessage, loadAllUsers, getOngoingEvent }
)(InviteScreen)
