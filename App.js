import React from 'react'
import {createBottomTabNavigator, createAppContainer} from 'react-navigation'

import { AppRegistry } from 'react-native';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import EventScreens from './src/components/EventScreens'
import MenuScreens from './src/components/MenuScreens'
import ProfileScreens from './src/components/ProfileScreens'
import EventReducer from './src/reducers/EventReducer'

import Icon from 'react-native-vector-icons/AntDesign'

const MainTabNavigator = createBottomTabNavigator({
  Event0 : {
    screen: EventScreens,
    navigationOptions: {
        tabBarLabel:"Tapahtuma",
        tabBarOptions: { activeTintColor: 'blue'},
        tabBarIcon: () => (
          <Icon name="circledowno" size={30} color="#000000" />
        )
    }
  },
  EventList : {
    screen: MenuScreens,
    navigationOptions: {
        tabBarLabel:"Valikko",
        tabBarOptions: { activeTintColor: 'blue'},
        tabBarIcon: () => (
          <Icon name="bars" size={30} color="#000000" />
        )
    }
  },
  Profile : {
    screen: ProfileScreens,
    navigationOptions: {
        tabBarLabel:"Profiili",
        tabBarOptions: { activeTintColor: 'blue'},
        tabBarIcon: () => (
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
// ^- Map will be added in the future.

const AppContainer0 = createAppContainer(MainTabNavigator);

const reducer = combineReducers({
  events: EventReducer
});

const store0 = createStore(reducer);

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
