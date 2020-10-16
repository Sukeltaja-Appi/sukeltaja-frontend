import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator, MaterialTopTabBar } from '@react-navigation/material-top-tabs'
import CreateEventScreen from './EventMenuStack/CreateEventScreen'
import EditEventScreen from './EventMenuStack/EditEventScreen'
import Event from './EventMenuStack/Event'
import EventListScreen from './EventMenuStack/EventListScreen'
import EventListScreen5 from './EventMenuStack/EventListScreen5'
import EventMenuScreen from './EventMenuStack/EventMenuScreen'
import Invite from '../ProfileScreens/ProfileTabs/Invite'
import InvitesScreen from '../ProfileScreens/ProfileTabs/InvitesScreen'
import { SafeAreaView } from 'react-native-safe-area-context'
import OngoingEventEntry from '../OngoingEventScreens/OngoingEventEntry'

const EventMenu = createStackNavigator()

function OwnEventStack() {
  return (
    <EventMenu.Navigator initialRouteName="Omat tapahtumat">
      <EventMenu.Screen name="Omat tapahtumat" component={EventListScreen5} options={{ headerShown: false }}/>
      <EventMenu.Screen name="Tapahtumasivu" component={Event} />
      <EventMenu.Screen name="Muokkaa tapahtumaa" component={EditEventScreen} />
      <EventMenu.Screen name="Luo tapahtuma" component={CreateEventScreen} />
    </EventMenu.Navigator>
  )
}

const ActiveInvites = createStackNavigator()

function ActiveInvitesStack() {
  return (
    <ActiveInvites.Navigator>
      <ActiveInvites.Screen name="Kutsut" component={InvitesScreen} options={{ headerShown: false }}/>
      <ActiveInvites.Screen name="Kutsu" component={Invite} />
    </ActiveInvites.Navigator>
  )
}

const SafeAreaMaterialTopTabBar = ({ ...props }) => (
  <SafeAreaView>
    <MaterialTopTabBar {...props} />
  </SafeAreaView>
)

const TopBarComponent = createMaterialTopTabNavigator()

function TopBarTabs() {
  return (
    <TopBarComponent.Navigator tabBar={props => <SafeAreaMaterialTopTabBar {...props} />}>
      <TopBarComponent.Screen name="Tapahtumat" component={OwnEventStack} />
      <TopBarComponent.Screen name="Kutsut" component={ActiveInvitesStack} />
    </TopBarComponent.Navigator>

  )
}

const EventMenuStack = createStackNavigator()

function EventStack() {
  return (
    <EventMenuStack.Navigator>
      <EventMenuStack.Screen name="yläpalkki" component={TopBarTabs} options={{ headerShown: false }} />
    </EventMenuStack.Navigator>
  )
}

export default EventStack
