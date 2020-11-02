import React from "react";
import { View, FlatList } from "react-native";
import { Text, Button, CheckBox } from "react-native-elements";
import { Duration } from "luxon";
import { connect } from "react-redux";

import colors from "../../../../styles/colors";
import styles from "../../../../styles/global";
import { paddingSides } from "../../../../styles/global";

import locationService from "../../../../services/location";
import { startDives, endDives } from "../../../../reducers/diveReducer";
import { getOngoingEvent } from "../../../../reducers/eventReducer";
import AppText from "../../../common/AppText";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CommonButton from "../../../common/CommonButton";

const style = {
  headline: {
    alignItems: "center",
    marginBottom: 10,
  },
  counter: {
    color: colors.primary,
    textAlign: "center",
    fontSize: 34,
  },
  listText: {
    fontSize: 24,
    color: colors.primary,
  },
  divider: {
    height: 10,
  },
  top: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    padding: paddingSides,
    marginTop: 10,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    padding: paddingSides,
    marginBottom: 12,
    alignItems: "center",
  },
};

class DiveScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      ongoing: false,
      selectedUsers: [],
    };
    this.showList = this.showList.bind(this);
    this.showListTitle = this.showListTitle.bind(this);
  }

  navigate = (value) => this.props.navigation.navigate(value);

  counterUpdate = () => {
    const { counter, ongoing } = this.state;

    if (ongoing) this.setState({ counter: counter + 1 });
  };

  userIsAdmin = () => {
    const { ongoingEvent, user } = this.props;

    if (ongoingEvent.creator._id === user._id) return true;
    if (ongoingEvent.admins.map((u) => u._id).includes(user._id)) return true;

    return false;
  };

  selectParticipantUser = () => {
    const { user, ongoingEvent } = this.props;
    const participant = ongoingEvent.participants.find(
      (p) => p._id === user._id
    );

    this.setState({ counter: 0, ongoing: false, selectedUsers: [participant] });
  };

  componentDidMount() {
    this.interval = setInterval(() => this.counterUpdate(), 1000);

    if (!this.userIsAdmin()) {
      this.selectParticipantUser();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  diveButton = async () => {
    const { selectedUsers } = this.state;

    if (selectedUsers && selectedUsers.length > 0) {
      let { ongoingEvent, startDives, user } = this.props;

      let latitude = 0;
      let longitude = 0;

      try {
        const location = await locationService.getLocationAsync();

        latitude = location.coords.latitude;
        longitude = location.coords.longitude;
      } catch (err) {
        console.log("Geolocation unavailable.");
      }

      let dives = [];

      selectedUsers.forEach((u) => {
        dives.push({
          event: ongoingEvent._id,
          startdate: new Date(),
          user: u._id,
          latitude,
          longitude,
        });
      });

      await startDives(dives, user._id);

      this.setState({ counter: 0, ongoing: true });
    }
  };

  endButton = async () => {
    let { endDives, ongoingDives, user } = this.props;

    endDives(ongoingDives, user._id);

    if (this.userIsAdmin())
      this.setState({ ongoing: false, selectedUsers: [] });
    else this.selectParticipantUser();
  };

  duration = () =>
    Duration.fromMillis(this.state.counter * 1000).toFormat("hh:mm:ss");

  toggleUserSelection = (user) => {
    const { ongoing, selectedUsers } = this.state;

    if (!ongoing && this.userIsAdmin()) {
      if (!selectedUsers.includes(user)) {
        this.setState({ selectedUsers: [...selectedUsers, user] });
      } else {
        this.setState({
          selectedUsers: selectedUsers.filter((u) => u._id !== user._id),
        });
      }
    }
  };

  userIsDiving = (user) => {
    const { dives } = this.props.ongoingEvent;

    if (
      dives
        .filter((d) => !d.enddate)
        .map((d) => d.user._id)
        .includes(user._id)
    )
      return true;

    return false;
  };

  setUserColor = (user) => {
    if (this.userIsDiving(user)) return { backgroundColor: colors.primary };

    if (this.state.selectedUsers.includes(user))
      return {
        backgroundColor: colors.primary,
      };

    return {};
  };

  setUserTextColor = (user) => {
    if (this.userIsDiving(user)) return { color: "#fff" };

    if (this.state.selectedUsers.includes(user))
      return {
        color: "#fff",
      };

    return {};
  };
  renderListItem = (user) => {
    const { selectedUsers } = this.state;

    if (this.userIsAdmin()) {
      return (
        <CheckBox
          title={user.username}
          onPress={() => this.toggleUserSelection(user)}
          checked={selectedUsers.map((u) => u._id).includes(user._id)}
          containerStyle={this.setUserColor(user)}
          iconType="material"
          checkedIcon="clear"
          uncheckedIcon="add"
          checkedColor="#fff"
          textStyle={this.setUserTextColor(user)}
        />
      );
    } else {
      const userID = this.props.user._id;

      return (
        <CheckBox
          title={user.username}
          onPress={() => this.toggleUserSelection(user)}
          checked={userID === user._id}
          containerStyle={this.setUserColor(user)}
        />
      );
    }
  };

  showList = (participantList) => {
    if (participantList.length === 0) {
      return (
        <View style={styles.centered}>
          <AppText style={styles.h5}>Ei osallistujia.</AppText>
        </View>
      );
    } else {
      return (
        <FlatList
          data={participantList}
          renderItem={({ item }) => this.renderListItem(item)}
          keyExtractor={(item) => item._id}
          extraData={this.state}
        />
      );
    }
  };

  showListTitle = () => {
    if (this.userIsAdmin())
      return <AppText style={style.listText}>Valitse sukeltajat</AppText>;

    return <AppText style={style.listText}>Sukeltajat</AppText>;
  };

  noOneIsSelected = () => {
    const { selectedUsers } = this.state;

    if (selectedUsers && selectedUsers.length > 0) return false;

    return true;
  };

  render() {
    const { creator, admins, participants } = this.props.ongoingEvent;
    const participantList = [creator, ...admins, ...participants];
    const { ongoing } = this.state;

    if (!ongoing) {
      return (
        <View style={styles.noPadding}>
          <View style={style.top}>
            <View style={style.headline}>{this.showListTitle()}</View>
            {this.showList(participantList)}
          </View>

          <View style={style.bottom}>
            <View style={style.divider} />
            <CommonButton
              title="Aloita sukellus"
              onPress={this.diveButton}
              disabled={this.noOneIsSelected()}
              raised
            />
            <View style={style.divider} />
            <View style={style.divider} />
            <TouchableOpacity onPress={() => this.navigate("DiveListScreen")}>
              <AppText
                style={{
                  fontSize: 16,
                  textTransform: "uppercase",
                  color: "gray",
                }}
              >
                Takaisin
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.noPadding}>
          <View style={style.top}>
            <View style={style.headline}>
              <AppText style={style.listText}>Valitut sukeltajat</AppText>
            </View>
            {this.showList(participantList)}
          </View>

          <View style={style.bottom}>
            <View style={style.divider} />
            <AppText style={style.counter}>
              {this.duration()}
            </AppText>
            <View style={style.divider} />
            <CommonButton
              title="Avaa sukelluslista"
              onPress={() => this.navigate("DiveListScreen")}
            />
            <View style={style.divider} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{ flex: 1, height: 1, backgroundColor: colors.gray }}
              />
            </View>
            <View style={style.divider} />
            <CommonButton
              title="Lopeta sukellus"
              onPress={this.endButton}
              buttonStyle={{ backgroundColor: colors.red }}
            />
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  ongoingDives: state.ongoingDives,
  ongoingEvent: state.ongoingEvent,
  user: state.user,
});

export default connect(mapStateToProps, {
  endDives,
  startDives,
  getOngoingEvent,
})(DiveScreen);
