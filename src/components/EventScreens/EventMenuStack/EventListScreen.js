/* eslint-disable no-magic-numbers */
import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, SectionList } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import { Interval, DateTime } from 'luxon'
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'

import { setOngoingEvent } from '../../../reducers/eventReducer'
import { nextMonday } from '../../../utils/dates'
import colors from '../../../styles/colors'
import styles from '../../../styles/global'
import AppButtonRound from '../../common/AppButtonRound'
import AppText from '../../common/AppText'

const EventListScreen = (props) => {
  return props.events.length === 0 ? <EmptyList {...props} /> : <List {...props} groups={eventsSortedByGroup(props)} />
}

const eventsSortedByGroup = (props) => {
  const old = [], today = [], thisWeek = [], nextWeek = [], later = []
  const { events } = props
  const eventsByDate = events.sort((a, b) => a.startdate.localeCompare(b.startdate))

  eventsByDate.forEach(e => {
    let start = DateTime.fromISO(e.startdate)
    let end = DateTime.fromISO(e.enddate)

    start = DateTime.local(start.year, start.month, start.day)
    end = DateTime.local(end.year, end.month, end.day).plus({ days: 1 })

    if (Interval.fromDateTimes(start, end).contains(DateTime.local()))
      today.push(e)
    else if (Interval.fromDateTimes(new Date(), nextMonday()).contains(start))
      thisWeek.push(e)
    else if (Interval.fromDateTimes(new Date(), nextMonday().plus({ weeks: 1 })).contains(start))
      nextWeek.push(e)
    else if (start > DateTime.local())
      later.push(e)
    else
      old.push(e)
  })

  return [
    { title: 'Menneet', data: old },
    { title: 'Tänään', data: today },
    { title: 'Tällä viikolla', data: thisWeek },
    { title: 'Ensi viikolla', data: nextWeek },
    { title: 'Myöhemmin', data: later },
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
  const sectionListRef = useRef(null)

  const { ongoingEvent, setOngoingEvent, groups, user } = props
  const navigate = (value, item) => props.navigation.navigate(value, { item })

  useEffect(() => {
    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex: 1,
        itemIndex: 0,
      })
    }
  }, [])

  const isOngoingEvent = (event) =>
    ongoingEvent ? event._id === ongoingEvent._id : false
  const isCreatorLoggedInUser = (event) =>
    event.creator.username === user.username ? true : false

  const eventStyle = (event) => ({
    backgroundColor: isOngoingEvent(event) ? colors.secondary_light
      : isCreatorLoggedInUser(event) ? 'white' : colors.lightgray,
    height: 78,
    padding: 0,
    paddingRight: 14,
  })

  return (
    <View style={styles.noPadding}>
      <SectionList
        ref={(sectionList) => { sectionListRef.current = sectionList }}
        sections={groups}
        extraData={ongoingEvent}
        keyExtractor={(item) => item._id}

        getItemLayout={sectionListGetItemLayout({
          getItemHeight: () => 78,
          getSeparatorHeight: () => 0,
          getSectionHeaderHeight: () => 30,
          getSectionFooterHeight: () => 0,
          listHeaderHeight: 0,
        })}

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
                <View style={{ marginBottom: 5 }} >
                  <AppText>{start.day}.{start.month}.{' - '}</AppText>
                  <AppText>{end.day}.{end.month}.{end.year} </AppText>
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
                    {!target ? 'ei kohdetta' : target.name}
                  </Text>
                </View>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          )
        }}
        renderSectionHeader={({ section }) => (
          <Text style={{ ...style.header }} >{section.title}</Text>
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
    flexBasis: 100,
    flexGrow: 0,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#379EFE',
    alignSelf: 'stretch',
    paddingLeft: 8,
  },
  infoContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 5,
    flexGrow: 100,
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
    // Hardcode height because getItemLayout needs to know the exact height
    height: 30,
  },
})

const mapStateToProps = (state) => ({
  events: state.events,
  ongoingEvent: state.ongoingEvent,
  user: state.user
})

export default connect(mapStateToProps, { setOngoingEvent })(EventListScreen)
