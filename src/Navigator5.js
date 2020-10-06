import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { connect } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import OngoingEventEntry from './components/OngoingEventScreens/OngoingEventEntry'
import MapScreen from './components/MapScreens/MapScreen'
import EventEntry from './components/EventScreens/EventEntry'
import ProfileScreens from './components/ProfileScreens'
import { login } from './reducers/userReducer'
import { initializeEvents } from './reducers/eventReducer'
import { initializeDives } from './reducers/diveReducer'
import { getAll } from './reducers/targetReducer'
import { Icon } from 'react-native-elements'
import LoginStack from './components/ProfileScreens/LoginStack'

import colors from './styles/colors'

const Tab = createBottomTabNavigator()

function Navigator(props) {

  const LoggedInNavigator = (
    <Tab.Navigator initialRouteName="Profiili">
      <Tab.Screen name="Kartta" component={MapScreen} />
      <Tab.Screen name="Tapahtuma" component={EventEntry} />
      <Tab.Screen name="Tapahtumat" component={OngoingEventEntry} />
      <Tab.Screen name="Profiili" component={ProfileScreens} />
    </Tab.Navigator>
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


// ?? screenOptions={{ tabBarVisible: false }}
