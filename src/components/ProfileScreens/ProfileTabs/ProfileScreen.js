import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView } from 'react-native'
import { Image, Text, Button } from 'react-native-elements'

import { logout } from '../../../store'
import { getServerListener } from '../../../ServerListener'
import userService from '../../../services/users'
import styles from '../../../styles/global'
import colors from '../../../styles/colors'

const style = {
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  image: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: colors.background,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  rest: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
    width: null,
    height: null,
    resizeMode: 'contain'
  }
}

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
    <View style={style.main}>

      <View style={style.image}>
        <ScrollView>
          <Image source={ uri } />
        </ScrollView>
      </View>
      <View style={style.rest}>
        <ScrollView>
          <Text h2>{props.username}</Text>
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

    </View>
  )
}

const mapStateToProps = (state) => ({ username: state.user.username })

export default connect(
  mapStateToProps,
  { logout }
)(ProfileMainScreen)
