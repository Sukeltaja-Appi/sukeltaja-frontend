import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, StyleSheet, FlatList } from 'react-native'
import { Icon, Text, ListItem } from 'react-native-elements'

import { logout } from '../../../store'
import { getMessages } from '../../../reducers/messageReducer'
import { getServerListener } from '../../../ServerListener'
import userService from '../../../services/users'
import styles from '../../../styles/global'
import colors from '../../../styles/colors'

export const ProfileScreen = (props) => {

  const [invites, setInvites] = useState([])

  useEffect(() => {
    props.getMessages()
  }, [])
  useEffect(() => {
    const { messages } = props

    if (!messages)
      return
    const newInvites = messages.filter(msg => msg.type.startsWith('invitation_'))

    setInvites(newInvites)
  }, [props.messages])


  const navigate = (value) => props.navigation.navigate(value)

  const logoutButton = () => {
    const { logout } = props
    const serverListener = getServerListener()

    serverListener.disconnect()
    logout()
    userService.setToken(null)

    navigate('LoginScreen')
  }

  const menuData = [
    {
      title: 'Arvostele sukelluksia (TODO)',
      leftIcon: () => <Icon name='waves' type='material' />,
      onPress: () => navigate('')
    },
    {
      title: 'Sukellushistoria',
      leftIcon: () => <Icon name='history' type='material' />,
      onPress: () => navigate('EventListScreen')
    },
    {
      title: 'Asetukset',
      leftIcon: () => <Icon name='settings' type='material' />,
      onPress: () => navigate('Settings')
    },
    {
      title: 'Palaute',
      leftIcon: () => <Icon name='feedback' type='material' />,
      onPress: () => navigate('')
    },
    {
      title: 'Kirjaudu ulos',
      leftIcon: () => <Icon name='log-out' type='feather' />,
      onPress: () => logoutButton()
    }
  ]

  return (
    <View style={styles.noPadding}>
      <ScrollView>
        <View style={{ backgroundColor: '#118BFC', alignItems: 'center' }}>
          <View style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)', width: '80%',
            marginTop: 40, marginHorizontal: 40, marginBottom: 20, padding: 30, borderRadius: 50
          }}>
            <Icon
              size={100}
              name='user' type='feather'
            />
            <Text h2 style={{ textAlign: 'center', color: 'white' }}>{props.username}</Text>
          </View>

          {
            invites.length > 0 &&
            <View style={style.notificationStyle}>
              <Text style={{ color: 'white' }}>{invites.length} kutsua odottaa hyväksymistä</Text>
            </View>
          }
        </View>

        <FlatList
          data={menuData}
          renderItem={({ item }) => {
            const { title, leftIcon, onPress } = item

            return (
              <ListItem
                onPress={onPress}
                bottomDivider
              >
                {leftIcon()}
                <ListItem.Content>
                  <ListItem.Title>{title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            )
          }
          }
          keyExtractor={item => item.title}
        />


      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  profileContainer: {
    width: '100%',
    color: '#333'
  },
  notificationStyle: {
    marginBottom: 10,
    marginHorizontal: 20,
    backgroundColor: '#00A3FF',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderColor: '#118BFC',
    borderRadius: 10,
  }
})

const mapStateToProps = (state) => ({ username: state.user.username })

export default connect(
  mapStateToProps,
  { logout, getMessages }
)(ProfileScreen)
