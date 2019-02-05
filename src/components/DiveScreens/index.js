import { createSwitchNavigator } from 'react-navigation'
import DiveScreen from './DiveScreen'
import OngoingDiveScreen from './OngoingDiveScreen'

export default createSwitchNavigator({
  DiveScreen,
  OngoingDiveScreen
}, { headerMode: 'none' })
