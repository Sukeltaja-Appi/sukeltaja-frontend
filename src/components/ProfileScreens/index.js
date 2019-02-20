import { createSwitchNavigator } from 'react-navigation'
import ProfileMainScreen from './ProfileMainScreen'
import LoginScreen from './LoginScreen'

export default createSwitchNavigator({
  ProfileMainScreen: {
    screen: ProfileMainScreen
  },
  LoginScreen: {
    screen: LoginScreen
  }
}, { headerMode: 'none' })
