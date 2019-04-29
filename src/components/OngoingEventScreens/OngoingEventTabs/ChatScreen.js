import React from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text } from 'react-native'
import { ListItem, Button } from 'react-native-elements'
import t from 'tcomb-form-native'

import eventMsgService from '../../../services/eventMessages'
import { formatDate } from '../../../utils/dates'
import styles from '../../../styles/global'
import { paddingSides } from '../../../styles/global'

const { Form } = t.form

const style = {
  subtitle: {
    fontStyle: 'italic',
    fontSize: 14
  },
  divider: {
    height: 10
  },
  top: {
    flex: 1,
    width: '100%',
    padding: paddingSides,
  },
  bottom: {
    flex: 2,
    justifyContent: 'flex-start'
  }
}

const ChatMessage = t.struct({
  text: t.String
})

const options = {
  fields: {
    text: {
      label: 'Viestikenttä',
      error: 'Viestikenttä ei saa olla tyhjä.'
    }
  }
}

class ChatScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: {
        text: ''
      }
    }
    this.showMessages = this.showMessages.bind(this)
    this.writeBox = this.writeBox.bind(this)
  }

  componentDidMount() {

  }

  selectMessage = (msg) => {
    console.log(msg)
  }

  InvitesSortedByDate = () => {
    return this.props.ongoingEvent.eventMessages.sort((a, b) => b.created.localeCompare(a.created))
    //return []
  }

  showMessages = () => {
    const { eventMessages } = this.props.ongoingEvent

    if (!eventMessages || eventMessages.length === 0) {
      return (
        <View style={styles.centered}>
          <Text style={styles.h5}>Ei Viestejä.</Text>
        </View>
      )
    }

    return(
      <FlatList
        data={this.InvitesSortedByDate()}
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

  onFormChange = (message) => {
    this.setState({ message })
  }

  writeBox = () => {
    return (
      <Form
        type={ChatMessage}
        options={options}
        value={this.state.message}
        onChange={this.onFormChange}
      />
    )
  }

  send = () => {
    let { message } = this.state

    if(message && message !== '') {
      const { ongoingEvent } = this.props

      message.event = ongoingEvent._id
      message.created = new Date()
      eventMsgService.create(message)
      console.log('sent messages:', message)
      this.setState({ message: '' })
    }
  }

  render() {
    return (
      <View style={styles.noPadding}>
        <View style={style.top}>
          {this.writeBox()}
          <Button
            title="Lähetä"
            onPress={this.send}
          />
        </View>
        <View style={style.bottom}>
          {this.showMessages()}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent
})

export default connect(
  mapStateToProps,
  null
)(ChatScreen)
