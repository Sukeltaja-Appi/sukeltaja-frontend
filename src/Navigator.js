import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MapScreen from './components/MapScreens/MapScreen'
import EventMenuStack from './components/EventScreens/index'
import ProfileScreens from './components/ProfileScreens'
import LoginStack from './components/ProfileScreens/LoginStack'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialIcons, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons'
import OngoingEventTabs from './components/OngoingEventScreens/'
import EventInfoForm from './components/EventScreens/EventMenuStack/EventInfoForm'
import SelectTargetScreen from './components/MapScreens/SelectTargetScreen'
import { LinearGradient } from 'expo-linear-gradient'

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
        component={OngoingEventTabs}
        options={({ navigation }) => ({
          title: '',
          headerBackImage: () => (
            <Fontisto
              name="arrow-left-l"
              size={38}
              color="#118BFC"
            />),
          headerRight: () => (
            <View style={style.headerViewStyle}>
              <TouchableOpacity onPress={() => navigation.navigate('Info')}
                style={style.iconWithTextView}
              >
                <MaterialIcons
                  name="info-outline"
                  size={26}
                  color="#118BFC"
                />
                <Text style={style.iconTextStyle}>
                  Info
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Sukella')}
                style={style.iconWithTextView}
              >
                <MaterialCommunityIcons
                  name="waves"
                  size={26}
                  color="#118BFC"
                />
                <Text style={style.iconTextStyle}>
                  Sukella
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Chat')}
                style={style.iconWithTextView}
              >
                <MaterialIcons
                  name="chat"
                  size={26}
                  color="#118BFC"
                />
                <Text style={style.iconTextStyle}>
                  Chat
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Kutsu osallistujia')}
                style={style.iconWithTextView}
              >
                <MaterialIcons
                  name="person-add"
                  size={26}
                  color="#118BFC"
                />
                <Text style={style.iconTextStyle}>
                  Kutsu
                </Text>
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen options={{ headerBackground: () => ( <LinearGradient
        colors={['#118bfc', '#12bcff']}
        style={{
          height: '100%',
        }}
      /> ), headerTintColor: '#fff', headerTitleAlign: 'center',
      headerTitleStyle: { fontFamily: 'nunito-bold' } }}
      name="Luo tapahtuma"
      component={EventInfoForm}
      />
      <Stack.Screen
        name="Muokkaa tapahtumaa"
        component={EventInfoForm}
      />
      <Stack.Screen
        name="Valitse sijainti"
        component={SelectTargetScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )

  return (
    <NavigationContainer>
      {props.user ? LoggedInNavigator : <LoginStack />}
    </NavigationContainer>
  )
}

const style = StyleSheet.create({
  iconWithTextView: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
  },
  iconTextStyle: {
    color: '#118BFC',
    fontFamily: 'nunito-bold'
  },
  headerViewStyle: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 220,
  },
})

const mapStateToProps = (state) => ({ user: state.user })

export default connect(mapStateToProps)(Navigator)
