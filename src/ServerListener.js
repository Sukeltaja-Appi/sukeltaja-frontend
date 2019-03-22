import React from 'react'
import { connect } from 'react-redux'
import RNEventSource from 'react-native-event-source'
import { updateLocalEvent } from '../../reducers/eventReducer'
import { receiveMessage } from '../../reducers/messageReducer'
import { apiUrl } from './config'

const url = `${apiUrl}/push`

// ServerListener:
// Is a Renderless component that receives updates from the
// server and keeps the clients data in the reducers upp to date.
class ServerListener extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.serverSource = new RNEventSource(url)

    const { updateLocalEvent, receiveMessage } = this.props

    // Grabs updated events
    this.serverSource.addEventListener('updatedEvent', (data) => {
      console.log(data.type)
      console.log(data.data)
      updateLocalEvent(data.data)
    })

    // Grabs new messages
    this.serverSource.addEventListener('newMessage', (data) => {
      console.log(data.type)
      console.log(data.data)
      receiveMessage(data.data)
    })
  }

  componentWillUnmount() {
    this.eventSource.removeAllListeners()
    this.eventSource.close()
  }

  render() {
    return null
  }
}

export default connect(
  null,
  { updateLocalEvent, receiveMessage }
)(ServerListener)
