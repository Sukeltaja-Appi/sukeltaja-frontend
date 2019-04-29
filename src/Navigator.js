import React from 'react'
import { createBottomTabNavigator, BottomTabBar, createAppContainer } from 'react-navigation'

import OngoingEventEntry from './components/OngoingEventScreens/OngoingEventEntry'
import MapScreen from './components/MapScreens/MapScreen'
import EventEntry from './components/EventScreens/EventEntry'
import ProfileScreens from './components/ProfileScreens'

import { Icon } from 'react-native-elements'

import colors from './styles/colors'

const TabBarComponent = (props) => (<BottomTabBar { ...props } />)

const style = {
  activeTintColor: '#fff',
  labelStyle: {
    fontWeight: 'bold'
  }
}

export const MainTabNavigator = createBottomTabNavigator({
  OngoingEvent : {
    screen: OngoingEventEntry,
    navigationOptions: {
      tabBarLabel: 'SUKELLUS',
      tabBarOptions: style,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='anchor' type='feather' color={tintColor} />
      )
    }
  },
  Map : {
    screen: MapScreen,
    navigationOptions: {
      tabBarLabel: 'KARTTA',
      tabBarOptions: style,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='map-pin' type='feather' color={tintColor} />
      )
    }
  },
  EventList : {
    screen: EventEntry,
    navigationOptions: {
      tabBarLabel: 'TAPAHTUMAT',
      tabBarOptions: style,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='archive' type='feather' color={tintColor} />
      )
    }
  },
  Profile : {
    screen: ProfileScreens,
    navigationOptions: {
      tabBarLabel: 'KÄYTTÄJÄ',
      tabBarOptions: style,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='user' type='feather' color={tintColor} />
      )
    }
  }
}, {
  tabBarComponent: props => {
    return(
      <TabBarComponent
        {...props}
        style={{ backgroundColor: colors.primary }}
      />
    )
  },
  //initialRouteName: 'Profile'
})

const Navigator = createAppContainer(MainTabNavigator)

export default Navigator
