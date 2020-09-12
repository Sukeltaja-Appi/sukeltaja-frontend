import React from 'react'
import { View, FlatList, Linking } from 'react-native'
import { ListItem } from 'react-native-elements'

import styles from '../../../styles/global'

// this style is also used in EventListScreen, refactor
// later to have same styled component everywhere
const style = {
  subtitle: {
    fontStyle: 'italic',
    fontSize: 14
  }
}

const LicenseScreen = () => {
  return (
    <View style={styles.noPadding}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          const { title, url, license } = item

          return (
            <ListItem
              onPress={() => Linking.openURL(url)}
              bottomDivider
            >
              <ListItem.Content>
                <ListItem.Title>{title}</ListItem.Title>
                <ListItem.Subtitle style={style.subtitle}>{license || 'MIT'}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          )
        }
        }
        keyExtractor={item => item.title}
      />
    </View>
  )
}

const data = [
  {
    title: 'axios-retry',
    license: 'Apache-2.0',
    url: 'https://github.com/softonic/axios-retry'
  },
  {
    title: 'axios',
    url: 'https://github.com/axios/axios'
  },
  {
    title: 'expo-cli',
    url: 'https://github.com/expo/expo-cli'
  },
  {
    title: 'expo',
    url: 'https://github.com/expo/expo'
  },
  {
    title: 'luxon',
    url: 'https://github.com/moment/luxon'
  },
  {
    title: 'react',
    url: 'https://github.com/facebook/react'
  },
  {
    title: 'react-native',
    url: 'https://github.com/facebook/react-native'
  },
  {
    title: 'react-native-elements',
    url: 'https://github.com/react-native-training/react-native-elements'
  },
  {
    title: 'react-native-maps-super-cluster',
    url: 'https://github.com/novalabio/react-native-maps-super-cluster'
  },
  {
    title: 'react-navigation',
    license: 'BSD-2-Clause',
    url: 'https://github.com/react-navigation/react-navigation'
  },
  {
    title: 'react-redux',
    url: 'https://github.com/reduxjs/react-redux'
  },
  {
    title: 'redux-thunk',
    url: 'https://github.com/reduxjs/redux-thunk'
  },
  {
    title: 'redux',
    url: 'https://github.com/reduxjs/redux'
  },
  {
    title: 'socket.io-client',
    url: 'https://github.com/Automattic/socket.io-client'
  },
  {
    title: 'tcomb-form-native',
    url: 'https://github.com/gcanti/tcomb-form-native'
  }
]

export default LicenseScreen
