import React from 'react'
import { connect } from 'react-redux'
import { View, Alert } from 'react-native'
import { Button, Header } from 'react-native-elements'
import t from 'tcomb-form-native'
import resetService from '../../services/reset'
import { paddingSides } from '../../styles/global'

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
  bottomButton: {
    position: 'fixed',
    bottom: -200
  },
  title: {
    color: 'white',
    fontSize: 22,
  }
}

const options = {
  fields: {
    username: {
      label: 'Anna käyttäjätunnus:',
      error: 'Käyttäjätunnus ei saa olla tyhjä.'
    }
  }
}

class ResetScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      error: ''

    }
  }

  navigate = (value) => this.props.navigation.navigate(value)

  resetPassword = async () => {
    console.log(this.state.username)
    console.log('Resetting password for: ' + this.state.username.username)

    const message = await resetService.reset(this.state.username)

    if (message.success) {
      console.log('Reset success, email sent : ', message)
      Alert.alert('Salasanan vaihtolinkki lähetetty',
        'Linkki on lähetetty sähköpostiisi ja se on voimassa 10 minuuttia',
        [{ text: 'Ok', onPress: () => console.log('Ok') }
        ]
      )
      this.navigate('LoginScreen')
    }
    if (message.error) {
      console.log('Reset error: ', message)
      Alert.alert('Tapahtuma epäonnistui',
        `Palautuslinkin lähetys ei onnistunut, yritä uudelleen.
        Varmista että olet kirjoittanut pienet ja suuret kirjaimet oikein.`,
        [{ text: 'Ok', onPress: () => console.log('Ok') }
        ]
      )
    }
  }

  render() {
    const { username } = this.state
    const User = t.struct({
      username: t.String
    })
    const reference = 'form'

    return (
      <View >
        <Header
          placement="center"
          centerComponent={{ text: 'SALASANAN VAIHTO', style: style.title }}
          containerStyle={{
            backgroundColor: '#1a237e',
            justifyContent: 'space-around',
          }}
        />
        <View style={style.buttonDivider} />
        <View style={style.container}>
          <Form
            ref={reference}
            type={User}
            options={options}
            value={username}
            onChange={(username) => this.setState({ username })}
          />
          <View style={style.buttonDivider} />
          <Button
            onPress={this.resetPassword}
            title="Lähetä"
          />
          <View style={style.buttonDivider} />
        </View>
        <Button style={style.bottomButton}
          onPress={() => this.navigate('LoginScreen')}
          title="Palaa"
        />
      </View>
    )
  }
}

export default connect(
  null,
  null
)(ResetScreen)
