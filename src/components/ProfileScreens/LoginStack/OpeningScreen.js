import React from 'react'
import { connect } from 'react-redux'
import { ImageBackground, View, Text, Image } from 'react-native'
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

const image = require('../../../pictures/tausta.png')


const style = {
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: paddingSides,
    paddingBottom: 50
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
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null, 
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
        <ImageBackground source={image} style={{ width: '100%', height: '100%' }}>
        <Header
          placement="center"
          centerComponent={{ text: 'SUKELTAJA-APP', style: style.title }}
          containerStyle={{
            backgroundColor: '#1a237e',
            justifyContent: 'space-around',
          }}
        />
        <View style={style.emptyDivider} />
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
