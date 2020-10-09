import React from 'react'
import { connect } from 'react-redux'
import { Dimensions, View, Image } from 'react-native'

import { initializeEvents } from '../../../reducers/eventReducer'
import { initializeDives } from '../../../reducers/diveReducer'
import { getAll } from '../../../reducers/targetReducer'
import { login } from '../../../reducers/userReducer'
import AppButton from '../../common/AppButton'
import BackgroundImage from '../../common/BackgroundImage'
import AppText from '../../common/AppText'

const logo = require('../../../pictures/mobiililogot_vaaka.png')

const style = {
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: 50,
  },
  buttonDivider: {
    height: 40,
  },
}

class OpeningScreen extends React.Component {
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

  render() {
    return (
      <View>
        <BackgroundImage height={Dimensions.get('screen').height}>
          <View style={style.container}>
            <Image
              source={logo}
              style={{ width: 360, height: 120, alignSelf: 'center' }}
            ></Image>
            <AppText
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 44,
                marginTop: 20,
              }}
            >
              Sukeltaja-App
            </AppText>
          </View>

          <View style={style.container}>
            <AppButton
              title="Kirjaudu"
              onPress={() => this.navigate('LoginScreen')}
            />
            <View style={style.buttonDivider} />
            <AppButton
              title="Rekisteröidy"
              onPress={() => this.navigate('RegisterScreen')}
            />
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
})(OpeningScreen)
