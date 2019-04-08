import React from 'react'
import {
  createSwitchNavigator,
  MaterialTopTabBar,
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation'

import ProfileMainScreen from './ProfileMainScreen'
import InvitesScreen from './InvitesScreen'
import Invite from './Invite'
import UserSettingsScreen from './UserSettingsScreen'
import LoginScreen from './LoginScreen'

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

const MessageStack = createStackNavigator({
  InvitesScreen: {
    screen: InvitesScreen
  },
  Invite: {
    screen: Invite
  }
}, {
  headerMode: 'none'
})

const UserTab = createMaterialTopTabNavigator({
  ProfileMain : {
    screen: ProfileMainScreen,
    navigationOptions: {
      tabBarLabel: 'PROFIILI',
      tabBarOptions: style,
      showIcon: true,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='home' type='feather' color={tintColor} />
      )
    }
  },
  Conversations : {
    screen: MessageStack,
    navigationOptions: {
      tabBarLabel: 'KUTSUT',
      tabBarOptions: style,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='inbox' type='feather' color={tintColor} />
      )
    }
  },
  Settings : {
    screen: UserSettingsScreen,
    navigationOptions: {
      tabBarLabel: 'ASETUKSET',
      tabBarOptions: style,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='settings' type='feather' color={tintColor} />
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
  UserTab: {
    screen: UserTab
  },
  LoginScreen: {
    screen: LoginScreen
  }
}, {
  headerMode: 'none'
})
