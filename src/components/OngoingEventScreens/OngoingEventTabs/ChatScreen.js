import React from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Input } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import { DateTime } from 'luxon'

import eventMsgService from '../../../services/eventMessages'
import styles from '../../../styles/global'
import colors from '../../../styles/colors'
import AppText from '../../common/AppText'

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
  },
  dateMarkerContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10
  },
  dateMarkerText: {
    textAlign: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    color: '#a1a1a1'
  },
  dateMarkerLine: {
    marginTop: 4,
    height: 1,
    borderBottomWidth: 1,
    flexGrow: 1,
    alignSelf: 'center',
    borderColor: '#a1a1a1'
  }
})
const messageStyle = StyleSheet.create({
  touchable: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 5
  },
  messageContainer: {
    flexGrow: 1,
    flexBasis: 0,
  },
  text: {
    color: '#424242',
  },
  timeText: {
    color: '#939393',
    fontSize: 12,
  },
})
const ownMessageStyle = StyleSheet.create({
  ...messageStyle,
  touchable: {
    ...messageStyle.touchable,
    backgroundColor: colors.primary,
  },
  text: {
    ...messageStyle.text,
    color: 'white',
  },
  timeText: {
    ...messageStyle.timeText,
    color: 'white',
  },
})

class ChatScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }

  formatDate = (isoDate) => {
    return DateTime.fromISO(isoDate).toLocaleString(DateTime.DATE_FULL)
  }

  messagesSortedByDate = () => {
    const messages = [...this.props.ongoingEvent.eventMessages]
    const today = new Date().toISOString().split('T')[0]

    messages.sort((a, b) => b.created.localeCompare(a.created))
    let prevDate = null

    for (let i = messages.length - 1; i >= 0; i--) {
      const { created } = messages[i]
      const date = created.split('T')[0]

      if (date !== prevDate) {
        if (created.split('T')[0] === today) {
          messages.splice(i + 1, 0, {
            dateMarker: true,
            text: 'Tänään'
          })
        }
        else {
          messages.splice(i + 1, 0, {
            dateMarker: true,
            text: this.formatDate(created)
          })
        }
        prevDate = date
      }
    }

    return messages
  }

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
        inverted
        data={this.messagesSortedByDate()}
        style={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => {
          if (item.dateMarker) {
            return (
              <View style={style.dateMarkerContainer}>
                <View style={style.dateMarkerLine} />
                <AppText style={style.dateMarkerText}>{item.text}</AppText>
                <View style={style.dateMarkerLine} />
              </View>
            )
          }
          const { user, created, text } = item
          const date = new Date(created)
          const time = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`

          const isMyMessage = user._id === this.props.user._id
          const currentStyle = isMyMessage ? ownMessageStyle : messageStyle

          return (
            <View
              // Change View to TouchableOpacity if we need this
              onPress={() => this.selectMessage(item)}
              style={currentStyle.touchable}
            >
              <View style={currentStyle.container}>
                <View style={currentStyle.messageContainer}>
                  {
                    !isMyMessage && <AppText style={{ color: colors.primary }}>{user.username}</AppText>
                  }
                  <AppText style={currentStyle.text}>
                    {text}
                  </AppText>
                </View>
                <View style={{ alignSelf: 'flex-start' }}>
                  <AppText style={currentStyle.timeText}>{time}</AppText>
                </View>
              </View>
            </View>
          )
        }}
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
          <View style={{ flex: 1, padding: 10 }}>
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

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  user: state.user,
})

export default connect(
  mapStateToProps,
  null
)(ChatScreen)
