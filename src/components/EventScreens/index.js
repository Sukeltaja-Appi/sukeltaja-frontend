import { createStackNavigator } from 'react-navigation-stack'

import CreateEventScreen from './EventMenuStack/CreateEventScreen'
import EditEventScreen from './EventMenuStack/EditEventScreen'
import Event from './EventMenuStack/Event'
import EventListScreen from './EventMenuStack/EventListScreen'
import EventMenuScreen from './EventMenuStack/EventMenuScreen'
import EventInfoForm from './../common/EventInfoForm'
import CustomTargetScreen from '../OngoingEventScreens/OngoingEventTabs/CustomTargetScreen'
import InviteScreen from './../OngoingEventScreens/OngoingEventTabs/InviteScreen'

const EventMenuStack = createStackNavigator({
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
  },
  EventInfoScreen: {
    screen: EventInfoForm,
    navigationOptions: {
      headerTitle: 'Uusi tapahtuma'
    }
  },
  CustomTargetScreen: {
    screen: CustomTargetScreen,
    navigationOptions: {
      headerTitle: 'Valitse sijainti'
    }
  },
  InviteScreen: {
    screen: InviteScreen,
    navigationOptions: {
      headerTitle: 'Kutsu osallistujia'
    }
  }
}, {
  defaultNavigationOptions: {
    headerTitleStyle: {
      flexBasis: '100%'
    },
    headerBackTitleVisible: false,
  }
})

export default EventMenuStack
