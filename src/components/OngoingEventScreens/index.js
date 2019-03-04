import React from 'react'
import {
  createSwitchNavigator,
  MaterialTopTabBar,
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation'

import StartEventScreen from './StartEventScreen'
import OngoingEventScreen from './OngoingEventScreen'
import InviteScreen from './InviteScreen'
import DiveScreen from './DiveScreen'
import TargetScreen from './TargetScreen'

import { Icon } from 'react-native-elements'

import colors from '../../styles/colors'

const TabBarComponent = (props) => (<MaterialTopTabBar { ...props } />)

const style = {
  activeTintColor: '#fff',
  labelStyle: {
    fontWeight: 'bold',
    fontSize: 10
  },
  showIcon: true
}

const OngoingEventScreenStack = createStackNavigator ({
  OngoingEventScreen,
  InviteScreen
}, { headerMode: 'none' })

const OngoingEventTab = createMaterialTopTabNavigator({
  TargetScreen : {
    screen: TargetScreen,
    navigationOptions: {
      tabBarLabel: 'KOHDE',
      tabBarOptions: style,
      showIcon: true,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='map-pin' type='feather' color={tintColor} />
      )
    }
  },
  DiveScreen : {
    screen: DiveScreen,
    navigationOptions: {
      tabBarLabel: 'SUKELLUKSET',
      tabBarOptions: style,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='sunset' type='feather' color={tintColor} />
      )
    }
  },
  OngoingEventScreen : {
    screen: OngoingEventScreenStack,
    navigationOptions: {
      tabBarLabel: 'TAPAHTUMA',
      tabBarOptions: style,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='users' type='feather' color={tintColor} />
      )
    }
  }
}, {
  tabBarComponent: props => {
    return(
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

export default createSwitchNavigator({
  StartEventScreen,
  OngoingEventTab
}, { headerMode: 'none' })
