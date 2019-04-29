import React from 'react'
import { View, FlatList } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'

import styles from '../../../styles/global'

const MenuScreen = (props) => {

  const navigate = (value) => props.navigation.navigate(value)

  const data = [
    {
      title: 'Luo uusi sukellustapahtuma',
      leftIcon: () => <Icon name='edit-2' type='feather' />,
      destination: 'CreateEventScreen'
    },
    {
      title: 'Selaa omia sukellustapahtumia',
      leftIcon: () => <Icon name='folder' type='feather' />,
      destination: 'EventListScreen'
    },
    // delete this if no longer needed
    {
      title: 'Liity sukellustapahtumaan',
      leftIcon: () => <Icon name='user-plus' type='feather' />,
      destination: 'EventMenuScreen'
    }
  ]

  return (
    <View style={styles.noPadding}>
      <FlatList
        data={data}
        renderItem={ ({ item }) => {
          const {
            title,
            subtitle,
            leftIcon,
            destination
          } = item

          return (
            <ListItem
              title={title}
              subtitle={subtitle}
              leftIcon={leftIcon}
              onPress={() => navigate(destination)}
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

export default MenuScreen
