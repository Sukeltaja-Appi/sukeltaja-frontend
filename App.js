import React from 'react'
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation'
import EventScreens from './components/EventScreens'
import EventListScreen from './components/EventListScreen'
import ProfileScreens from './components/ProfileScreens'
//import State from './components/State'

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

const App = createAppContainer(MainTabNavigator);


export default App
