import { createSwitchNavigator } from 'react-navigation'
import StartEventScreen from './StartEventScreen'
import DiveScreen from './DiveScreen'

export default createSwitchNavigator({
  StartEventScreen,
  DiveScreen
}, { headerMode: 'none' })
