import React from "react";
import {
  View,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Text, Button, ListItem, Icon } from "react-native-elements";
import { connect } from "react-redux";

import {
  setOngoingEvent,
  getOngoingEvent,
} from "../../../reducers/eventReducer";
import { endDives } from "../../../reducers/diveReducer";
import colors from "../../../styles/colors";
import styles from "../../../styles/global";
import { formatDate } from "../../../utils/dates";
import { paddingSides } from "../../../styles/global";
import BackgroundImage from "../../common/BackgroundImage";
import AppText from "../../common/AppText";
import { Fab } from "@material-ui/core";
import { MaterialIcons } from "@expo/vector-icons";

const style = {
  buttonEnd: {
    backgroundColor: colors.red,
  },
  buttonInvite: {
    backgroundColor: colors.green,
  },
  top: {
    justifyContent: "flex-start",
    width: "100%",
    padding: paddingSides,
    marginTop: 10,
  },
  middle: {
    justifyContent: "center",
    width: "100%",
    padding: paddingSides,
    marginTop: 10,
  },
  bottom: {
    justifyContent: "flex-end",
    width: "100%",
    padding: paddingSides,
    marginBottom: 10,
  },
  buttonDivider: {
    height: 15,
  },
  descriptionStyle: {
    fontSize: 17,
  },
  lowerTitle: {
    fontSize: 25,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginLeft: 5,
  },
  settingsButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    top: 20,
    right: 20,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
};

class EventScreen extends React.Component {
  loadEvent = async () => {
    const { ongoingEvent, getOngoingEvent } = this.props;

    await getOngoingEvent(ongoingEvent);
  };

  componentDidMount() {
    this.loadEvent();
  }

  navigate = (value, item) => this.props.navigation.navigate(value, { item });

  toInvites = () => {
    this.navigate("InviteScreen", { item: { ongoingComponent: this } });
  };

  toEditing = () => {
    this.navigate("Muokkaa tapahtumaa", this.props.ongoingEvent);
  };

  leaveEventButton = () => {
    const { setOngoingEvent, endDives, ongoingDives, user } = this.props;

    endDives(ongoingDives, user._id);
    setOngoingEvent(null);
    this.navigate("StartEventScreen");
  };

  userIsCreator = (user) => user._id === this.props.ongoingEvent.creator._id;
  userIsAdmin = (user) =>
    this.props.ongoingEvent.admins.map((a) => a._id).includes(user._id);

  userIsNotAdmin = () => {
    const { user } = this.props;
    const { userIsCreator, userIsAdmin } = this;

    if (!userIsCreator(user) && !userIsAdmin(user)) return true;

    return false;
  };

  /*eslint-disable */
  pressUser = (item) => {
    console.log();
  };
  /*eslint-enable */

  render() {
    const { ongoingEvent } = this.props;
    const {
      admins,
      participants,
      creator,
      title,
      description,
      startdate,
      enddate,
      target,
    } = ongoingEvent;

    return (
      <View>
        <BackgroundImage height={Dimensions.get("screen").height}>
          <ScrollView>
            <TouchableOpacity
              onPress={this.toEditing}
              style={style.settingsButton}
            >
              <Icon name="settings" size={40} color="#00A3FF" />
            </TouchableOpacity>
            <View style={style.top}>
              <View style={{ marginBottom: 15 }}>
                <AppText
                  style={{
                    fontSize: 36,
                  }}
                >
                  {title}
                </AppText>
              </View>
              <AppText style={style.lowerTitle}>Info</AppText>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-start" }}
              >
                <Icon name="event" type="material" color="white" size={20} />
                <AppText style={style.text}>
                  {new Date(startdate).getDate()}.
                  {new Date(startdate).getMonth()} -{" "}
                  {new Date(startdate).getDate()}.
                  {new Date(startdate).getMonth()}.
                  {new Date(startdate).getFullYear()}
                </AppText>
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-start" }}
              >
                <Icon name="schedule" type="material" color="white" size={20} />
                <AppText style={style.text}>
                  Lähtö {new Date(startdate).getHours()}:
                  {new Date(startdate).getMinutes()}
                </AppText>
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-start" }}
              >
                <Icon name="person" type="material" color="white" size={20} />
                <AppText style={style.text}>{creator.username}</AppText>
              </View>

              <View
                style={{ flexDirection: "row", justifyContent: "flex-start" }}
              >
                <Icon name="group" type="material" color="white" size={20} />
                <AppText style={style.text}>{participants.length + 1}</AppText>
              </View>
              <View style={style.buttonDivider} />
              <View
                style={{ flexDirection: "row", justifyContent: "flex-start" }}
              >
                <Icon
                  name="description"
                  type="material"
                  color="white"
                  size={30}
                />
                <AppText style={style.lowerTitle}>Kuvaus</AppText>
              </View>
              <AppText style={style.text}>{description}</AppText>

              <View
                style={{ flexDirection: "row", justifyContent: "flex-start" }}
              >
                <Icon
                  name="location-on"
                  type="material"
                  color="white"
                  size={30}
                />
                <AppText style={style.lowerTitle}>Sijainti</AppText>
              </View>
              <AppText style={style.text}>lisätään</AppText>
              <View style={style.buttonDivider} />
              <Button
                title="Kutsu lisää osallistujia"
                onPress={this.toInvites}
                buttonStyle={style.buttonInvite}
                disabled={this.userIsNotAdmin()}
                raised
              />
              <View style={style.buttonDivider} />
              <Button
                title="Muokkaa tapahtumaa"
                onPress={this.toEditing}
                disabled={this.userIsNotAdmin()}
                raised
              />
              <View style={style.buttonDivider} />
              <Button
                title="Poistu"
                onPress={this.leaveEventButton}
                buttonStyle={style.buttonEnd}
                raised
              />
            </View>
          </ScrollView>
        </BackgroundImage>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  ongoingDives: state.ongoingDives,
  user: state.user,
});

export default connect(mapStateToProps, {
  endDives,
  setOngoingEvent,
  getOngoingEvent,
})(EventScreen);
