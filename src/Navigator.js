import React from 'react'
import { createBottomTabNavigator, BottomTabBar, createAppContainer } from 'react-navigation'

import OngoingEventScreens from './components/OngoingEventScreens'
import MapScreens from './components/MapScreens'
import EventScreens from './components/EventScreens'
import ProfileMainScreen from './components/ProfileScreens'

import { Icon } from 'react-native-elements'

import colors from './styles/colors'

const TabBarComponent = (props) => (<BottomTabBar { ...props } />)

const style = {
  activeTintColor: '#fff',
  labelStyle: {
    fontWeight: 'bold'
  }
}

const MainTabNavigator = createBottomTabNavigator({
  OngoingEvent : {
    screen: OngoingEventScreens,
    navigationOptions: {
      tabBarLabel: 'SUKELLUS',
      tabBarOptions: style,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='anchor' type='feather' color={tintColor} />
      )
    }
  },
  Map : {
    screen: MapScreens,
    navigationOptions: {
      tabBarLabel: 'KARTTA',
      tabBarOptions: style,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='map-pin' type='feather' color={tintColor} />
      )
    }
  },
  EventList : {
    screen: EventScreens,
    navigationOptions: {
      tabBarLabel: 'TAPAHTUMAT',
      tabBarOptions: style,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='archive' type='feather' color={tintColor} />
      )
    }
  },
  Profile : {
    screen: ProfileMainScreen,
    navigationOptions: {
      tabBarLabel: 'PROFIILI',
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
  }
})

const Navigator = createAppContainer(MainTabNavigator)

export default Navigator
