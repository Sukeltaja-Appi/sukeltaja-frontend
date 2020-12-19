import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Invite from './ProfileTabs/Invite'
import InvitesScreen from './ProfileTabs/InvitesScreen'
import LicenseScreen from './ProfileTabs/LicenseScreen'
import ProfileScreen from './ProfileTabs/ProfileScreen'
import SettingsScreen from './ProfileTabs/SettingsScreen'
import EventListScreen from '../EventScreens/EventMenuStack/EventListScreen'
import PasswordChangeScreen from './ProfileTabs/PasswordChangeScreen'
import { LinearGradient } from 'expo-linear-gradient'
import { Header } from 'react-native/Libraries/NewAppScreen'

const StackMessage = createStackNavigator()

function MessageStack() {
  return (
    <StackMessage.Navigator>
      <StackMessage.Screen name="Kutsut" component={InvitesScreen} />
      <StackMessage.Screen name="Kutsu" component={Invite} />
    </StackMessage.Navigator>
  )
}

const StackSettings = createStackNavigator()

function SettingsStack() {
  return (
    <StackSettings.Navigator>
      <StackSettings.Screen name="Asetukset" component={SettingsScreen} />
      <StackSettings.Screen name="Lisenssit" component={LicenseScreen} />
      <StackSettings.Screen name="SalasananVaihto" component={PasswordChangeScreen} />
    </StackSettings.Navigator>
  )
}

const Profile = createStackNavigator()

function ProfileStack() {
  return (
    <Profile.Navigator initialRouteName="Profiili" screenOptions={{ headerBackground: () => ( <LinearGradient
      colors={['#118bfc', '#12bcff']}
      start={[0, 0]}
      end={[1, 1]}
      style={{
        height: '100%',
      }}
    /> ), headerTintColor: '#fff', headerTitleAlign: 'center',
    headerTitleStyle: { fontFamily: 'nunito-bold' } }}>
      <Profile.Screen name="Profiili" component={ProfileScreen} options={{ headerShown: false }}/>
      <Profile.Screen name="Kutsut" component={MessageStack} />
      <Profile.Screen name="Asetukset" component={SettingsStack} />
      <Profile.Screen name="Sukellushistoria" component={EventListScreen} />
    </Profile.Navigator>
  )
}

export default ProfileStack
