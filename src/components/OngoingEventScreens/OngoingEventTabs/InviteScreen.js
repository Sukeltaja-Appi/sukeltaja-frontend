import React from 'react'
import { connect } from 'react-redux'

import { View, FlatList, Text } from 'react-native'
import { CheckBox, Button, SearchBar } from 'react-native-elements'

import { loadAllUsers } from '../../../reducers/userReducer'
import { sendMessage } from '../../../reducers/messageReducer'
import { getOngoingEvent } from '../../../reducers/eventReducer'

import styles from '../../../styles/global'
import colors from '../../../styles/colors'

const style = {
  divider: {
    height: 10
  },
  buttonGreen: {
    backgroundColor: colors.green,
  },
  top: {
    flex: 2
  },
  middle: {
    flex: 8
  },
  bottom: {
    flex: 5
  },
  searchContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  searchInputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height: 50,
    borderColor: colors.lightgray,
    borderBottomColor: colors.gray,
    borderWidth: 1,
    borderBottomWidth: 1,
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: 'black'
  }
}

class InviteScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayedUsers: [],
      selectedUsers: [],
      query: '',
      listMessage: 'Ei käyttäjiä'
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
  userIsPending = (user) => this.props.ongoingEvent.pending.map(p => p.user._id).includes(user._id)

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
    this.setState({ selectedUsers: [], displayedUsers: [], listMessage: 'Kutsu lähetetty!' })
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
    this.navigate('EventScreen')
  }

  toggleUserSelection = (user) => {
    const { selectedUsers } = this.state

    if (!selectedUsers.includes(user)) {
      this.setState({ selectedUsers: [...selectedUsers, user] })
    } else {
      this.setState({ selectedUsers: selectedUsers.filter(u => u._id !== user._id) })
    }
  }

  //Sets the users checkbox color.
  // Blue if user has a pening invite.
  // Green if user is already a participant and is not pending.
  setUserColor = (user) => {
    const { userIsPending, userIsParticipant } = this

    if (userIsPending(user)) return { backgroundColor: colors.lightBlue }
    if (userIsParticipant(user)) return { backgroundColor: colors.green }

    return {}
  }

  renderListItem = (user) => {
    const { selectedUsers } = this.state

    return (
      <CheckBox
        title={user.username}
        onPress={() => this.toggleUserSelection(user)}
        checked={selectedUsers.includes(user)}
        containerStyle={this.setUserColor(user)}
      />
    )
  }

  showList = (invitableUsers) => {
    if (invitableUsers.length === 0) {
      return (
        <View style={styles.centered}>
          <Text style={styles.h5}>{this.state.listMessage}</Text>
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

  search = (query) => {
    let { selectedUsers } = this.state

    this.setState({ query }, () => {
      if (!query || query === '') this.setState({ displayedUsers: selectedUsers, listMessage: 'Ei käyttäjiä!' })
      else {
        query = query.toLowerCase()
        const { users } = this.props
        const { userIsAdmin, userIsCreator } = this

        const invitableUsers = users.filter(u => !userIsAdmin(u) && !userIsCreator(u))

        let displayedUsers = invitableUsers.filter(u => u.username.toLowerCase().startsWith(query))

        displayedUsers = displayedUsers.filter(u => !selectedUsers.includes(u))

        this.setState({ displayedUsers: [ ...selectedUsers, ...displayedUsers ] })
      }
    })
  }

  render() {
    const { query, displayedUsers } = this.state

    return (
      <View style={styles.noPadding}>

        <View style={style.top}>
          <SearchBar
            placeholder='Etsi käyttäjiä'
            containerStyle={style.searchContainer}
            inputContainerStyle={style.searchInputContainer}
            inputStyle={style.searchInput}
            lightTheme
            clearIcon={{ name: 'x', type: 'feather', size: 28 }}
            onChangeText={(query, invitableUsers) => this.search(query, invitableUsers)}
            value={query}
          />
        </View>

        <View style={style.middle}>
          {this.showList(displayedUsers)}
        </View>

        <View style={style.bottom}>
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
