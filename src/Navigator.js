import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { connect } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MapScreen from './components/MapScreens/MapScreen'
import EventMenuStack from './components/EventScreens/index'
import ProfileScreens from './components/ProfileScreens'
import LoginStack from './components/ProfileScreens/LoginStack'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialIcons } from '@expo/vector-icons'
import OngoingEventEntry from './components/OngoingEventScreens/OngoingEventEntry'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Profiili"
      tabBarOptions={{
        labelStyle: {
          fontFamily: 'nunito-bold',
          fontSize: 12,
          textTransform: 'uppercase',
          marginBottom: 5,
        },
        style: {
          height: 55,
        },
        iconStyle: {
          marginBottom: -5,
        },
        activeTintColor: '#118BFC',
      }}
      t
    >
      <Tab.Screen
        name="Kartta"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="room" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tapahtumat"
        component={EventMenuStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="event" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profiili"
        component={ProfileScreens}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-circle" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

function Navigator(props) {
  const LoggedInNavigator = (
    <Stack.Navigator initialRouteName="Profiili">
      <Stack.Screen
        name="Profiili"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Tapahtuma" component={OngoingEventEntry}/>
    </Stack.Navigator>
  )

  return (
    <NavigationContainer>
      {props.user ? LoggedInNavigator : <LoginStack />}
    </NavigationContainer>
  )
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(mapStateToProps)(Navigator)
