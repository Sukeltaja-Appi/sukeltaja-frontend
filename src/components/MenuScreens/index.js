import { createStackNavigator } from 'react-navigation';
import MenuScreen from './MenuScreen';
import EventListScreen from './EventListScreen';
import EditEventScreen from './EditEventScreen';
import CreateEventScreen from './CreateEventScreen'

export default createStackNavigator({
  MenuScreen,
  EventListScreen,
  EditEventScreen,
  CreateEventScreen
});
