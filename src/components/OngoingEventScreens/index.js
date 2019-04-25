import React from 'react'
import { createMaterialTopTabNavigator, createStackNavigator, MaterialTopTabBar } from 'react-navigation'
import OngoingEvent from './OngoingEvent'
import InviteScreen from './InviteScreen'
import DiveScreen from './DiveScreen'
import ChatScreen from './ChatScreen'
import TargetScreen from './TargetScreen'
import Target from '../simple/Target'
import { Icon } from 'react-native-elements'
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
  OngoingEvent,
  InviteScreen
}, { headerMode: 'none' })

const TargetScreenStack = createStackNavigator({
  TargetScreen,
  Target
}, { headerMode: 'none' })

export default createMaterialTopTabNavigator({
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
    screen: DiveScreen,
    navigationOptions: {
      tabBarLabel: 'SUKELLUKSET',
      tabBarOptions: style,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='sunset' type='feather' color={tintColor} />
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
