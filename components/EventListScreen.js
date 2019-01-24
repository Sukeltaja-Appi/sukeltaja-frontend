import React from 'react'
import { View, FlatList } from 'react-native'
import ListItem from './buttons/ListItem'

const data = [
  {
    title: 'Lisää uusi sukellustapahtuma',
    desc: 'Tänne lisätietoa'
  },
  {
    title: 'Selaa omia sukellustapahtumia',
    desc: 'Tännekin lisätietoa'
  },
  {
    title: 'Liity sukellustapahtumaan'
  }
]

const _onPress = () => {}

const EventListScreen = () => {
  return (
    <View style={{ flex: 9, backgroundColor: '#eee' }}>
      <View style={{ flex: 0.2, backgroundColor: '#eee'}} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ListItem title={item.title} description={item.desc} onPress={_onPress} />
        )}
        keyExtractor={item  => item.title}
      />
    </View>
  )
}

export default EventListScreen
