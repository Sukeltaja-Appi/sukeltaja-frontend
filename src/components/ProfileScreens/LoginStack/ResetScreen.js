import React from 'react'
import { connect } from 'react-redux'
import {
  ImageBackground,
  View,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import t from 'tcomb-form-native'
import AppButton from '../../common/AppButton'
import resetService from '../../../services/reset'
import _ from 'lodash'

const { Form } = t.form

const backgroundImage = require('../../../pictures/tausta.png')

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
const stylesheet = _.cloneDeep(t.form.Form.stylesheet)
// overriding the background color

stylesheet.textbox.normal.backgroundColor = 'white'
stylesheet.controlLabel.normal.color = 'white'
stylesheet.controlLabel.normal.marginLeft = 15
stylesheet.textbox.normal.borderRadius = 15
stylesheet.textbox.error.backgroundColor = 'white'
stylesheet.controlLabel.error.color = 'white'
stylesheet.controlLabel.error.marginLeft = 15
stylesheet.textbox.error.borderRadius = 20

const options = {
  fields: {
    username: {
      stylesheet: stylesheet,
      label: 'Anna käyttäjätunnus:',
      error: 'Käyttäjätunnus ei saa olla tyhjä.',
    },
  },
}

class ResetScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      error: '',
    }
  }

  navigate = (value) => this.props.navigation.navigate(value);

  resetPassword = async () => {
    console.log(this.state.username)
    console.log('Resetting password for: ' + this.state.username.username)

    const message = await resetService.reset(this.state.username)

    if (message.success) {
      console.log('Reset success, email sent : ', message)
      Alert.alert(
        'Salasanan vaihtolinkki lähetetty',
        'Linkki on lähetetty sähköpostiisi ja se on voimassa 10 minuuttia',
        [{ text: 'Ok', onPress: () => console.log('Ok') }]
      )
      this.navigate('LoginScreen')
    }
    if (message.error) {
      console.log('Reset error: ', message)
      Alert.alert(
        'Tapahtuma epäonnistui',
        `Palautuslinkin lähetys ei onnistunut, yritä uudelleen.
        
Varmista että olet kirjoittanut pienet ja suuret kirjaimet oikein.`,
        [{ text: 'Ok', onPress: () => console.log('Ok') }]
      )
    }
  };

  render() {
    const { username } = this.state
    const User = t.struct({
      username: t.String,
    })
    const reference = 'form'

    return (
      <View>
        <ImageBackground source={backgroundImage} style={{ width: '100%', height: '100%' }}>
          <ScrollView>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 34, marginTop: 50 }}>
              Salasanan vaihtaminen
            </Text>

            <View style={style.container}>
              <Form
                ref={reference}
                type={User}
                options={options}
                value={username}
                onChange={(username) => this.setState({ username })}
              />

              <View style={style.buttonDivider} />
              <AppButton onPress={this.resetPassword} title="Lähetä" />

              <View style={style.buttonDivider} />
              <View style={style.buttonDivider} />
              <Text style={{
                fontSize: 22, color: '#fff', textAlign: 'center', textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 5,
                textShadowColor: '#424242'
              }} onPress={() => this.navigate('LoginScreen')}>
                Peruuta
              </Text>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    )
  }
}

export default connect(null, null)(ResetScreen)
