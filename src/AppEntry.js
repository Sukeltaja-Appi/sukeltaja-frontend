import React from 'react'
import { connect } from 'react-redux'
//import { USERNAME, PASSWORD } from 'react-native-dotenv'
//import userService from './services/users'
import Navigator from './Navigator'
import { login } from './reducers/userReducer'
import { initializeEvents } from './reducers/eventReducer'
import { initializeDives } from './reducers/diveReducer'
import { getAll } from './reducers/targetReducer'
import ServerListener from './ServerListener'
import OfflineNotifier from './OfflineNotifier'

// * AppEntry is the first component where the store is available.
// * App startup code can be placed here.
// * Components that need to render outside of the Navigator can be
//   placed here. These may include:
//   - Renderless components, or notification components that need to
//     always stay active.

class AppEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  // //Autologin code to speed up development:
  // componentDidMount = async () => {
  //   const credentials = {
  //     username: USERNAME,
  //     password: PASSWORD
  //   }
  //
  //   await this.props.login(credentials)
  //
  //   const { user } = this.props
  //
  //   if (user) {
  //     userService.setToken(user.token)
  //
  //     await this.props.initializeEvents()
  //     //await this.props.initializeDives()
  //     await this.props.getAll()
  //   } else {
  //     // notify user of wrong username/pw
  //   }
  // }

  render() {
    return (
      <React.Fragment>
        <OfflineNotifier />
        <Navigator />
        <ServerListener />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(
  mapStateToProps,
  { login, initializeEvents, initializeDives, getAll }
)(AppEntry)
