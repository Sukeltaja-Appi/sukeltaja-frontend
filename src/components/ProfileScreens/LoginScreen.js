import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import t from 'tcomb-form-native'

import { paddingSides } from '../../styles/global'

import userService from '../../services/users'
import { initializeEvents } from '../../reducers/eventReducer'
import { initializeDives } from '../../reducers/diveReducer'
import { login } from '../../reducers/userReducer'

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
  }
}

const options = {
  fields: {
    username: {
      label: 'Käyttäjätunnus:',
      error: 'Käyttäjätunnus ei saa olla tyhjä.'
    },
    password: {
      label: 'Salasana',
      error: 'Salasana ei saa olla tyhjä.',
      secureTextEntry: true
    }
  }
}

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      credentials: {
        username: '',
        password: ''
      }
    }
  }

  navigate = (value) => this.props.navigation.navigate(value)

  register = async () => {
    const response = await userService.create(this.state.credentials)

    if(response.data) {
      await this.login()
    } else {
      console.log('Registration failed!')
    }
  }

  login = async () => {
    const { login, initializeEvents, initializeDives } = this.props

    await login(this.state.credentials)
    const { user } = this.props

    if (user) {
      userService.setToken(user.token)

      await initializeEvents()
      await initializeDives()

      this.navigate('UserTab')
    } else {
      console.log('Wrong username or password')
    }
  }

  render() {
    const { credentials } = this.state
    const reference = 'form'

    const User = t.struct({
      username: t.String,
      password: t.String,
    })

    return (
      <View style={style.container}>
        <Form
          ref={reference}
          type={User}
          options={options}
          value={credentials}
          onChange={(credentials) => this.setState({ credentials })}
        />

        <Button
          onPress={this.login}
          title="Kirjaudu"
        />

        <View style={style.buttonDivider}/>

        <Button
          onPress={this.register}
          title="Rekisteröidy"
        />

      </View>
    )
  }
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(
  mapStateToProps,
  { login, initializeEvents, initializeDives }
)(LoginScreen)
