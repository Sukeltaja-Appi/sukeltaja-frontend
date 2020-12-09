import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { SafeAreaView } from 'react-native-safe-area-context'
import EventListScreen from './EventMenuStack/EventListScreen'
import InvitesScreen from '../ProfileScreens/ProfileTabs/InvitesScreen'
import Invite from '../ProfileScreens/ProfileTabs/Invite'
import { LinearGradient } from 'expo-linear-gradient'

const Tab = createMaterialTopTabNavigator()

const EventMenuTabs = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#118bfc' }} >
      <LinearGradient
        colors={['#118bfc', '#12bcff']}
        style={{
          height: '100%',
        }}
      >
        <Tab.Navigator tabBarOptions={{ style: { backgroundColor: 'transparent' }, activeTintColor: '#fff',
          inactiveTintColor: '#fff', labelStyle:{ fontFamily: 'nunito-bold' },
          indicatorStyle:{ backgroundColor: '#fff' } }} >
          <Tab.Screen name="Tapahtumat" component={EventMenuStack} />
          <Tab.Screen name="Kutsut" component={InviteStack} />
        </Tab.Navigator>
      </LinearGradient>
    </SafeAreaView >
  )
}

const EventMenu = createStackNavigator()

function EventMenuStack() {
  return (
    <EventMenu.Navigator screenOptions={{ headerShown: false }}>
      <EventMenu.Screen name="Omat tapahtumat" component={EventListScreen} />
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
