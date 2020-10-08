import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { connect } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import OngoingEventEntry from './components/OngoingEventScreens/OngoingEventEntry'
import MapScreen from './components/MapScreens/MapScreen'
import EventEntry from './components/EventScreens/EventEntry'
import ProfileScreens from './components/ProfileScreens'
import LoginStack from './components/ProfileScreens/LoginStack'
import { createStackNavigator } from '@react-navigation/stack'
import SettingsScreen from './components/ProfileScreens/ProfileTabs/SettingsScreen'
import EventListScreen from './components/EventScreens/EventMenuStack/EventListScreen'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Profiili" >
      <Tab.Screen name="Kartta" component={MapScreen} />
      <Tab.Screen name="Tapahtuma" component={EventEntry} />
      <Tab.Screen name="Tapahtumat" component={OngoingEventEntry} />
      <Tab.Screen name="Profiili" component={ProfileScreens} />
    </Tab.Navigator>
  )
}

function Navigator(props) {

  const LoggedInNavigator = (
    <Stack.Navigator initialRouteName="Profiili">
      <Stack.Screen name="Profiili" component={TabNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="Asetukset" component={SettingsScreen} />
      <Stack.Screen name="Sukellushistoria" component={EventListScreen} />
    </Stack.Navigator>
  )

  return (
    <NavigationContainer>
      { props.user ? LoggedInNavigator : <LoginStack />}
    </NavigationContainer>
  )
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(
  mapStateToProps
)(Navigator)
