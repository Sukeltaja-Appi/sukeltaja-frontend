import React from 'react'
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  MaterialTopTabBar
} from 'react-navigation'

import OngoingEventScreen from './OngoingEventScreen'
import InviteScreen from './InviteScreen'
import DiveScreen from './DiveScreen'
import TargetScreen from './TargetScreen'
import SingleTargetScreen from './SingleTargetScreen'

import { Icon } from 'react-native-elements'

import colors from '../../styles/colors'

const style = {
  activeTintColor: '#fff',
  labelStyle: {
    fontWeight: 'bold',
    fontSize: 10
  },
  showIcon: true
}

const TabBarComponent = (props) => (<MaterialTopTabBar {...props} />)

const OngoingEventScreenStack = createStackNavigator({
  OngoingEventScreen,
  InviteScreen
}, { headerMode: 'none' })

const TargetScreenStack = createStackNavigator({
  TargetScreen,
  SingleTargetScreen
}, { headerMode: 'none' })

export default createMaterialTopTabNavigator({
  OngoingEventScreen: {
    screen: OngoingEventScreenStack,
    navigationOptions: {
      tabBarLabel: 'TAPAHTUMA',
      tabBarOptions: style,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='users' type='feather' color={tintColor} />
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
