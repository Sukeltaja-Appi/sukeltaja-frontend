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

const options = {
  fields: {
    username: {
      label: 'Käyttäjätunnus:',
      error: 'Käyttäjätunnus ei saa olla tyhjä.'
    },
    password: {
      label: 'Salasana:',
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
      },
      validLogin: true
    }
  }

  navigate = (value) => this.props.navigation.navigate(value)

  login = async () => {
    if (this.refs.form.getValue()) {
      //const { login, initializeEvents, initializeDives, getAll } = this.props
      this.setState({ validLogin: true })
      const { login, initializeEvents, getAll } = this.props

      await login(this.state.credentials)
      const { user } = this.props

      if (user) {
        userService.setToken(user.token)

        await initializeEvents()
        //await initializeDives()
        await getAll()

        const serverListener = getServerListener()

        serverListener.setupCommunication()

        this.navigate('ProfileTabs')
      } else {
        console.log('Wrong username or password')
        this.setState({ validLogin: false })
      }
    }
  }

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
          centerComponent={{ text: 'KIRJAUTUMINEN', style: style.title }}
          containerStyle={{
            backgroundColor: '#1a237e',
            justifyContent: 'space-around',
          }}
        />
        <View style={style.container}>
          {!validLogin &&
            <Text style={{fontSize: 16, color: 'red'}}>
              Väärä käyttäjätunnus tai salasana
            </Text>
          }
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

          <View style={style.buttonDivider} />

          <Button
            onPress={() => navigation.navigate('Register', { screen: 'RegisterScreen' })}
            title="Rekisteröidy"
          />

          <View style={style.buttonDivider} />
          <View style={style.buttonDivider} />

          <Button
            onPress={() => navigation.navigate('ResetScreen')}
            title="Unohtuiko salasana?"
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
