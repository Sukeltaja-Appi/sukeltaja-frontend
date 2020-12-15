import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'

import DiveScreen from './DiveScreen'
import DiveListScreen from './DiveListScreen'
import Dive from './Dive'
import { endDives } from '../../../../reducers/diveReducer'
import { getOngoingEvent } from '../../../../reducers/eventReducer'
import DiveForm from './DiveForm'

const DiveScreenStackNav = createStackNavigator()
const DiveScreenStack = ({ navigation, ongoingDives }) => {

  if (ongoingDives.length) {
    // Force to dive screen when there's active dives
    return (
      <DiveScreenStackNav.Navigator screenOptions={{ headerShown: false }} >
        <DiveScreenStackNav.Screen name="DiveScreen" component={DiveScreen} />
      </DiveScreenStackNav.Navigator>
    )
  }

  return (
    <DiveScreenStackNav.Navigator screenOptions={{ headerShown: false }} >
      <DiveScreenStackNav.Screen name="DiveListScreen" component={DiveListScreen} />
      <DiveScreenStackNav.Screen name="DiveScreen" component={DiveScreen} />
      <DiveScreenStackNav.Screen name="CreateDiveForm" component={DiveForm} />
      <DiveScreenStackNav.Screen name="Dive" component={Dive} />
      <DiveScreenStackNav.Screen name="EditDiveForm" component={DiveForm} />
    </DiveScreenStackNav.Navigator>
  )
}

const mapStateToProps = (state) => ({
  ongoingDives: state.ongoingDives,
  ongoingEvent: state.ongoingEvent,
  user: state.user,
})

export default connect(mapStateToProps, {
  endDives,
  getOngoingEvent,
})(DiveScreenStack)

