import { createStackNavigator } from 'react-navigation'
import MainMapScreen from './MainMapScreen'

export default createStackNavigator({
  EventMenuScreen: {
    screen: MainMapScreen,
    navigationOptions: {
      headerTitle: 'Kartta',
      headerBackTitle: null
    }
  }
}, {
  defaultNavigationOptions: {
    headerTitleStyle: {
      flexBasis: '100%'
    }
  }
})
