import { createStackNavigator } from 'react-navigation'
import OngoingEventScreen from './OngoingEventScreen'
import DiveScreen from './DiveScreen'

export default createStackNavigator({
  OngoingEventScreen: {
    screen: OngoingEventScreen,
    navigationOptions: {
      headerBackTitle: null,
      header: null
    }
  },
  DiveScreen
}, {
  defaultNavigationOptions: {
    headerTitleStyle: {
      flexBasis: '100%'
    }
  }
})
