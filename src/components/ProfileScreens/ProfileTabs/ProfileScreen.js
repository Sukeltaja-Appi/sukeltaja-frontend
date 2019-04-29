import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Image, Text, Button } from 'react-native-elements'

import { logout } from '../../../store'
import { getServerListener } from '../../../ServerListener'
import userService from '../../../services/users'
import styles from '../../../styles/global'
import colors from '../../../styles/colors'

export const ProfileMainScreen = (props) => {
  const uri = require('../../../pictures/mobiililogot_kolmio.png')

  const navigate = (value) => props.navigation.navigate(value)

  const logoutButton = () => {
    const { logout } = props

    const serverListener = getServerListener()

    serverListener.disconnect()

    logout()
    userService.setToken(null)

    navigate('LoginScreen')
  }

  return (
    <View style={styles.centered}>
      <Image source={ uri } />
      <Text h2>{props.username}</Text>
      <View style={styles.bottom}>
        <Button
          onPress={() => logoutButton()}
          buttonStyle={{ backgroundColor: colors.red }}
          title="Kirjaudu ulos"
          raised
        />
      </View>
    </View>
  )
}

const mapStateToProps = (state) => ({ username: state.user.username })

export default connect(
  mapStateToProps,
  { logout }
)(ProfileMainScreen)
