import React from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'

import EventScreens from './components/EventScreens'
import MenuScreens from './components/MenuScreens'
import ProfileScreens from './components/ProfileScreens'

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
})

const Navigator = createAppContainer(MainTabNavigator)

export default Navigator
