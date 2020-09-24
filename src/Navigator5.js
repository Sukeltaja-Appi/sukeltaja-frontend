import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OngoingEventEntry from './components/OngoingEventScreens/OngoingEventEntry'
import MapScreen from './components/MapScreens/MapScreen'
import EventEntry from './components/EventScreens/EventEntry'
import ProfileScreens from './components/ProfileScreens'

import { Icon } from 'react-native-elements'

import colors from './styles/colors'
import { ProfileScreen } from './components/ProfileScreens/ProfileTabs/ProfileScreen';


const Tab = createBottomTabNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Profiili">
        <Tab.Screen name="Kartta" component={MapScreen} />
        <Tab.Screen name="Tapahtuma" component={EventEntry} />
        <Tab.Screen name="Tapahtumat" component={OngoingEventEntry} />
        <Tab.Screen name="Profiili" component={ProfileScreens} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigator
