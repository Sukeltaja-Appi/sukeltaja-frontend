import { createStackNavigator } from 'react-navigation'
import EventMenuScreen from './EventMenuScreen'
import EventListScreen from './EventListScreen'
import Event from './Event'

export default createStackNavigator({
  EventMenuScreen: {
    screen: EventMenuScreen,
    navigationOptions: {
      headerTitle: 'Tapahtumat',
      headerBackTitle: null
    }
  },
  EventListScreen: {
    screen: EventListScreen,
    navigationOptions: {
      headerTitle: 'Omat tapahtumat',
      headerBackTitle: null
    }
  },
  Event: {
    screen: Event,
    navigationOptions: {
      headerTitle: 'Tapahtumasivu'
    }
  }
})
