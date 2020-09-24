import React from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { Button, Header } from 'react-native-elements'
import t from 'tcomb-form-native'

import { getServerListener } from '../../../ServerListener'
import userService from '../../../services/users'
import { initializeEvents } from '../../../reducers/eventReducer'
import { initializeDives } from '../../../reducers/diveReducer'
import { getAll } from '../../../reducers/targetReducer'
import { login } from '../../../reducers/userReducer'
import { paddingSides } from '../../../styles/global'

const { Form } = t.form

const style = {
  container: {
    width: '100%',
    backgroundColor: 'white',
    padding: paddingSides,
    paddingBottom: 50
  },
  buttonDivider: {
    height: 20
  },
  title: {
    color: 'white',
    fontSize: 22,
  }
}

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      credentials: {
        username: '',
        password: ''
      },
      validLogin: true
    }
  }

  navigate = (value) => this.props.navigation.navigate(value)

  render() {
    const { credentials } = this.state
    const { validLogin } = this.state
    const reference = "form"

    const User = t.struct({
      username: t.String,
      password: t.String,
    })

    return (
      <View>
        <Header
          placement="center"
          centerComponent={{ text: 'h', style: style.title }}
          containerStyle={{
            backgroundColor: '#1a237e',
            justifyContent: 'space-around',
          }}
        />
        <View style={style.container}>
          <Button
            onPress={() => this.navigate('LoginScreen')}
            title="Kirjaudu"
          />

          <View style={style.buttonDivider} />

          <Button
            onPress={() => this.navigate('RegisterScreen')}
            title="Rekisteröidy"
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(
  mapStateToProps,
  { login, initializeEvents, initializeDives, getAll }
)(LoginScreen)
