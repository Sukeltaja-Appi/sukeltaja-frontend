import React from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text } from 'react-native'
import { ListItem, Button } from 'react-native-elements'

import { getMessages } from '../../../reducers/messageReducer'
import { formatDate } from '../../../utils/dates'
import styles from '../../../styles/global'

const style = {
  subtitle: {
    fontStyle: 'italic',
    fontSize: 14
  },
  divider: {
    height: 10
  }
}

class InvitesScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      invites: []
    }

    this.loadMessages()
  }

  componentDidMount() {
    this.updateInvites()
  }

  // FIXME
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { messages } = nextProps

    this.setState({ invites: messages.filter(msg => msg.type.startsWith('invitation_')) })
  }

  updateInvites = () => {
    const { messages } = this.props

    this.setState({ invites: messages.filter(msg => msg.type.startsWith('invitation_')) })
  }

  loadMessages = async () => {
    await this.props.getMessages()
    this.updateInvites()
  }

  selectMessage = (message) => {
    if(message.type === 'invitation_admin' || message.type === 'invitation_participant') {
      this.props.navigation.navigate('Invite', {
        invProps: {
          message: message,
          parent: this
        }
      })
    }
  }

  InvitesSortedByDate = () => {
    return this.state.invites.sort((a, b) => b.created.localeCompare(a.created))
  }

  showMessages = () => {
    if (this.state.invites.length === 0) {
      return (
        <View style={styles.centered}>
          <Text style={styles.h5}>Ei kutsuja.</Text>
          <Button
            title="Hae kutsut"
            onPress={this.loadMessages}
          />
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
                title={sender.username}
                subtitle={formatDate(created)}
                onPress={() => this.selectMessage(item)}
                subtitleStyle={style.subtitle}
                bottomDivider
                chevron
              />
            )}
          }
          keyExtractor={item => item._id}
        />
        <Button
          title="Hae kutsut"
          onPress={this.loadMessages}
        />
        <View style={style.divider}/>
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
