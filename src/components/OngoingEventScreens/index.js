import React from 'react'
import { createMaterialTopTabNavigator, MaterialTopTabBar } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaView } from 'react-native-safe-area-context'

import CustomTargetScreen from './OngoingEventTabs/CustomTargetScreen'
import ChatScreen from './OngoingEventTabs/ChatScreen'
import ChatMessage from './OngoingEventTabs/ChatMessage'
import DiveScreen from './OngoingEventTabs/DiveScreenStack/DiveScreen'
import DiveListScreen from './OngoingEventTabs/DiveScreenStack/DiveListScreen'
import CreateDiveScreen from './OngoingEventTabs/DiveScreenStack/CreateDiveScreen'
import Dive from './OngoingEventTabs/DiveScreenStack/Dive'
import EditDiveScreen from './OngoingEventTabs/DiveScreenStack/EditDiveScreen'
import EventScreen from './OngoingEventTabs/EventScreen'
import InviteScreen from './OngoingEventTabs/InviteScreen'
import TargetScreen from './OngoingEventTabs/TargetScreen'

import Target from '../common/Target'

const EventScreenStackNav = createStackNavigator()
const EventScreenStack = () => {
  return (
    <EventScreenStackNav.Navigator screenOptions={{ headerShown: false }} >
      <EventScreenStackNav.Screen name="EventScreen" component={EventScreen} />
      <EventScreenStackNav.Screen name="InviteScreen" component={InviteScreen} />
    </EventScreenStackNav.Navigator>
  )
}

const ChatScreenStackNav = createStackNavigator()
const ChatScreenStack = () => {
  return (
    <ChatScreenStackNav.Navigator screenOptions={{ headerShown: false }} >
      <ChatScreenStackNav.Screen name="ChatScreen" component={ChatScreen} />
      <ChatScreenStackNav.Screen name="ChatMessage" component={ChatMessage} />
    </ChatScreenStackNav.Navigator>
  )
}

const DiveScreenStackNav = createStackNavigator()
const DiveScreenStack = () => {
  return (
    <DiveScreenStackNav.Navigator screenOptions={{ headerShown: false }} >
      <DiveScreenStackNav.Screen name="DiveScreen" component={DiveScreen} />
      <DiveScreenStackNav.Screen name="DiveListScreen" component={DiveListScreen} />
      <DiveScreenStackNav.Screen name="CreateDiveScreen" component={CreateDiveScreen} />
      <DiveScreenStackNav.Screen name="Dive" component={Dive} />
      <DiveScreenStackNav.Screen name="EditDiveScreen" component={EditDiveScreen} />
    </DiveScreenStackNav.Navigator>
  )
}

const TargetScreenStackNav = createStackNavigator()
const TargetScreenStack = () => {
  return (
    <TargetScreenStackNav.Navigator screenOptions={{ headerShown: false }} >
      <TargetScreenStackNav.Screen name="TargetScreen" component={TargetScreen} />
      <TargetScreenStackNav.Screen name="Target" component={Target} />
      <TargetScreenStackNav.Screen name="CustomTargetScreen" component={CustomTargetScreen} />
    </TargetScreenStackNav.Navigator>
  )
}

const SafeAreaMaterialTopTabBar = ({ ...props }) => (
  <SafeAreaView>
    <MaterialTopTabBar {...props} />
  </SafeAreaView>
)

const OngoingEventTabsNav = createMaterialTopTabNavigator()

const OngoingEventTabs = () => {
  return (
    <OngoingEventTabsNav.Navigator>
      <OngoingEventTabsNav.Screen name="Info" component={EventScreenStack} />
      <OngoingEventTabsNav.Screen name="Sukella" component={DiveScreenStack} />
      <OngoingEventTabsNav.Screen name="Chat" component={ChatScreenStack} />
      <OngoingEventTabsNav.Screen name="Kohde" component={TargetScreenStack} />
    </OngoingEventTabsNav.Navigator>
  )
}

export default OngoingEventTabs
