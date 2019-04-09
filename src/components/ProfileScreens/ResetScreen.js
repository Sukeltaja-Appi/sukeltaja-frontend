import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import t from 'tcomb-form-native'
import resetService from '../../services/reset'
import { paddingSides } from '../../styles/global'

const { Form } = t.form

const style = {
  container: {
    width: '100%',
    backgroundColor: 'white',
    padding: paddingSides,
    paddingBottom: 5
  },
  buttonDivider: {
    height: 20
  },
  bottomButton: {
    position: 'fixed',
    bottom: 10
  }
}

const options = {
  fields: {
    username: {
      label: 'Käyttäjätunnus:',
      error: 'Käyttäjätunnus ei saa olla tyhjä.'
    }
  }
}

class ResetScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''

    }
  }

    navigate = (value) => this.props.navigation.navigate(value)

    resetPassword = async () => {
      console.log(this.state.username)
      console.log('Resetting password for: ' + this.state.username.username)

      await resetService.reset(this.state.username)

      console.log('Email sent')
      this.navigate('LoginScreen')

    }

    render() {
      const { username } = this.state
      const User = t.struct({
        username: t.String
      })
      const reference = 'form'

      return (

        <View style={style.container}>

          <Form
            ref={reference}
            type={User}
            options={options}
            value={username}
            onChange={(username) => this.setState({ username })}
          />

          <Button
            onPress={this.resetPassword}
            title="Lähetä"
          />

        </View>
      )
    }
}

export default connect(
  null,
  null
)(ResetScreen)
