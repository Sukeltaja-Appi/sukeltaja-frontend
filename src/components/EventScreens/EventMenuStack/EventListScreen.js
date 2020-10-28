import React from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text, StyleSheet, SectionList } from 'react-native'
import { ListItem, CheckBox, Icon } from 'react-native-elements'
import { setOngoingEvent } from '../../../reducers/eventReducer'
import { formatDate, dateToday1200, dateTomorrow, dateInOneWeek, dateInOneWeekAndDay, dateInOneMonth } from '../../../utils/dates'
import colors from '../../../styles/colors'
import styles from '../../../styles/global'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AppButtonRound from '../../common/AppButtonRound'
import { Interval, DateTime } from 'luxon'
import { MaterialIcons } from "@expo/vector-icons"
import AppText from '../../common/AppText'

const EventListScreen = (props) => {
  console.log(props)
  return props.events.length === 0 ? <EmptyList {...props} /> : <List {...props} {...eventsSortedByGroup(props)} />
}

const eventsSortedByGroup = (props) => {
  const groups = { today: [], week: [], month: [], later: [], old: [] }
  const { events } = props
  const eventsByDate = events.sort((a, b) => b.startdate.localeCompare(a.startdate))
  eventsByDate.forEach(e => {
    let start = DateTime.local(e.startdate)
    start = DateTime.local(start.year, start.month, start.day, 11)
    let end = DateTime.local(e.enddate)
    end = DateTime.local(end.year, end.month, end.day, 13)
    console.log(e)
    console.log(groups)
    // esim. start 1100 vs. datetoday 1200. Interval tyyliä [jakso[, tunnin tarkkuudella varmaan
    if (Interval.fromDateTimes(start, end).contains(dateToday1200())) { groups['today'].push(e) }
    else if (Interval.fromDateTimes(dateTomorrow(), dateInOneWeek()).contains(start)) { groups['week'].push(e) }
    else if (Interval.fromDateTimes(dateInOneWeek(), dateInOneMonth()).contains(start)) { groups['month'].push(e) }
    else if (start > dateInOneMonth) { groups['later'].push(e) }
    else { groups['old'].push(e) }
  });
  return groups
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

const List = (props, eventGroups) => {
  const { events, ongoingEvent, setOngoingEvent } = props

  console.log('--- eventGroups in List ---')

  console.log(eventGroups)

  console.log('--- eventGroups in List END---')

  const navigate = (value, item) => props.navigation.navigate(value, { item })

  const eventsSortedByDate = () =>
    events.sort((a, b) => b.startdate.localeCompare(a.startdate))

  const isOngoingEvent = (event) =>
    ongoingEvent ? event._id === ongoingEvent._id : false

  const eventStyle = (event) => ({
    paddingVertical: 0,
    paddingLeft: 6,
    paddingRight: 14,
    // userReducer vai connectien kautta?
    //    backgroundColor: event.creator.username === props.user.username ? colors.secondary_light : 'grey',
    backgroundColor: isOngoingEvent(event) ? colors.secondary_light : 'white',
  })

  const renderCheckBox = (event) => (
    <CheckBox
      checkedIcon="check"
      checked={isOngoingEvent(event)}
      containerStyle={style.checkBox}
      onPress={() =>
        isOngoingEvent(event) ? setOngoingEvent(null) : setOngoingEvent(event)
      }
    />
  )

  return (
    <View style={styles.noPadding}>
      <SectionList
//        data={eventsSortedByDate()}
        sections={eventGroups}
        extraData={ongoingEvent}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const { title, startdate, enddate, creator, target } = item
          const start = new Date(startdate)
          const end = new Date(enddate)
          console.log('---- props.user START----')
          console.log(props)
          console.log('---- props.user END----')
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
                <ListItem.Content style={style.flexrow}>
                  <Icon name='event' type='material' color='white' size={20} style={style.icon} />
                  <AppText>
                    {start.getDate()}.{start.getMonth()}.{' - '}
                    {end.getDate()}.{end.getMonth()}.{end.getFullYear()}
                  </AppText>
                </ListItem.Content>
                <ListItem.Content style={style.flexrow}>
                  <Icon name='schedule' type='material' color='white' size={20} style={style.icon} />
                  <AppText>
                    {start.getHours()}{':'}{start.getMinutes()}
                  </AppText>
                </ListItem.Content>
              </ListItem.Content>

              <ListItem.Content style={style.infoContainer}>
                <ListItem.Title style={style.title}> {title} </ListItem.Title>
                <ListItem.Content style={style.flexrow}>
                  <Icon name='person' type='material' color='#686868' size={20} style={style.icon} />
                  <ListItem.Subtitle style={style.subtitle}>
                    {creator.username}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content style={style.flexrow}>
                  <Icon name='room' type='material' color='#686868' size={20} style={style.icon} />
                  <ListItem.Subtitle style={style.subtitle}>
                    {target === undefined ? 'ei kohdetta' : target.name}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          )
        }}
        renderSectionHeader={({ section: { key } }) => (
          <Text style={styles.header}>{key}</Text>
        )}
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
  }
})

const mapStateToProps = (state) => ({
  events: state.events,
  ongoingEvent: state.ongoingEvent,
})

export default connect(mapStateToProps, { setOngoingEvent })(EventListScreen)
