import React from 'react'
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation'
import EventScreens from './components/EventScreens'
import EventListScreen from './components/EventListScreen'
import ProfileScreens from './components/ProfileScreens'
//import State from './components/State'

const MainTabNavigator = createBottomTabNavigator({
  EventScreens,
  EventListScreen,
  ProfileScreens,
});
// ^- Map, and Posts? will be added in the future.

const App = createAppContainer(MainTabNavigator);

export default App
