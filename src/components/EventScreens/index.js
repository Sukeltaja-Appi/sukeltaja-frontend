import { createStackNavigator } from 'react-navigation'
import EventMenuScreen from './EventMenuScreen'
import CreateEventScreen from './CreateEventScreen'
import EventListScreen from './EventListScreen'
import EditEventScreen from './EditEventScreen'
import Event from './Event'

export default createStackNavigator({
  EventMenuScreen: {
    screen: EventMenuScreen,
    navigationOptions: {
      headerTitle: 'Tapahtumat'
    }
  },
  EventListScreen: {
    screen: EventListScreen,
    navigationOptions: {
      headerTitle: 'Omat tapahtumat'
    }
  },
  Event: {
    screen: Event,
    navigationOptions: {
      headerTitle: 'Tapahtumasivu'
    }
  },
  EditEventScreen: {
    screen: EditEventScreen,
    navigationOptions: {
      headerTitle: 'Muokkaa tapahtumaa'
    }
  },
  CreateEventScreen: {
    screen: CreateEventScreen,
    navigationOptions: {
      headerTitle: 'Luo tapahtuma'
    }
  }
}, {
  headerBackTitleVisible: false
})
