import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, SectionList } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import { setOngoingEvent } from '../../../reducers/eventReducer'
import { dateToday1200, dateTomorrow, dateInOneMonth, thisWeeksSunday, nextWeeksSunday } from '../../../utils/dates'
import colors from '../../../styles/colors'
import styles from '../../../styles/global'
import AppButtonRound from '../../common/AppButtonRound'
import { Interval, DateTime } from 'luxon'
import AppText from '../../common/AppText'

const EventListScreen = (props) => {
  return props.events.length === 0 ? <EmptyList {...props} /> : <List {...props} groups={eventsSortedByGroup(props)} />
}

const eventsSortedByGroup = (props) => {
  const old = [], today = [], thisWeek = [], nextWeek = [], inMonth = [], later = []
  const { events } = props
  const eventsByDate = events.sort((a, b) => b.startdate.localeCompare(a.startdate))
  const beforeMidday = 11
  const afterMidday = 11

  eventsByDate.forEach(e => {
    let start = DateTime.fromISO(e.startdate)

    start = DateTime.local(start.year, start.month, start.day, beforeMidday)
    let end = DateTime.fromISO(e.enddate)

    end = DateTime.local(end.year, end.month, end.day, afterMidday)

    if (Interval.fromDateTimes(start, end).contains(dateToday1200())) { today.push(e) }
    else if (Interval.fromDateTimes(dateTomorrow(), thisWeeksSunday()).contains(start)) { thisWeek.push(e) }
    else if (Interval.fromDateTimes(thisWeeksSunday(), nextWeeksSunday()).contains(start)) { nextWeek.push(e) }
    else if (Interval.fromDateTimes(nextWeeksSunday(), dateInOneMonth()).contains(start)) { inMonth.push(e) }
    else if (start > dateInOneMonth()) { later.push(e) }
    else { old.push(e) }
  })

  return [
    { title: 'yli kuukauden päästä', data: later },
    { title: 'kuukauden aikana', data: inMonth },
    { title: 'ensi viikolla', data: nextWeek },
    { title: 'tällä viikolla', data: thisWeek },
    { title: 'tänään', data: today },
    { title: 'menneet', data: old },
  ]
}

const EmptyList = (props) => {
  const navigate = (value) => {
    props.navigation.navigate(value)
  }

  return (
    <View>
      <View style={styles.centered}>
        <Text style={styles.h5}>Ei omia tapahtumia.</Text>
      </View>
      <View style={style.container}>
        <AppButtonRound title="+" onPress={() => navigate('Luo tapahtuma')} />
      </View>
    </View>
  )
}

const List = (props) => {
  const { ongoingEvent, setOngoingEvent, groups, user } = props

  const navigate = (value, item) => props.navigation.navigate(value, { item })

  const isOngoingEvent = (event) =>
    ongoingEvent ? event._id === ongoingEvent._id : false

  const isCreatorLoggedInUser = (event) =>
    event.creator.username === user.username ? true : false

  const eventStyle = (event) => ({
    paddingVertical: 0,
    paddingLeft: 6,
    paddingRight: 14,
    backgroundColor: isOngoingEvent(event) ? colors.secondary_light
      : isCreatorLoggedInUser(event) ? 'white' : colors.lightgray
  })

  return (
    <View style={styles.noPadding}>
      <SectionList
        sections={groups}
        extraData={ongoingEvent}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const { title, startdate, enddate, creator, target } = item
          const start = DateTime.fromISO(startdate)
          const end = DateTime.fromISO(enddate)

          return (
            <ListItem
              onPress={() =>
                setOngoingEvent(item) && navigate('Tapahtuma', item)
              }
              containerStyle={eventStyle(item)}
              bottomDivider
              pad={0}
            >
              <ListItem.Content style={style.dateContainer}>
                <View style={style.flexrow}>
                  <AppText>
                    {start.day}.{start.month}.{' - '}
                    {end.day}.{end.month}.{end.year}
                  </AppText>
                </View>
                <View style={style.flexrow}>
                  <Icon name='schedule' type='material' color='white' size={20} style={style.icon} />
                  <AppText>
                    {start.hour}{':'}{start.minute.toString().padStart(2, '0')}
                  </AppText>
                </View>
              </ListItem.Content>

              <ListItem.Content style={style.infoContainer}>
                <ListItem.Title style={style.title}> {title} </ListItem.Title>
                <View style={style.flexrow}>
                  <Icon name='person' type='material' color='#686868' size={20} style={style.icon} />
                  <Text style={style.subtitle}>
                    {creator.username}
                  </Text>
                </View>
                <View style={style.flexrow}>
                  <Icon name='room' type='material' color='#686868' size={20} style={style.icon} />
                  <Text style={style.subtitle}>
                    {target == null ? 'ei kohdetta' : target.name}
                  </Text>
                </View>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          )
        }}
        renderSectionHeader={({ section }) => (section.data.length > 0 ?
          <Text style={style.header}>{section.title}</Text> : null)}
      />
      <AppButtonRound title="+" onPress={() => navigate('Luo tapahtuma')} />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: '20%',
    height: '30%',
    alignSelf: 'flex-end',
  },
  checkBox: {
    paddingHorizontal: 0,
    paddingVertical: 21,
    marginVertical: 0,
  },
  title: {
    fontFamily: 'nunito-bold',
    color: '#118BFC',
    fontSize: 18,
  },
  subtitle: {
    fontFamily: 'nunito-bold',
    fontSize: 14,
    color: '#686868'
  },
  dateContainer: {
    flex: 0.35,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#379EFE',
    padding: 5,
  },
  infoContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 5,
  },
  flexrow: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  icon: {
    paddingRight: 3,
  },
  header: {
    paddingLeft: 7,
    padding: 3,
    fontFamily: 'nunito-bold',
    fontSize: 16,
  },
})

const mapStateToProps = (state) => ({
  events: state.events,
  ongoingEvent: state.ongoingEvent,
  user: state.user
})

export default connect(mapStateToProps, { setOngoingEvent })(EventListScreen)
