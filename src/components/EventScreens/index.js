import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CreateEventScreen from './EventMenuStack/CreateEventScreen'
import EditEventScreen from './EventMenuStack/EditEventScreen'
import Event from './EventMenuStack/Event'
import EventListScreen from './EventMenuStack/EventListScreen'
import EventListScreen5 from './EventMenuStack/EventListScreen5'
import EventMenuScreen from './EventMenuStack/EventMenuScreen'

const EventMenu = createStackNavigator()

function EventMenuStack() {
  return (
    <EventMenu.Navigator>
      <EventMenu.Screen name="Omat tapahtumat" component={EventListScreen5} />
      <EventMenu.Screen name="Tapahtumasivu" component={Event} />
      <EventMenu.Screen name="Muokkaa tapahtumaa" component={EditEventScreen} />
      <EventMenu.Screen name="Luo tapahtuma" component={CreateEventScreen} />
    </EventMenu.Navigator>
  )
}

export default EventMenuStack

// tämän pitäisi olla turha tässä välissä
//       <EventMenu.Screen name="Tapahtumat" component={EventMenuScreen} />
