import { createStackNavigator } from 'react-navigation';
import MenuScreen from './MenuScreen';
import EventListScreen from './EventListScreen';
import EditEventScreen from './EditEventScreen';

export default createStackNavigator({
  MenuScreen,
  EventListScreen,
  EditEventScreen
});
