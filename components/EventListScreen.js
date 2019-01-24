import React from 'react'
import { View, FlatList } from 'react-native'
import ListItem from './simple/ListItem'

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

//  Need to eventually map individual onPress events to
//  respective ListItem buttons, right now just do a no-op.
const _onPress = () => {}

const EventListScreen = () => {
  return (
    <View style={{ flex: 9, backgroundColor: '#eee' }}>
      <View style={{ flex: 0.2, backgroundColor: '#eee'}} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            description={item.desc}
            onPress={_onPress}
            displayArrow
          />
        )}
        keyExtractor={item  => item.title}
      />
    </View>
  )
}

export default EventListScreen
