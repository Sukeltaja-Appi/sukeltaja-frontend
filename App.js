import React from 'react'
import {createBottomTabNavigator, createAppContainer} from 'react-navigation'

import { AppRegistry } from 'react-native';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import EventScreens from './components/EventScreens'
import EventListScreen from './components/EventListScreen'
import ProfileScreens from './components/ProfileScreens'
import EventReducer from './components/reducers/EventReducer'

import Icon from 'react-native-vector-icons/AntDesign'

const MainTabNavigator = createBottomTabNavigator({
  Event0 : {
    screen: EventScreens,
    navigationOptions: {
        tabBarLabel:"Tapahtuma",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="circledowno" size={30} color="#000000" />
        )
    }
  },
  EventList : {
    screen: EventListScreen,
    navigationOptions: {
        tabBarLabel:"Menneet",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="bars" size={30} color="#000000" />
        )
    }
  },
  Profile : {
    screen: ProfileScreens,
    navigationOptions: {
        tabBarLabel:"Profiili",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" size={30} color="#000000" />
        )
    }
  }
}, {
  tabBarOptions : {
    style: {
      backgroundColor: '#37fbe5',
    }
  }
});
// ^- Map, and Posts? will be added in the future.

const AppContainer0 = createAppContainer(MainTabNavigator);

const reducer = combineReducers({
  events: EventReducer
});

const store0 = createStore(EventReducer);

class ProviderPackedApp extends React.Component {

  render() {
    return (
      <Provider store={store0}>
        <AppContainer0 />
      </Provider>     );
  }
}

AppRegistry.registerComponent('SukeltajaApp', () => ProviderPackedApp);

export default ProviderPackedApp
