import React from 'react'
import {
  createSwitchNavigator,
  MaterialTopTabBar,
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation'

import ProfileMainScreen from './UserTab/ProfileMainScreen'
import InvitesScreen from './UserTab/InvitesScreen'
import Invite from './UserTab/Invite'
import UserSettingsScreen from './UserTab/UserSettingsScreen'

import LoginScreen from './LoginStack/LoginScreen'
import ResetScreen from './LoginStack/ResetScreen'
import RegisterScreen from './LoginStack/RegisterScreen'

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

const LoginStack = createSwitchNavigator({
  UserTab: {
    screen: UserTab
  },
  LoginScreen: {
    screen: LoginScreen
  },
  ResetScreen: {
    screen: ResetScreen
  },
  RegisterScreen: {
    screen: RegisterScreen
  }
}, {
  headerMode: 'none'
})

export default LoginStack