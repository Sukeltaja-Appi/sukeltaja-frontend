import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ChatScreen from './OngoingEventTabs/ChatScreen'
import ChatMessage from './OngoingEventTabs/ChatMessage'
import DiveScreenStack from './OngoingEventTabs/DiveScreenStack/index'
import EventScreen from './OngoingEventTabs/EventScreen'
import InviteScreen from './OngoingEventTabs/InviteScreen'

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
