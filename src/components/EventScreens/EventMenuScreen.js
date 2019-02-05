import React from 'react'
import { View, FlatList } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import ArrowRight from '../simple/ArrowRight'
import styles from '../../styles/global'

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
        renderItem={ ({ item }) => (
          <ListItem
            title={item.title}
            subtitle={item.subtitle}
            leftIcon={item.leftIcon}
            rightIcon={ <ArrowRight/> }
            onPress={() => navigate(item.destination)}
            bottomDivider
          />
        )}
        keyExtractor={item => item.title}
      />
    </View>
  )
}

export default MenuScreen
