import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native'
import { Icon, Text, ListItem } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'

import { logout } from '../../../store'
import { getMessages } from '../../../reducers/messageReducer'
import { getServerListener } from '../../../ServerListener'
import userService from '../../../services/users'
import styles from '../../../styles/global'
import BackgroundImage from '../../common/BackgroundImage'
import { SERVICE_EMAIL } from '@env'
import AppText from '../../common/AppText'

export const ProfileScreen = (props) => {
  const [invites, setInvites] = useState([])

  useEffect(() => {
    props.getMessages()
  }, [])
  useEffect(() => {
    const { messages } = props

    if (!messages) return
    const newInvites = messages.filter((msg) =>
      msg.type.startsWith('invitation_')
    )

    setInvites(newInvites)
  }, [props.messages])

  const navigate = (value) => {
    props.navigation.navigate(value)
  }

  const logoutButton = () => {
    const { logout } = props
    const serverListener = getServerListener()

    serverListener.disconnect()
    logout()
    userService.setToken(null)
  }

  const menuData = [
    {
      title: 'Sukellushistoria',
      leftIcon: () => <Icon name="history" type="material" color="#118BFC" />,
      onPress: () => navigate('Sukellushistoria'),
    },
    {
      title: 'Asetukset',
      leftIcon: () => <Icon name="settings" type="material" color="#118BFC" />,
      onPress: () => navigate('Asetukset'),
    },
    {
      title: 'Palaute',
      leftIcon: () => <Icon name="feedback" type="material" color="#118BFC" />,
      onPress: () => Linking.openURL(`mailto:${SERVICE_EMAIL}`),
    },
    {
      title: 'Kirjaudu ulos',
      leftIcon: () => <Icon name="log-out" type="feather" color="#118BFC" />,
      onPress: () => logoutButton(),
    },
  ]

  if (!props.user) return null

  return (
    <View style={styles.noPadding}>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <BackgroundImage>
          <SafeAreaView>
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  width: '80%',
                  marginTop: 20,
                  marginHorizontal: 40,
                  marginBottom: 10,
                  padding: 30,
                  borderRadius: 50,
                }}
              >
                <Icon size={100} name="user" type="feather" />
                <AppText
                  h2
                  style={{ textAlign: 'center', color: 'white', fontSize: 36 }}
                >
                  {props.user.username}
                </AppText>
              </View>
              {invites.length > 0 && (
                <TouchableOpacity
                  style={style.notificationStyle}
                  onPress={() => navigate('Kutsut')}
                >
                  <Text style={{ color: 'white' }}>
                    {invites.length} {invites.length === 1 ? 'kutsu' : 'kutsua'} odottaa hyväksymistä
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </SafeAreaView>

        </BackgroundImage>

        <FlatList
          data={menuData}
          renderItem={({ item }) => {
            const { title, leftIcon, onPress } = item

            return (
              <ListItem onPress={onPress} bottomDivider>
                {leftIcon()}
                <ListItem.Content>
                  <ListItem.Title
                    style={{
                      fontFamily: 'nunito-bold',
                      color: '#118BFC',
                      fontSize: 18,
                    }}
                  >
                    {title}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron color='#118BFC' />
              </ListItem>
            )
          }}
          keyExtractor={(item) => item.title}
        />
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  profileContainer: {
    width: '100%',
    color: '#333',
  },
  notificationStyle: {
    marginBottom: 10,
    marginHorizontal: 20,
    backgroundColor: '#00A3FF',
    paddingHorizontal: 30,
    paddingVertical: 7,
    borderColor: '#118BFC',
    borderWidth: 3,
    borderRadius: 10,
  },
})

const mapStateToProps = (state) => ({
  user: state.user,
  messages: state.messages,
})

export default connect(mapStateToProps, { logout, getMessages })(ProfileScreen)
