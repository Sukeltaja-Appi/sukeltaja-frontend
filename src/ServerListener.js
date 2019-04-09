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

const checkAuthInterval = 300 // milliseconds

let serverListener = null

export const getServerListener = () => {
  return serverListener
}

// ServerListener:
// Is a Renderless component that receives updates from the
// server and keeps the clients data in the reducers upp to date.
class ServerListener extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      socket: null
    }

    serverListener = this
  }

  componentDidMount = () => {
    this.setupCommunication()
  }

  setupCommunication = () => {
    if(config().headers.Authorization !== null) {

      const { updateLocalEvent, receiveMessage } = this.props

      const socket = openSocket(socketUrl + ':' + port, { path: '/update' })

      this.setState({ socket: socket })

      // Handles event updates received from the server.
      socket.on('updatedEvent', event => {
        updateLocalEvent(event)
      })

      // Handles new messages received from the server.
      socket.on('newMessage', message => {
        receiveMessage(message)
      })

      socket.on('connect', async () => {
        await socket.emit('authentication', config())
      })

      socket.on('unauthorized', (reason) => {
        console.log('Unauthorized:', reason)

        socket.disconnect()
      })

      console.log('ServerListener mounted, listening to:', socketUrl + ':' + port)

    } else setTimeout(this.setupCommunication, checkAuthInterval)
  }

  disconnect = () => {
    this.state.socket.disconnect()
    this.setState({ socket: null })
  }

  render() {
    return null
  }
}

export default connect(
  null,
  { updateLocalEvent, receiveMessage }
)(ServerListener)
