import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
import StartEventScreen from './StartEventScreen'
import OngoingEventScreen from './OngoingEventScreen'
import DiveScreen from './DiveScreen'

const OngoingEventStack = createStackNavigator({
  OngoingEventScreen : {
    screen: OngoingEventScreen,
    navigationOptions: {
      headerBackTitle: null,
      header: null
    }
  },
  DiveScreen
})

export default createSwitchNavigator({
  StartEventScreen,
  OngoingEventStack
}, { headerMode: 'none' })
