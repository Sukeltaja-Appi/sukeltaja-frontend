import React from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import HomeScreen from './components/HomeScreen'
import EventsScreen from './components/EventsScreen'

//const App = () => <HomeScreen/>

const RootStack = createStackNavigator({
    Home: {
      screen: HomeScreen
    },
    Events: {
      screen: EventsScreen
    }
  });

const App = createAppContainer(RootStack);

export default App
