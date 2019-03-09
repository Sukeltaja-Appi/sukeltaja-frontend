import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Avatar, Text, Button } from 'react-native-elements'
import styles from '../../styles/global'
import colors from '../../styles/colors'

import eventService from '../../services/events'
import targetService from '../../services/targets'
import diveService from '../../services/dives'
import userService from '../../services/users'
import messageService from '../../services/messages'
import { forgetEvents } from '../../reducers/eventReducer'
import { forgetDives } from '../../reducers/diveReducer'
import { logout } from '../../reducers/userReducer'

export const ProfileMainScreen = (props) => {
  const uri = 'https://upload.wikimedia.org/wikipedia/commons/5/50/USS_Scorpion_sail.jpg'

  const navigate = (value) => props.navigation.navigate(value)

  const logoutButton = () => {
    const { logout, forgetEvents, forgetDives } = props

    forgetEvents()
    forgetDives()
    logout()
    eventService.setToken('dummy')
    targetService.setToken('dummy')
    diveService.setToken('dummy')
    userService.setToken('dummy')
    messageService.setToken('dummy')

    navigate('LoginScreen')
  }

  return (
    <View style={styles.centered}>
      <Avatar source={{ uri }} size="xlarge" rounded />
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
  { logout, forgetEvents, forgetDives }
)(ProfileMainScreen)
