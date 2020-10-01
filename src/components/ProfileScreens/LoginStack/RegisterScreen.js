// Have to disable this because of tcomb form
/* eslint-disable react/no-string-refs */
import React from 'react'
import { connect } from 'react-redux'
import { ImageBackground, View, Text, ScrollView } from 'react-native'
import t from 'tcomb-form-native'
import _ from 'lodash'
import { getServerListener } from '../../../ServerListener'
import userService from '../../../services/users'
import { initializeEvents } from '../../../reducers/eventReducer'
import { initializeDives } from '../../../reducers/diveReducer'
import { getAll } from '../../../reducers/targetReducer'
import { login } from '../../../reducers/userReducer'
import { paddingSides } from '../../../styles/global'
import AppButton from '../../common/AppButton'

const { Form } = t.form

const backgroundImage = require('../../../pictures/tausta.png')

const style = {
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: 50,
  },
  buttonDivider: {
    height: 20
  },
  title: {
    color: 'white',
    fontSize: 22,
  }
}

const stylesheet = _.cloneDeep(t.form.Form.stylesheet)
// overriding the background color
stylesheet.textbox.normal.backgroundColor = 'white';
stylesheet.controlLabel.normal.color = 'white';

const options = {
  fields: {
    email: {
      stylesheet: stylesheet,
      label: 'Sähköpostiosoite:',
      error: 'Anna validi sähköpostiosoite.'
    },
    username: {
      stylesheet: stylesheet,
      label: 'Käyttäjätunnus:',
      error: 'Käyttäjätunnus ei saa olla tyhjä.'
    },
    password: {
      stylesheet: stylesheet,
      label: 'Salasana:',
      error: 'Salasana ei saa olla tyhjä.',
      secureTextEntry: true
    },
    passwordVerification: {
      stylesheet: stylesheet,
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
      usernameInUse: false
    }
  }

  navigate = (value) => this.props.navigation.navigate(value)

  register = async () => {
    this.setState({ passwordMatch: true })
    this.setState({ usernameInUse: false })
    if (this.refs.form.getValue()) {
      if (this.state.credentials.password === this.state.credentials.passwordVerification) {
        const response = await userService.create(this.state.credentials)

        if (response) {
          await this.login()
        } else {
          console.log('Registration failed!')
          this.setState({ usernameInUse: true })
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

    const User = t.struct({
      email: t.String,
      username: t.String,
      password: t.String,
      passwordVerification: t.String
    })

    return (
      <View>
        <ImageBackground source={backgroundImage} style={{ width: '100%', height: '100%' }}>
        <ScrollView>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 34, marginTop: 50}}>
            Rekisteröidy
          </Text>

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

            <Form
              ref={reference}
              type={User}
              options={options}
              value={credentials}
              onChange={(credentials) => this.setState({ credentials })}
            />

            <AppButton
              onPress={this.register}
              title="Rekisteröidy"
            />

            <View style={style.buttonDivider} />
            <View style={style.buttonDivider} />

            <AppButton
              onPress={() => this.navigate('Opening')}
              title="Palaa"
            />
          </View>
        </ScrollView>
        </ImageBackground>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(
  mapStateToProps,
  { login, initializeEvents, initializeDives, getAll }
)(RegisterScreen)
