import React from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import HomeScreen from './components/HomeScreen'
import EventsScreen from './components/EventsScreen'
import OngoingEventScreen from './components/OngoingEventScreen'

//const App = () => <HomeScreen/>

const RootStack = createStackNavigator({
    Home: {
      screen: HomeScreen
    },
    Events: {
      screen: EventsScreen
    },
    OngoingEvent: {
      screen: OngoingEventScreen
    }
  });

const App = createAppContainer(RootStack);

export default App
