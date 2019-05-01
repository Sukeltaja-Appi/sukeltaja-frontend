import React from 'react'
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
  MaterialTopTabBar
} from 'react-navigation'
import { Icon } from 'react-native-elements'

import Invite from './ProfileTabs/Invite'
import InvitesScreen from './ProfileTabs/InvitesScreen'
import ProfileScreen from './ProfileTabs/ProfileScreen'
//import SettingsScreen from './ProfileTabs/SettingsScreen'

import LoginScreen from './LoginStack/LoginScreen'
import RegisterScreen from './LoginStack/RegisterScreen'
import ResetScreen from './LoginStack/ResetScreen'

import colors from '../../styles/colors'

const TabBarComponent = (props) => <MaterialTopTabBar { ...props } />

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

const ProfileTabs = createMaterialTopTabNavigator({
  Profile : {
    screen: ProfileScreen,
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
  // Settings : {
  //   screen: SettingsScreen,
  //   navigationOptions: {
  //     tabBarLabel: 'ASETUKSET',
  //     tabBarOptions: style,
  //     tabBarIcon: ({ tintColor }) => (
  //       <Icon name='settings' type='feather' color={tintColor} />
  //     )
  //   }
  // }
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
