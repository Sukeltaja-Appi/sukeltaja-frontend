import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MapScreen from './components/MapScreens/MapScreen'
import EventMenuStack from './components/EventScreens/index'
import ProfileScreens from './components/ProfileScreens'
import LoginStack from './components/ProfileScreens/LoginStack'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import OngoingEventEntry from './components/OngoingEventScreens/OngoingEventEntry'
import EventInfoForm from './components/EventScreens/EventMenuStack/EventInfoForm'
import CustomTargetScreen from './components/OngoingEventScreens/OngoingEventTabs/CustomTargetScreen'

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
      <Stack.Screen
        name="Tapahtuma"
        component={OngoingEventEntry}
        options={({ navigation }) => ({
          headerRight: () => (
            <View style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent:'space-between' }}>
              <MaterialIcons
                onPress={() => navigation.navigate('Info')}
                name="info-outline"
                size={26}
                color="#118BFC"
                style={{ padding: 10 }}
              />
              <MaterialCommunityIcons
                onPress={() => navigation.navigate('Sukella')}
                name="waves"
                size={26}
                color="#118BFC"
                style={{ padding: 10 }}
              />
              <MaterialIcons
                onPress={() => navigation.navigate('Chat')}
                name="chat"
                size={26}
                color="#118BFC"
                style={{ padding: 10 }}
              />
              <MaterialIcons
                onPress={() => navigation.navigate('Kohde')}
                name="location-on"
                size={26}
                color="#118BFC"
                style={{ padding: 10 }}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Luo tapahtuma"
        component={EventInfoForm}
      />
      <Stack.Screen
        name="Muokkaa tapahtumaa"
        component={EventInfoForm}
      />
      <Stack.Screen
        name="Valitse sijainti"
        component={CustomTargetScreen}
      />
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
