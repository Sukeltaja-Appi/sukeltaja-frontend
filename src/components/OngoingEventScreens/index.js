import React from 'react'
import { createMaterialTopTabNavigator, MaterialTopTabBar } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { Icon } from 'react-native-elements'

import CustomTargetScreen from './OngoingEventTabs/CustomTargetScreen'
import ChatScreen from './OngoingEventTabs/ChatScreen'
import ChatMessage from './OngoingEventTabs/ChatMessage'
import DiveScreen from './OngoingEventTabs/DiveScreenStack/DiveScreen'
import DiveListScreen from './OngoingEventTabs/DiveScreenStack/DiveListScreen'
import CreateDiveScreen from './OngoingEventTabs/DiveScreenStack/CreateDiveScreen'
import Dive from './OngoingEventTabs/DiveScreenStack/Dive'
import EditDiveScreen from './OngoingEventTabs/DiveScreenStack/EditDiveScreen'
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
  InviteScreen,
  CustomTargetScreen
}, { headerMode: 'none' })

const ChatScreenStack = createStackNavigator({
  ChatScreen,
  ChatMessage
}, { headerMode: 'none' })

const DiveScreenStack = createStackNavigator({
  DiveScreen,
  DiveListScreen,
  CreateDiveScreen,
  Dive,
  EditDiveScreen
}, { headerMode: 'none' })

const TargetScreenStack = createStackNavigator({
  TargetScreen,
  Target,
  CustomTargetScreen
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
      ),
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
    screen: ChatScreenStack,
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
