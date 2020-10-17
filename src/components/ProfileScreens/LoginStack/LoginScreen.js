// Have to disable this because of tcomb form
/* eslint-disable react/no-string-refs */
import React from 'react'
import { connect } from 'react-redux'
import { Dimensions, View, TouchableOpacity } from 'react-native'
import t from 'tcomb-form-native'
import _ from 'lodash'
import { getServerListener } from '../../../ServerListener'
import { initializeEvents } from '../../../reducers/eventReducer'
import { initializeDives } from '../../../reducers/diveReducer'
import { getAll } from '../../../reducers/targetReducer'
import { login } from '../../../reducers/userReducer'
import AppButton from '../../common/AppButton'
import BackgroundImage from '../../common/BackgroundImage'
import AppText from '../../common/AppText'

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
    height: 20,
  },
  title: {
    color: 'white',
    fontSize: 22,
  },
}
const stylesheet = _.cloneDeep(t.form.Form.stylesheet)

stylesheet.textbox.normal.backgroundColor = 'white'
stylesheet.controlLabel.normal.color = 'white'
stylesheet.controlLabel.normal.marginLeft = 15
stylesheet.textbox.normal.borderRadius = 15
stylesheet.controlLabel.normal.fontFamily = 'nunito-bold'
stylesheet.controlLabel.error.fontFamily = 'nunito-bold'
stylesheet.textbox.error.backgroundColor = 'white'
stylesheet.controlLabel.error.color = 'white'
stylesheet.controlLabel.error.marginLeft = 15
stylesheet.textbox.error.borderRadius = 20

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
      secureTextEntry: true,
    },
  },
}

const textButtonStyle = {
  fontSize: 22,
  color: '#fff',
  textAlign: 'center',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 5,
  textShadowColor: '#424242',
}

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      credentials: {
        username: '',
        password: '',
      },
      validLogin: true,
    }
  }

  navigate = (value) => this.props.navigation.navigate(value);

  login = async () => {
    if (this.refs.form.getValue()) {
      //const { login, initializeEvents, initializeDives, getAll } = this.props
      this.setState({ validLogin: true })
      const { login, initializeEvents, getAll } = this.props

      const user = await login(this.state.credentials)

      if (user) {
        await initializeEvents()
        //await initializeDives()
        await getAll()

        getServerListener().setupCommunication()
      } else {
        console.log('Wrong username or password')
        this.setState({ validLogin: false })
      }
    }
  };

  render() {
    const { credentials } = this.state
    const { validLogin } = this.state
    const reference = 'form'

    const User = t.struct({
      username: t.String,
      password: t.String,
    })

    return (
      <View>
        <BackgroundImage height={Dimensions.get('screen').height}>
          <AppText
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 34,
              marginTop: 100,
            }}
          >
            Kirjaudu sisään
          </AppText>
          <View style={style.container}>
            {!validLogin && (
              <AppText style={{ fontSize: 16, color: 'red' }}>
                Väärä käyttäjätunnus tai salasana
              </AppText>
            )}
            <Form
              ref={reference}
              type={User}
              options={options}
              value={credentials}
              onChange={(credentials) => this.setState({ credentials })}
            />
            <AppButton title="Kirjaudu" onPress={this.login} />

            <View style={style.buttonDivider} />
            <TouchableOpacity onPress={() => this.navigate('ResetScreen')}>
              <AppText style={textButtonStyle}>
                Unohtuiko salasana?
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.navigate('Opening')}>
              <AppText style={{ ...textButtonStyle, marginTop: 20, }} >
                Peruuta
              </AppText>
            </TouchableOpacity>
          </View>
        </BackgroundImage>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(mapStateToProps, {
  login,
  initializeEvents,
  initializeDives,
  getAll,
})(LoginScreen)
