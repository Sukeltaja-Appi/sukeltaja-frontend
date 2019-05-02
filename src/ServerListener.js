import React from 'react'
import { connect } from 'react-redux'
import openSocket from 'socket.io-client'

import { updateLocalEvent } from './reducers/eventReducer'
import { receiveMessage } from './reducers/messageReducer'
import { config } from './services/users'
import { apiUrl } from './config'

const endCut = 4
const socketUrl = apiUrl.substring(0, apiUrl.length - endCut)

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
    let { socket } = this.state

    if(config().headers.Authorization !== null
      && (socket === null || !socket.connected)) {

      const { updateLocalEvent, receiveMessage } = this.props

      socket = openSocket(socketUrl, { path: '/update' })

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

      console.log('ServerListener mounted, listening to: socketUrl')

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
