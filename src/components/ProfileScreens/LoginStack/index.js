import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './LoginScreen'
import ResetScreen from './ResetScreen'
import RegisterScreen from './RegisterScreen'
import OpeningScreen from './OpeningScreen'

const Stack = createStackNavigator()

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName="Opening" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ResetScreen" component={ResetScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Opening" component={OpeningScreen} />
    </Stack.Navigator>
  )
}

export default LoginStack
