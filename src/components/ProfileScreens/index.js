import React from 'react'
import { createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Icon } from 'react-native-elements'

import Invite from './ProfileTabs/Invite'
import InvitesScreen from './ProfileTabs/InvitesScreen'
import LicenseScreen from './ProfileTabs/LicenseScreen'
import ProfileScreen from './ProfileTabs/ProfileScreen'
import SettingsScreen from './ProfileTabs/SettingsScreen'

import LoginScreen from './LoginStack/LoginScreen'
import RegisterScreen from './LoginStack/RegisterScreen'
import ResetScreen from './LoginStack/ResetScreen'
import OpeningScreen from './LoginStack/OpeningScreen'

import colors from '../../styles/colors'

const style = {
  activeTintColor: '#fff',
  labelStyle: {
    fontWeight: 'bold',
    fontSize: 10
  },
  showIcon: true
}

const StackMessage = createStackNavigator();

function MessageStack() {
  return (
    <StackMessage.Navigator>
      <StackMessage.Screen name="Kutsut" component={InvitesScreen}/>
      <StackMessage.Screen name="Kutsu" component={Invite}/>
    </StackMessage.Navigator>
  )
}

const StackSettings = createStackNavigator();

function SettingsStack() {
  return (
    <StackSettings.Navigator>
      <StackSettings.Screen name="Asetukset" component={SettingsScreen}/>
      <StackSettings.Screen name="Lisenssi" component={LicenseScreen}/>
    </StackSettings.Navigator>
  )
}

const StackProfile = createMaterialTopTabNavigator();

function ProfileTabs() {
  return (
    <StackProfile.Navigator>
      <StackProfile.Screen name="Profiili" component={ProfileScreen}/>
      <StackProfile.Screen name="Kutsut" component={MessageStack}/>
      <StackProfile.Screen name="Asetukset" component={SettingsStack}/>
    </StackProfile.Navigator>
  )
}

const StackLogin = createStackNavigator();

function LoginStack() {
  return (
    <StackLogin.Navigator initialRouteName="Login" screenOptions={{ headerShown: false}} >
      <StackLogin.Screen name="LoginScreen" component={LoginScreen}/>
      <StackLogin.Screen name="ResetScreen" component={ResetScreen}/>
      <StackLogin.Screen name="RegisterScreen" component={RegisterScreen}/>
      <StackLogin.Screen name="ProfileTabs" component={ProfileTabs}/>
      <StackLogin.Screen name="Opening" component={OpeningScreen}/>
    </StackLogin.Navigator>
  )
}

export default LoginStack

// ?? navigationOptions= {{tabBarVisible: false}}

