import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView } from 'react-native'
import { Image, Text, Button } from 'react-native-elements'

import { logout } from '../../../store'
import { getServerListener } from '../../../ServerListener'
import userService from '../../../services/users'
import styles from '../../../styles/global'
import colors from '../../../styles/colors'

export const ProfileScreen = (props) => {
  const uri = require('../../../pictures/mobiililogot_kolmio.png')

  const navigate = (value) => props.navigation.navigate(value)

  const logoutButton = () => {
    const { logout } = props

    const serverListener = getServerListener()

    serverListener.disconnect()

    logout()
    userService.setToken(null)

    navigate('Opening')
  }

  if (!props.user)
    return null

  return (
    <View style={styles.noPadding}>
      <ScrollView contentContainerStyle={{ ...styles.centered, paddingTop: 0 }}>
        <Image
          style={{ width: 300, height: 266 }}
          source={uri}
        />
        <Text h2>{props.user.username}</Text>
        <View style={styles.bottom}>
          <Button
            onPress={() => logoutButton()}
            buttonStyle={{ backgroundColor: colors.red }}
            title="Kirjaudu ulos"
            raised
          />
        </View>
      </ScrollView>
    </View>
  )
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(
  mapStateToProps,
  { logout }
)(ProfileScreen)