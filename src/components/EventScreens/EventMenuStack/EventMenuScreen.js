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
      destination: 'EventInfoScreen'
    },
    {
      title: 'Selaa omia sukellustapahtumia',
      leftIcon: () => <Icon name='folder' type='feather' />,
      destination: 'EventListScreen'
    },
    // delete this if no longer needed
    // {
    //   title: 'Liity sukellustapahtumaan',
    //   leftIcon: () => <Icon name='user-plus' type='feather' />,
    //   destination: 'EventMenuScreen'
    // }
  ]

  return (
    <View style={styles.noPadding}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          const {
            title,
            subtitle,
            leftIcon,
            destination
          } = item

          return (
            <ListItem
              onPress={() => navigate(destination)}
              bottomDivider
            >
              {leftIcon()}
              <ListItem.Content>
                <ListItem.Title>{title}</ListItem.Title>
                {subtitle ? <ListItem.Subtitle>{subtitle}</ListItem.Subtitle> : null}
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

export default MenuScreen
