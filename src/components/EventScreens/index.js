import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import EditEventScreen from './EventMenuStack/EditEventScreen'
import Event from './EventMenuStack/Event'
import EventListScreen from './EventMenuStack/EventListScreen'
import EventMenuScreen from './EventMenuStack/EventMenuScreen'
import EventInfoForm from './../common/EventInfoForm'
import CustomTargetScreen from '../OngoingEventScreens/OngoingEventTabs/CustomTargetScreen'
import InviteScreen from './../OngoingEventScreens/OngoingEventTabs/InviteScreen'

const EventMenu = createStackNavigator()

function EventMenuStack() {
  return (
    <EventMenu.Navigator>
      <EventMenu.Screen name="Tapahtumat" component={EventMenuScreen} />
      <EventMenu.Screen name="Omat tapahtumat" component={EventListScreen} />
      <EventMenu.Screen name="Tapahtumasivu" component={Event} />
      <EventMenu.Screen name="Muokkaa tapahtumaa" component={EditEventScreen} />
      <EventMenu.Screen name="Luo tapahtuma" component={EventInfoForm} />
      <EventMenu.Screen name="Valitse sijainti" component={CustomTargetScreen} />
    </EventMenu.Navigator>
  )
}

export default EventMenuStack
