import React from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, ImageBackground, View, Text, Image } from 'react-native'
import { Button, Header } from 'react-native-elements'
import t from 'tcomb-form-native'
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
const logo = require('../../../pictures/mobiililogot_vaaka.png')

const style = {
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: paddingSides,
    paddingBottom: 70,
    marginTop: 40
  },
  buttonDivider: {
    height: 40
  },
  emptyDivider: {
    height: 250
  },
  title: {
    color: 'white',
    fontSize: 22,
    font: 'Nunito'
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#00A3FF',
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 15
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
    font: 'Nunito'
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
    return (
      <View>

        <ImageBackground source={backgroundImage} style={{ width: '100%', height: '100%' }}>

          <View style={style.container}>
            <Image source={logo} style={{ width: 360, height: 120, alignSelf: 'center' }}></Image>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 50, marginTop: 0 }}>Sukeltaja-app</Text>
          </View>

          <View style={style.container}>
            <AppButton title="Kirjaudu" onPress={() => this.navigate('LoginScreen')} />
            <View style={style.buttonDivider} />
            <AppButton title="Rekisteröidy" onPress={() => this.navigate('RegisterScreen')}/>
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
