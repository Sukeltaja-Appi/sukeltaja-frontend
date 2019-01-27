import React from 'react'
import { View, FlatList } from 'react-native'
import ListItem from '../simple/ListItem'
import { connect } from 'react-redux'

class EventListScreen extends React.Component {

  static navigationOptions = {
    header: null ,
  };

  navigate = (value) => this.props.navigation.navigate(value);

  //  Need to eventually map individual onPress events to
  //  respective ListItem buttons, right now just do a no-op.
  _onPress = () => {}

  render() {
    const data = this.props.events.all

    return (
      <View style={{ flex: 9, backgroundColor: '#eee' }}>
        <View style={{ flex: 0.2, backgroundColor: '#eee'}} />
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItem
              title={item.id}
              description={item.counter}
              onPress={this._onPress}
              displayArrow
            />
          )}
          keyExtractor={item  => item.title}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events
  }
}

const ConnectedEventListScreen = connect(
  mapStateToProps,
  null
)(EventListScreen)

export default ConnectedEventListScreen
