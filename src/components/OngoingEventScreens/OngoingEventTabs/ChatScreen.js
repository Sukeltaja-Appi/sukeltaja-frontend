import React from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text } from 'react-native'
import { ListItem, Button, Input, Icon } from 'react-native-elements'

import eventMsgService from '../../../services/eventMessages'
import { formatDate } from '../../../utils/dates'
import styles, { paddingSides } from '../../../styles/global'
import colors from '../../../styles/colors'

const style = {
  subtitle: {
    fontStyle: 'italic',
    fontSize: 14
  },
  top: {
    flex: 1,
    width: '100%',
    padding: paddingSides,
  }
}

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

    return(
      <FlatList
        data={this.invitesSortedByDate()}
        renderItem={({ item }) => {
          const { user, created, text } = item

          return (
            <ListItem
              title={text}
              subtitle={user.username + ', ' + formatDate(created)}
              onPress={() => this.selectMessage(item)}
              subtitleStyle={style.subtitle}
              bottomDivider
            />
          )}
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
          <Input
            value={this.state.message}
            onChangeText={message => this.setState({ message })}
            rightIcon={() => <Icon name='message-circle' type='feather' color={colors.lightgray}/>}
            placeholder='Kirjoita viesti'
            containerStyle={{ backgroundColor: 'white', marginBottom: 10 }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />
          <Button
            title='Lähetä'
            onPress={this.sendMessage}
          />
        </View>
        <View style={{ flex: 2 }}>
          {this.showMessages()}
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
