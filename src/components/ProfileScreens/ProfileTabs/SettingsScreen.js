import React from 'react'
import { View, FlatList, Linking } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import { SERVICE_EMAIL } from 'react-native-dotenv'

import styles from '../../../styles/global'

const SettingsScreen = (props) => {

  const navigate = (value) => props.navigation.navigate(value)

  const data = [
    {
      title: 'Anna palautetta',
      leftIcon: () => <Icon name='mail' type='feather' />,
      onPress: () => Linking.openURL(`mailto:${SERVICE_EMAIL}`)
    },
    {
      title: 'Avoimen lähdekoodin lisenssit',
      leftIcon: () => <Icon name='code' type='feather' />,
      onPress: () => navigate('LicenseScreen')
    }
  ]

  return (
    <View style={styles.noPadding}>
      <FlatList
        data={data}
        renderItem={ ({ item }) => {
          const { title, leftIcon, onPress } = item

          return (
            <ListItem
              title={title}
              leftIcon={leftIcon}
              onPress={onPress}
              bottomDivider
              chevron
            />
          )}
        }
        keyExtractor={item => item.title}
      />
    </View>
  )
}

export default SettingsScreen
