import React from 'react'
import { View, FlatList } from 'react-native'
//import ListItem from '../simple/ListItem'
import EventEntry from '../simple/EventEntry'
import { connect } from 'react-redux'

class EventListScreen extends React.Component {

  static navigationOptions = {
    header: null ,
  };

  navigate = (value) => this.props.navigation.navigate(value);

  //  Need to eventually map individual onPress events to
  //  respective EventEntry buttons, right now just do a no-op.
  _onPress = () => {}

//   render() {
//     const data = this.props.events.all
//     let index = 1
//     return (
//       <View style={{ flex: 9, backgroundColor: '#eee' }}>
//         <View style={{ flex: 0.2, backgroundColor: '#eee'}} />
//         <FlatList
//           data={data}
//           renderItem={({ item }) => (
//             <EventEntry
//               id={item.id}
//               counter={item.counter}
//               onPress={this._onPress}
//               displayArrow
//             />
//           )}
//           keyExtractor={item  => item.title}
//         />
//       </View>
//     )
//   }
// }
render() {
  const data = this.props.events.all
  let index = 1
  return (
    <View style={{ flex: 9, backgroundColor: '#eee' }}>
      <View style={{ flex: 0.2, backgroundColor: '#eee'}} />
      <FlatList
        data={data}

        renderItem={({ item }) => (
          <EventEntry
            id={item.id}
            counter={item.counter}
            startTime={item.startdate}
            endTime={item.enddate}
            onPress={this._onPress}
            displayArrow
          />
        )}
        keyExtractor={item  => item.id.toString()}
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
