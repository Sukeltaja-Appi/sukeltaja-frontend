import React from 'react'
import { createMaterialTopTabNavigator, createStackNavigator, MaterialTopTabBar } from 'react-navigation'
import { Icon } from 'react-native-elements'

import ChatScreen from './OngoingEventTabs/ChatScreen'
import DiveScreen from './OngoingEventTabs/DiveScreenStack/DiveScreen'
import DiveListScreen from './OngoingEventTabs/DiveScreenStack/DiveListScreen'
import CreateDiveScreen from './OngoingEventTabs/DiveScreenStack/CreateDiveScreen'
import Dive from './OngoingEventTabs/DiveScreenStack/Dive'
import EventScreen from './OngoingEventTabs/EventScreen'
import InviteScreen from './OngoingEventTabs/InviteScreen'
import TargetScreen from './OngoingEventTabs/TargetScreen'

import Target from '../common/Target'

import colors from '../../styles/colors'

const style = {
  activeTintColor: '#fff',
  labelStyle: {
    fontWeight: 'bold',
    fontSize: 9
  },
  showIcon: true
}

const TabBarComponent = (props) => (<MaterialTopTabBar {...props} />)

const EventScreenStack = createStackNavigator({
  EventScreen,
  InviteScreen
}, { headerMode: 'none' })

const DiveScreenStack = createStackNavigator({
  DiveScreen,
  DiveListScreen,
  CreateDiveScreen,
  Dive
}, { headerMode: 'none' })

const TargetScreenStack = createStackNavigator({
  TargetScreen,
  Target
}, { headerMode: 'none' })

const OngoingEventTabs = createMaterialTopTabNavigator({
  TargetScreen: {
    screen: TargetScreenStack,
    navigationOptions: {
      tabBarLabel: 'KOHDE',
      tabBarOptions: style,
      showIcon: true,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='map-pin' type='feather' color={tintColor} />
      )
    }
  },
  DiveScreen: {
    screen: DiveScreenStack,
    navigationOptions: {
      tabBarLabel: 'SUKELLUKSET',
      tabBarOptions: style,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='anchor' type='feather' color={tintColor} />
      )
    }
  },
  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: {
      tabBarLabel: 'KESKUSTELU',
      tabBarOptions: style,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='message-circle' type='feather' color={tintColor} />
      )
    }
  },
  EventScreen: {
    screen: EventScreenStack,
    navigationOptions: {
      tabBarLabel: 'TAPAHTUMA',
      tabBarOptions: style,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='users' type='feather' color={tintColor} />
      )
    }
  },
}, {
  tabBarComponent: props => {
    return (
      <TabBarComponent
        {...props}
        style={{
          backgroundColor: colors.primary_light,
          paddingTop: 10
        }}
      />
    )
  }
})

export default OngoingEventTabs
