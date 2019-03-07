import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { ListItem, Button } from 'react-native-elements'
import styles from '../../styles/global'
import { formatDate } from '../../utils/dates'
import { connect } from 'react-redux'
import { getMessages } from '../../reducers/messageReducer'
import { usernameOrId } from '../../utils/utilityFunctions'

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

class InvitesScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      invites: []
    }
  }
  componentDidMount() {
    this.loadMessages()
  }

  updateInvites = () => {
    const { messages } = this.props

    const invites = []

    for (let i = 0; i < messages.length; i++) {
      let type = messages[i].type

      if(type === 'invitation_participant' || type === 'invitation_admin') {
        invites.push(messages[i])
      }
    }

    this.setState({ invites })
  }

  loadMessages = async () => {
    await this.props.getMessages()
    this.updateInvites()
  }

  selectInvite = (message) => {
    this.props.navigation.navigate('Invite', {
      invProps: {
        message: message,
        parent: this
      }
    })
  }

  InvitesSortedByDate = () => {
    return this.state.invites.sort((a, b) => b.created.localeCompare(a.created))
  }

  showMessages = () => {
    if (this.state.invites.length === 0) {
      return (
        <View style={styles.centered}>
          <Text style={styles.h5}>Ei kutsuja.</Text>
        </View>
      )
    }

    return(
      <View style={styles.noPadding}>
        <FlatList
          data={this.InvitesSortedByDate()}
          renderItem={({ item }) => {
            const { sender, created } = item

            return (
              <ListItem
                title={usernameOrId(sender)}
                subtitle={formatDate(created)}
                onPress={() => this.selectInvite(item)}
                subtitleStyle={style.subtitle}
                bottomDivider
                chevron
              />
            )}
          }
          keyExtractor={item => item.id}
        />
        <Button
          title="Hae kutsut"
          onPress={this.loadMessages}
        />
      </View>
    )
  }

  render() {
    return this.showMessages()
  }
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  messages: state.messages,
  user: state.user
})

export default connect(
  mapStateToProps,
  { getMessages }
)(InvitesScreen)
