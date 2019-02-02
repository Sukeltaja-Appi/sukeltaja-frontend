import { createStackNavigator } from 'react-navigation'
import EventScreen from './EventScreen'
import OngoingEventScreen from './OngoingEventScreen'

export default createStackNavigator({
  EventScreen,
  OngoingEventScreen
})
