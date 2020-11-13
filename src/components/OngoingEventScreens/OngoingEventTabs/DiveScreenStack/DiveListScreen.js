import React from 'react'
import { View, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { formatDate } from '../../../../utils/dates'
import { DateTime } from 'luxon'
import colors from '../../../../styles/colors'
import styles from '../../../../styles/global'
import { paddingSides } from '../../../../styles/global'

import AppText from '../../../common/AppText'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import CommonButton from '../../../common/CommonButton'

const style = {
  headline: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'nunito-bold',
    marginLeft: 5,
  },
  title: {
    fontSize: 16,
    fontFamily: 'nunito-bold',
    marginLeft: 5,
  },
  diveContainer: {
    paddingVertical: 0,
    paddingLeft: 1,
    paddingRight: 5,
    marginBottom: 3,
  },
  iconContainer: {
    flex: 0.25,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#379EFE',
    alignItems: 'center',
    height: 70,
  },
  divider: {
    height: 10,
  },
  top: {
    flex: 9,
    justifyContent: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 15,
    marginBottom: 50
  },
  bottom: {
    flex: 2,
    justifyContent: 'center',
    width: '100%',
    padding: paddingSides,
    marginBottom: 12,
    alignItems: 'center',
  },
}

const n6 = 6

class DiveListScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  navigate = (value) => this.props.navigation.navigate(value);
  navigateToDive = (item) => this.props.navigation.navigate('Dive', { item });

  divesSortedByDate = () =>
    this.props.ongoingEvent.dives.sort((a, b) =>
      b.startdate.localeCompare(a.startdate)
    );

  displayEndDate = (dive) => {
    if (!dive.enddate) return 'Meneillään oleva!'

    return 'Loppui: ' + formatDate(dive.enddate)
  };

  showList = (ongoingEvent) => {
    if (this.props.ongoingEvent.dives.length === 0) {
      return (
        <View style={styles.centered}>
          <AppText style={styles.h5}>Ei sukelluksia löytynyt.</AppText>
          <AppText style={styles.h4}>
            Aloita uusi sukellus tai luo sukellus listaan.
          </AppText>
        </View>
      )
    } else {
      return (
        <FlatList
          data={this.divesSortedByDate()}
          extraData={ongoingEvent.dives}
          renderItem={({ item }) => {
            const { user, startdate, latitude, longitude } = item
            const start = DateTime.fromISO(startdate)

            return (
              <ListItem
                onPress={() => this.navigateToDive(item)}
                bottomDivider
                underlayColor="#fff"
                containerStyle={style.diveContainer}
                pad={5}
              >
                <ListItem.Content style={style.iconContainer}>
                  <MaterialCommunityIcons name="waves" size={36} color="#fff" />
                </ListItem.Content>
                <ListItem.Content style={style.diveContainer}>
                  <ListItem.Content
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                  >
                    <MaterialIcons
                      name="person"
                      size={20}
                      color={colors.primary}
                    />
                    <ListItem.Title style={style.title}>
                      {'Sukeltaja: ' + user.username}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Content style={{ flexDirection: 'row' }}>
                    <MaterialIcons
                      name="schedule"
                      size={20}
                      color={colors.primary}
                    />
                    <ListItem.Subtitle style={style.subtitle}>
                      {start.setLocale('fi').toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={style.subtitle}>
                      {start.setLocale('fi').toLocaleString(DateTime.TIME_WITH_SECONDS)}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Content
                    style={{ flexDirection: 'row' }}
                  >
                    <MaterialIcons
                      name="room"
                      size={20}
                      color={colors.primary}
                    />
                    <ListItem.Subtitle
                      style={{ ...style.subtitle, marginLeft: 5 }}
                    >
                      {'L:' +
                      parseFloat(latitude).toFixed(n6) +
                      '; P:' +
                      parseFloat(longitude).toFixed(n6)}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            )
          }}
          keyExtractor={(item) => item._id}
        />
      )
    }
  };

  render() {
    const { ongoingEvent } = this.props

    return (
      <View style={styles.noPadding}>
        <View style={style.top}>
          <View style={style.headline}>
            <AppText style={{ fontSize: 24, color: colors.primary }}>
              Sukellukset
            </AppText>
          </View>
          <View>{this.showList(ongoingEvent)}</View>
        </View>
        <View style={style.bottom}>
          <View style={style.divider} />
          <CommonButton
            title="Sukella"
            onPress={() => this.navigate('DiveScreen')}
            buttonStyle={style.buttonDive}
          />
          <View style={style.divider} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.gray }} />
            <View>
              <AppText style={{ width: 50, textAlign: 'center', color: 'gray' }}>TAI</AppText>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.gray }} />
          </View>
          <View style={style.divider} />
          <CommonButton
            title="Luo uusi sukellus listalle"
            buttonStyle={style.buttonCreate}
            onPress={() => this.navigate('CreateDiveScreen')}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  ongoingDives: state.ongoingDives,
  user: state.user,
})

export default connect(mapStateToProps, null)(DiveListScreen)
