import React from 'react'
import {
  createSwitchNavigator,
  MaterialTopTabBar,
  createMaterialTopTabNavigator,
} from 'react-navigation'

import StartEventScreen from './StartEventScreen'
import OngoingEventScreen from './OngoingEventScreen'
import DiveScreen from './DiveScreen'
import TargetScreen from './TargetScreen'

import { Icon } from 'react-native-elements'

import colors from '../../styles/colors'

const TabBarComponent = (props) => (<MaterialTopTabBar { ...props } />)

const style = {
  activeTintColor: '#fff',
  labelStyle: {
    fontWeight: 'bold',
    fontSize: 10
  },
  showIcon: true
}

const OngoingEventTab = createMaterialTopTabNavigator({
  TargetScreen : {
    screen: TargetScreen,
    navigationOptions: {
      tabBarLabel: 'KOHDE',
      tabBarOptions: style,
      showIcon: true,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='map-pin' type='feather' color={tintColor} />
      )
    }
  },
  DiveScreen : {
    screen: DiveScreen,
    navigationOptions: {
      tabBarLabel: 'SUKELLUKSET',
      tabBarOptions: style,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='sunset' type='feather' color={tintColor} />
      )
    }
  },
  OngoingEventScreen : {
    screen: OngoingEventScreen,
    navigationOptions: {
      tabBarLabel: 'TAPAHTUMA',
      tabBarOptions: style,
      tabBarIcon: ({ tintColor }) => (
        <Icon name='users' type='feather' color={tintColor} />
      )
    }
  }
}, {
  tabBarComponent: props => {
    return(
      <TabBarComponent
        {...props}
        style={{
          backgroundColor: colors.primary_light,
          paddingTop: 10
        }}
      />
    )
  }
})

// const OngoingEventStack = createStackNavigator({
//   OngoingEventScreen : {
//     screen: OngoingEventScreen,
//     navigationOptions: {
//       headerBackTitle: null,
//       header: null
//     }
//   },
//   DiveScreen
// }, {
//   defaultNavigationOptions: {
//     headerTitleStyle: {
//       flexBasis: '100%'
//     }
// }


export default createSwitchNavigator({
  StartEventScreen,
  OngoingEventTab
}, { headerMode: 'none' })
