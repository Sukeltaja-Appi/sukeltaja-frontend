import React from 'react'
import { connect } from 'react-redux'
import openSocket from 'socket.io-client'

import { updateLocalEvent } from './reducers/eventReducer'
import { receiveMessage } from './reducers/messageReducer'
import { config } from './services/users'
import { apiUrl } from './config'

const passcolon = 7
const index = apiUrl.substring(passcolon).indexOf(':')
const socketUrl = apiUrl.substring(0, passcolon+index)

const port = 7821

// ServerListener:
// Is a Renderless component that receives updates from the
// server and keeps the clients data in the reducers upp to date.
class ServerListener extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      socket: openSocket(socketUrl + ':' + port)
    }
  }

  componentDidMount() {
    const { updateLocalEvent, receiveMessage } = this.props
    const { socket } = this.state

    // Grabs updated events
    socket.on('updatedEvent', event => {
      updateLocalEvent(event)
      console.log('received updatedEvent:')
      console.log(event)
    })

    // Grabs new messages
    socket.on('newMessage', message => {
      receiveMessage(message)
      console.log('received new message:')
      console.log(message)
    })

    socket.on('connect', async () => {
      await socket.emit('authentication', config())
    })

    socket.on('unauthorized', (reason) => {
      console.log('Unauthorized:', reason)

      socket.disconnect()
    })

    console.log('ServerListener mounted, listening to:', socketUrl + ':' + port)
  }

  render() {
    return null
  }
}

export default connect(
  null,
  { updateLocalEvent, receiveMessage }
)(ServerListener)
