import React from 'react'
import { View, FlatList } from 'react-native'
import ListItem from '../simple/ListItem'

class MenuScreen extends React.Component {

  static navigationOptions = {
    header: null ,
  };

  navigate = (value) => this.props.navigation.navigate(value);

  options = [
    {
      title: 'Lisää uusi sukellustapahtuma',
      desc: 'Tänne lisätietoa',
      dest: 'CreateEventScreen'
    },
    {
      title: 'Selaa omia sukellustapahtumia',
      desc: 'Tännekin lisätietoa',
      dest: 'EventListScreen'
    },
    {
      title: 'Liity sukellustapahtumaan',
      desc: 'Tänne myös lisätietoa',
      dest: 'MenuScreen'
    }
  ]

  render() {

    return (
      <View style={{ flex: 9, backgroundColor: '#eee' }}>
        <View style={{ flex: 0.2, backgroundColor: '#eee'}} />
        <FlatList
          data={this.options}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              description={item.desc}
              onPress={() => this.navigate(item.dest)}
              displayArrow
            />
          )}
          keyExtractor={item  => item.title}
        />
      </View>
    )
  }
}

export default MenuScreen
