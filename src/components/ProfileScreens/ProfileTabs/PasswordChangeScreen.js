import React from 'react'
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import t from 'tcomb-form-native'
import _ from 'lodash'
import resetService from '../../../services/reset'
import AppText from '../../common/AppText'
import AppButton from '../../common/AppButton'

import { connect } from 'react-redux'

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
    color: 'black',
    fontSize: 22,
  },
}
const stylesheet = _.cloneDeep(t.form.Form.stylesheet)

stylesheet.textbox.normal.backgroundColor = 'white'
stylesheet.controlLabel.normal.color = 'black'
stylesheet.controlLabel.normal.marginLeft = 15
stylesheet.textbox.normal.borderRadius = 15
stylesheet.controlLabel.normal.fontFamily = 'nunito-bold'
stylesheet.controlLabel.error.fontFamily = 'nunito-bold'
stylesheet.textbox.error.backgroundColor = 'white'
stylesheet.controlLabel.error.color = 'black'
stylesheet.controlLabel.error.marginLeft = 15
stylesheet.textbox.error.borderRadius = 20

const options = {
  fields: {
    currentPassword: {
      stylesheet: stylesheet,
      label: 'Nykyinen salasana:',
      error: 'Nykyinen salasana ei saa olla tyhjä.',
      secureTextEntry: true,
      autoCapitalize: 'none',
    },
    newPassword: {
      stylesheet: stylesheet,
      label: 'Uusi salasana:',
      error: 'Uusi salasana ei saa olla tyhjä.',
      secureTextEntry: true,
      autoCapitalize: 'none',
    },
    newPasswordVerification: {
      stylesheet: stylesheet,
      label: 'Uusi salasana uudelleen:',
      error: 'Salasanan vahvistus ei saa olla tyhjä.',
      secureTextEntry: true,
      autoCapitalize: 'none',
    },
  },
}

class PasswordChangeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.state = {
      passwordChange: {
        currentPassword: '',
        newPassword: '',
        newPasswordVerification: '',
      },
      passwordMatch: true,
      showLoadingIndicator: false
    }
  }

  navigate = (value) => this.props.navigation.navigate(value);

  changePW = async () => {
    this.setState({ passwordMatch: true, validationFail: false })
    if (this.formRef.current.getValue()) {
      if (
        this.state.passwordChange.newPassword ===
        this.state.passwordChange.newPasswordVerification
      ) {
        try {
          this.setState({ showLoadingIndicator: true })
          const response = await resetService.change(this.state.passwordChange)

          if (response.success) {
            Alert.alert(
              'Salasanan vaihto onnistui',
              'Salasana on nyt vaihdettu.',
              [{ text: 'Ok', onPress: () => console.log('Ok') }]
            )
            this.navigate('Profiili')
          } else if (response.error) {
            console.log('Reset error: ', response)
            Alert.alert(
              'Salasanan vaihto epäonnistui',
              'Tarkista nykyinen salasana.',
              [{ text: 'Ok', onPress: () => console.log('Ok') }]
            )
          }
        } finally {
          this.setState({ showLoadingIndicator: false })
        }
      } else {
        this.setState({ passwordMatch: false })
      }
    }
  }

  render() {
    const { passwordChange } = this.state
    const { passwordMatch } = this.state
    const { showLoadingIndicator } = this.state

    const User = t.struct({
      currentPassword: t.String,
      newPassword: t.String,
      newPasswordVerification: t.String,
    })

    return (
      <View>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <AppText
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 34,
              marginTop: 50,
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 1,
              textShadowColor: '#a1a1a1',
            }}
          >
            Salasanan vaihtaminen
          </AppText>

          <View style={style.container}>
            {!passwordMatch && (
              <AppText style={{ fontSize: 16, color: 'red' }}>
                Salasana ja vahvistus eivät täsmää
              </AppText>
            )}
            <Form
              ref={this.formRef}
              type={User}
              options={options}
              value={passwordChange}
              onChange={(passwordChange) => this.setState({ passwordChange })}
            />

            <View style={style.buttonDivider} />
            <AppButton onPress={this.changePW} title="Lähetä" loading={showLoadingIndicator} />

            <View style={style.buttonDivider} />
            <View style={style.buttonDivider} />
            <TouchableOpacity onPress={() => this.navigate('Asetukset')}>
              <AppText
                style={{
                  fontSize: 22,
                  color: 'black',
                  textAlign: 'center',
                  textShadowOffset: { width: 2, height: 2 },
                  textShadowRadius: 5,
                  textShadowColor: '#a1a1a1',
                }}
              >
                Peruuta
              </AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default connect(null, null)(PasswordChangeScreen)
