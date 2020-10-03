import React from 'react'
import { createSwitchNavigator } from 'react-navigation'
import { MaterialTopTabBar } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { Icon } from 'react-native-elements'

import Invite from './ProfileTabs/Invite'
import InvitesScreen from './ProfileTabs/InvitesScreen'
import LicenseScreen from './ProfileTabs/LicenseScreen'
import ProfileScreen from './ProfileTabs/ProfileScreen'
import SettingsScreen from './ProfileTabs/SettingsScreen'

import LoginScreen from './LoginStack/LoginScreen'
import RegisterScreen from './LoginStack/RegisterScreen'
import ResetScreen from './LoginStack/ResetScreen'

import EventListScreen from '../EventScreens/EventMenuStack/EventListScreen'

import colors from '../../styles/colors'

const TabBarComponent = (props) => <MaterialTopTabBar {...props} />

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

const SettingsStack = createStackNavigator({
  SettingsScreen: {
    screen: SettingsScreen
  },
  LicenseScreen: {
    screen: LicenseScreen
  }
}, {
  headerMode: 'none'
})

const ProfileTabs = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  Conversations: {
    screen: MessageStack,
    navigationOptions: {
      headerTitle: 'Kutsut',
    }
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      headerTitle: 'Asetukset',
    }
  },
  EventListScreen2: {
    path: 'EventListScreen2',
    screen: EventListScreen,
    navigationOptions: {
      headerTitle: 'Omat tapahtumat',
    }
  }
})

const LoginStack = createSwitchNavigator({
  ProfileTabs: {
    screen: ProfileTabs
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
  headerMode: 'none',
  initialRouteName: 'LoginScreen'
})

export default LoginStack
