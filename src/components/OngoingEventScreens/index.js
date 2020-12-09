import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ChatScreen from './OngoingEventTabs/ChatScreen'
import ChatMessage from './OngoingEventTabs/ChatMessage'
import DiveScreen from './OngoingEventTabs/DiveScreenStack/DiveScreen'
import DiveListScreen from './OngoingEventTabs/DiveScreenStack/DiveListScreen'
import Dive from './OngoingEventTabs/DiveScreenStack/Dive'
import EditDiveScreen from './OngoingEventTabs/DiveScreenStack/EditDiveScreen'
import EventScreen from './OngoingEventTabs/EventScreen'
import InviteScreen from './OngoingEventTabs/InviteScreen'
import CreateDiveForm from './OngoingEventTabs/DiveScreenStack/CreateDiveForm'
//poista InviteScreen kun EventScreen muutettu
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
      <DiveScreenStackNav.Screen name="DiveListScreen" component={DiveListScreen} />
      <DiveScreenStackNav.Screen name="DiveScreen" component={DiveScreen} />
      <DiveScreenStackNav.Screen name="CreateDiveForm" component={CreateDiveForm} />
      <DiveScreenStackNav.Screen name="Dive" component={Dive} />
      <DiveScreenStackNav.Screen name="EditDiveScreen" component={EditDiveScreen} />
    </DiveScreenStackNav.Navigator>
  )
}

const OngoingEventTabsNav = createStackNavigator()

const OngoingEventTabs = () => {
  return (
    <OngoingEventTabsNav.Navigator>
      <OngoingEventTabsNav.Screen name="Info"
        component={EventScreenStack}
        options={{ animationEnabled: false }}
      />
      <OngoingEventTabsNav.Screen name="Sukella"
        component={DiveScreenStack}
        options={{ animationEnabled: false }}
      />
      <OngoingEventTabsNav.Screen name="Chat"
        component={ChatScreenStack}
        options={{ animationEnabled: false }}
      />
      <OngoingEventTabsNav.Screen name="Kutsu osallistujia"
        component={InviteScreen}
        options={{ animationEnabled: false }}
      />
    </OngoingEventTabsNav.Navigator>
  )
}

export default OngoingEventTabs
