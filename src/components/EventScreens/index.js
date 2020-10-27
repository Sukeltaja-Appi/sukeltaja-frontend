import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator, MaterialTopTabBar } from '@react-navigation/material-top-tabs'
import { SafeAreaView } from 'react-native-safe-area-context'
import CreateEventScreen from './EventMenuStack/CreateEventScreen'
import EditEventScreen from './EventMenuStack/EditEventScreen'
import Event from './EventMenuStack/Event'
import EventListScreen from './EventMenuStack/EventListScreen'
import EventListScreen5 from './EventMenuStack/EventListScreen5'
import InvitesScreen from '../ProfileScreens/ProfileTabs/InvitesScreen'
import Invite from '../ProfileScreens/ProfileTabs/Invite'
import { SafeAreaView } from 'react-native-safe-area-context'

const Tab = createMaterialTopTabNavigator()

const EventMenuTabs = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} >
      <Tab.Navigator>
        <Tab.Screen name="Tapahtumat" component={EventMenuStack} />
        <Tab.Screen name="Kutsut" component={InviteStack} />
      </Tab.Navigator>
    </SafeAreaView >
  )
}

const EventMenu = createStackNavigator()

function EventMenuStack() {
  return (
    <EventMenu.Navigator screenOptions={{ headerShown: false }}>
      <EventMenu.Screen name="Omat tapahtumat" component={EventListScreen5} />
      <EventMenu.Screen name="Tapahtumasivu" component={Event} />
      <EventMenu.Screen name="Muokkaa tapahtumaa" component={EditEventScreen} />
      <EventMenu.Screen name="Luo tapahtuma" component={CreateEventScreen} />
    </EventMenu.Navigator>
  )
}

const InviteStackNav = createStackNavigator()

function InviteStack() {
  return (
    <InviteStackNav.Navigator screenOptions={{ headerShown: false }}>
      <InviteStackNav.Screen name="Kutsut" component={InvitesScreen} />
      <InviteStackNav.Screen name="Kutsu" component={Invite} />
    </InviteStackNav.Navigator>
  )
}

export default EventMenuTabs
