import React from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem, Input } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'

import eventMsgService from '../../../services/eventMessages'
import { formatDate } from '../../../utils/dates'
import styles, { paddingSides } from '../../../styles/global'
import colors from '../../../styles/colors'

const style = StyleSheet.create({
  subtitle: {
    fontStyle: 'italic',
    fontSize: 14,
  },
  top: {
    flex: 1,
    width: '100%',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  sendMessageButton: {
    padding: 13,
    backgroundColor: colors.primary,
    borderRadius: 100,
    alignSelf: 'flex-end'
  }
})

class ChatScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }

  invitesSortedByDate = () => this.props.ongoingEvent.eventMessages.sort((a, b) => b.created.localeCompare(a.created))

  showMessages = () => {
    const { eventMessages } = this.props.ongoingEvent

    if (!eventMessages || eventMessages.length === 0) {
      return (
        <View style={styles.centered}>
          <Text style={styles.h5}>Ei viestejä.</Text>
        </View>
      )
    }

    return (
      <FlatList
        data={this.invitesSortedByDate()}
        renderItem={({ item }) => {
          const { user, created, text } = item

          return (
            <ListItem
              onPress={() => this.selectMessage(item)}
              bottomDivider
            >
              <ListItem.Content>
                <ListItem.Title>{text}</ListItem.Title>
                <ListItem.Subtitle style={style.subtitle}>
                  {user.username + ', ' + formatDate(created)}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )
        }
        }
        keyExtractor={item => item._id}
      />
    )
  }

  selectMessage = (item) => {
    this.props.navigation.navigate('ChatMessage', { item })
  }

  sendMessage = () => {
    if (this.state.message) {
      const message = {
        created: new Date(), // backend should give this instead of untrustworthy client
        event: this.props.ongoingEvent._id,
        text: this.state.message
      }

      eventMsgService.create(message)
      this.setState({ message: '' })
    }
  }

  render() {
    return (
      <View style={styles.noPadding}>
        <View style={style.top}>
          <View style={{ flex: 1, padding: paddingSides }}>
            {this.showMessages()}
          </View>
          <View style={{ flexDirection: 'row', marginHorizontal: 6, marginBottom: 12 }}>
            <Input
              multiline
              maxHeight={110}
              value={this.state.message}
              onChangeText={message => this.setState({ message })}
              placeholder='Kirjoita viesti'
              containerStyle={style.inputContainer}
              inputContainerStyle={{ borderBottomWidth: 0 }}
            />
            <TouchableOpacity
              onPress={this.sendMessage}
              style={style.sendMessageButton}
            >
              <MaterialIcons name="send" color='white' size={24} />
            </TouchableOpacity>
          </View>

        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({ ongoingEvent: state.ongoingEvent })

export default connect(
  mapStateToProps,
  null
)(ChatScreen)
