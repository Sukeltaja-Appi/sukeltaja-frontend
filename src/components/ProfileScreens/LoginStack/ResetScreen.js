import React from 'react'
import { connect } from 'react-redux'
import { Dimensions, View, ScrollView, Alert, TouchableOpacity } from 'react-native'
import t from 'tcomb-form-native'
import AppButton from '../../common/AppButton'
import resetService from '../../../services/reset'
import _ from 'lodash'
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
// overriding the background color

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
      label: 'Anna käyttäjätunnus:',
      error: 'Käyttäjätunnus ei saa olla tyhjä.',
      autoCapitalize: 'none',
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
        <BackgroundImage height={Dimensions.get('screen').height}>
          <ScrollView keyboardShouldPersistTaps='handled'>
            <AppText
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 34,
                marginTop: 50,
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 1,
                textShadowColor: '#000',
              }}
            >
              Salasanan vaihtaminen
            </AppText>

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
              <TouchableOpacity onPress={() => this.navigate('LoginScreen')}>
                <AppText
                  style={{
                    fontSize: 22,
                    color: '#fff',
                    textAlign: 'center',
                    textShadowOffset: { width: 2, height: 2 },
                    textShadowRadius: 5,
                    textShadowColor: '#424242',
                  }}
                >
                  Peruuta
                </AppText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </BackgroundImage>
      </View>
    )
  }
}

export default connect(null, null)(ResetScreen)
