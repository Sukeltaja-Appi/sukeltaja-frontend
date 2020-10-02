import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OngoingEventEntry from "./components/OngoingEventScreens/OngoingEventEntry";
import MapScreen from "./components/MapScreens/MapScreen";
import EventEntry from "./components/EventScreens/EventEntry";
import ProfileScreens from "./components/ProfileScreens";
import { login } from "./reducers/userReducer";
import { initializeEvents } from "./reducers/eventReducer";
import { initializeDives } from "./reducers/diveReducer";
import { getAll } from "./reducers/targetReducer";
import { Icon } from "react-native-elements";

import colors from "./styles/colors";
import LoginScreens from "./components/LoginScreens";

const Tab = createBottomTabNavigator();

class Navigator extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    const { user } = this.props;

    return (
      <NavigationContainer>
        <Tab.Navigator name="Alku" initialRouteName="Profiili">
          {user ? (
            <>
              <Tab.Screen name="Kartta" component={MapScreen} />
              <Tab.Screen name="Tapahtuma" component={EventEntry} />
              <Tab.Screen name="Tapahtumat" component={OngoingEventEntry} />
              <Tab.Screen name="Profiili" component={ProfileScreens} />
            </>
          ) : (
            <Tab.Screen name="Opening" component={LoginScreens} options={{ tabBarVisible:false }}/>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps, {
  login,
  initializeEvents,
  initializeDives,
  getAll,
})(Navigator);

// ?? screenOptions={{ tabBarVisible: false }}
