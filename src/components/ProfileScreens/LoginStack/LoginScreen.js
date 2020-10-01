// Have to disable this because of tcomb form
/* eslint-disable react/no-string-refs */
import React from 'react'
import { connect } from 'react-redux'
import { ImageBackground, View, Text, Image } from 'react-native'
import { Button, Header } from 'react-native-elements'
import t from 'tcomb-form-native'
import _ from 'lodash'
import { getServerListener } from '../../../ServerListener'
import userService from '../../../services/users'
import { initializeEvents } from '../../../reducers/eventReducer'
import { initializeDives } from '../../../reducers/diveReducer'
import { getAll } from '../../../reducers/targetReducer'
import { login } from '../../../reducers/userReducer'
import AppButton from '../../common/AppButton'

const image = require('../../../pictures/tausta.png')

const { Form } = t.form

const style = {
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: 50,
  },
  button: {
    background: '#00A3FF',
    border: '3px solid #118BFC',
  },
  buttonDivider: {
    height: 20
  },
  title: {
    color: 'white',
    fontSize: 22,
  }
}
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
// overriding the background color
stylesheet.textbox.normal.backgroundColor = 'white';
stylesheet.controlLabel.normal.color = 'white';

const options = {
  fields: {
    username: {
      stylesheet: stylesheet,
      label: 'Käyttäjätunnus:',
      error: 'Käyttäjätunnus ei saa olla tyhjä.',
    },
    password: {
      stylesheet: stylesheet,
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
    const reference = 'form'

    const User = t.struct({
      username: t.String,
      password: t.String,
    })

    return (
      <View >
        <ImageBackground source={image} style={{ width: '100%', height: '100%', position: 'relative'}}>
        <Text style={{textAlign: 'center', color: 'white', fontSize: 34, marginTop: 50}}>
          Kirjaudu sisään
        </Text>
        <View style={style.container}>
          {!validLogin &&
            <Text style={{ fontSize: 16, color: 'red' }}>
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
           <AppButton title="Kirjaudu"  onPress={this.login}/>

          <View style={style.buttonDivider} />
          <Text style={{ fontSize: 22, color: '#fff', textAlign: 'center', textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    textShadowColor: '#424242'}} onPress={() => this.navigate('ResetScreen')}>
            Unohtuiko salasana?
          </Text>
        </View>
        </ImageBackground>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(
  mapStateToProps,
  { login, initializeEvents, initializeDives, getAll }
)(LoginScreen)