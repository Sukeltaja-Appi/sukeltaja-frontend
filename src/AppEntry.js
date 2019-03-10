import React from 'react'
import { connect } from 'react-redux'
import { USERNAME, PASSWORD } from 'react-native-dotenv'
import userService from './services/users'
import Navigator from './Navigator'
import { login } from './reducers/userReducer'
import { initializeEvents } from './reducers/eventReducer'
import { initializeDives } from './reducers/diveReducer'
import { getAll } from './reducers/targetReducer'

class AppEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = async () => {
    const credentials = {
      username: USERNAME,
      password: PASSWORD
    }

    await this.props.login(credentials)

    const { user } = this.props

    if (user) {
      userService.setToken(user.token)

      await this.props.initializeEvents()
      await this.props.initializeDives()
      await this.props.getAll()
    } else {
      // notify user of wrong username/pw
    }
  }

  render() {
    return (
      <Navigator />
    )
  }
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(
  mapStateToProps,
  { login, initializeEvents, initializeDives, getAll }
)(AppEntry)
