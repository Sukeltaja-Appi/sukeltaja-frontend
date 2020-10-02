// Have to disable this because of tcomb form
/* eslint-disable react/no-string-refs */
import React from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView } from 'react-native'
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
    email: {
      label: 'Sähköpostiosoite:',
      error: 'Anna validi sähköpostiosoite.'
    },
    username: {
      label: 'Käyttäjätunnus:',
      error: 'Käyttäjätunnus ei saa olla tyhjä.'
    },
    password: {
      label: 'Salasana:',
      error: 'Salasana ei saa olla tyhjä.',
      secureTextEntry: true
    },
    passwordVerification: {
      label: 'Salasanan vahvistus:',
      error: 'Vahvistus ei saa olla tyhjä.',
      secureTextEntry: true
    }
  }
}

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      credentials: {
        username: '',
        password: '',
        email: '',
        passwordVerification: '',
      },
      passwordMatch: true,
      usernameInUse: false,
      validationFail: false
    }
  }

  navigate = (value) => this.props.navigation.navigate(value)

  register = async () => {
    this.setState({ passwordMatch: true })
    this.setState({ usernameInUse: false })
    this.setState({ validationFail: false })
    if (this.refs.form.getValue()) {
      if (this.state.credentials.password === this.state.credentials.passwordVerification) {
        const response = await userService.create(this.state.credentials)

        if (response['username'] !== undefined) {
          await this.login()
        } else if (response['error'] !== undefined && response['error'].includes('unique')) {
          console.log('Registration failed, username not unique!')
          this.setState({ usernameInUse: true })
        } else if (response['error'] !== undefined && response['error'].includes('validation')) {
          console.log('Validation failed!')
          this.setState({ validationFail: true })
        }
      } else {
        this.setState({ passwordMatch: false })
      }
    }
  }

  login = async () => {

    const { login, initializeEvents, initializeDives, getAll } = this.props

    await login(this.state.credentials)
    const { user } = this.props

    if (user) {
      userService.setToken(user.token)

      await initializeEvents()
      await initializeDives()
      await getAll()

      const serverListener = getServerListener()

      serverListener.setupCommunication()

      this.navigate('ProfileTabs')
    } else {
      console.log('Wrong username or password')
    }

  }

  render() {
    const { credentials } = this.state
    const reference = 'form'
    const { passwordMatch } = this.state
    const { usernameInUse } = this.state
    const { validationFail } = this.state

    const User = t.struct({
      email: t.String,
      username: t.String,
      password: t.String,
      passwordVerification: t.String
    })

    return (
      <View>
        <ScrollView>
          <Header
            placement="center"
            centerComponent={{ text: 'REKISTERÖITYMINEN', style: style.title }}
            containerStyle={{
              backgroundColor: '#1a237e',
              justifyContent: 'space-around',
            }}
          />
          <View style={style.container}>
            {!passwordMatch
              && <Text style={{ fontSize: 16, color: 'red' }}>
                Salasana ja vahvistus eivät täsmää
              </Text>
            }
            {usernameInUse
              && <Text style={{ fontSize: 16, color: 'red' }}>
                Rekisteröinti epäonnistui, käyttäjätunnus on jo olemassa
              </Text>
            }
            {validationFail
              && <Text style={{ fontSize: 16, color: 'red' }}>
                Käyttäjätunnus min 3 merkkiä, salasana min 6 merkkiä, sposti muotoa x@x.x
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
              onPress={this.register}
              title="Rekisteröidy"
            />

            <View style={style.buttonDivider} />
            <View style={style.buttonDivider} />

            <Button
              onPress={() => this.navigate('LoginScreen')}
              title="Palaa"
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(
  mapStateToProps,
  { login, initializeEvents, initializeDives, getAll }
)(RegisterScreen)
