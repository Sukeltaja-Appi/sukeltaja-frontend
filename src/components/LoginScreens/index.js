import React from 'react'
import { createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Icon } from 'react-native-elements'

import LoginScreen from '../LoginScreens/LoginStack/LoginScreen'
import RegisterScreen from '../LoginScreens/LoginStack/RegisterScreen'
import ResetScreen from '../LoginScreens/LoginStack/ResetScreen'
import OpeningScreen from '../LoginScreens/LoginStack/OpeningScreen'

import colors from '../../styles/colors'

const style = {
  activeTintColor: '#fff',
  labelStyle: {
    fontWeight: 'bold',
    fontSize: 10
  },
  showIcon: true
}

const StackLogin = createStackNavigator()

function LoginStack() {
  return (
    <StackLogin.Navigator initialRouteName="Opening" screenOptions={{ headerShown: false }} >
      <StackLogin.Screen name="LoginScreen" component={LoginScreen}/>
      <StackLogin.Screen name="ResetScreen" component={ResetScreen}/>
      <StackLogin.Screen name="RegisterScreen" component={RegisterScreen}/>
      <StackLogin.Screen name="Opening" component={OpeningScreen}/>
    </StackLogin.Navigator>
  )
}

export default LoginStack

// ?? navigationOptions= {{tabBarVisible: false}}

