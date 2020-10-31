import React from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'

import { setOngoingEvent } from '../../../reducers/eventReducer'
import { diveReducer } from '../../../reducers/diveReducer'
import { formatDate } from '../../../utils/dates'
import colors from '../../../styles/colors'
import styles from '../../../styles/global'
import events2 from '../../../services/events'

const style = StyleSheet.create({
  acceptButton: {
    padding: 10,
    borderRadius: 100,
    marginBottom: 5,
    borderColor: '#e8e8e8'
  },
  rejectButton: {
    padding: 10,
    borderRadius: 100,
    borderColor: '#e8e8e8',
    marginRight: 15
  },
  divider: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    height: 10
  },
  flexRowCenter: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  }
})

const n6 = 6

const EventListScreen = (props) => props.user.dives.length === 0 ? <EmptyList /> : <List {...props} />

const EmptyList = () => (
  <View style={styles.centered}>
    <Text style={styles.h5}>Ei omia tapahtumia.</Text>
  </View>
)

const List = (props) => {
  const { ongoingEvent, dives, events } = props

  const navigate = (item) => props.navigation.navigate('Dive', { item })
  const divesSortedByDate = () => dives.sort((a, b) => b.startdate.localeCompare(a.startdate))

  return (
    <View style={styles.noPadding}>
      <FlatList
        data={divesSortedByDate()}
        extraData={ongoingEvent}
        renderItem={({ item }) => {
          const { startdate, enddate, latitude, longitude, event } = item

          return (
            <ListItem
              onPress={() => navigate(item)}
              bottomDivider
              pad={0}
            >
              <ListItem.Content>
                <ListItem.Title>{event}</ListItem.Title>
                <ListItem.Subtitle style={style.subtitle}>
                  {
                    'Alkoi: ' + formatDate(startdate) + '\n'
                    + 'Loppui:' + formatDate(enddate) + '\n'
                    + 'Koordinaatit: L: '
                    + parseFloat(latitude).toFixed(n6) + '; P:'
                    + parseFloat(longitude).toFixed(n6)
                  }
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          )
        }
        }
        keyExtractor={item => item._id}
      />
    </View>
  )
}

const mapStateToProps = (state) => ({
  events: state.events,
  ongoingEvent: state.ongoingEvent,
  user: state.user,
  dives: state.user.dives
})

export default connect(
  mapStateToProps,
  { setOngoingEvent, diveReducer }
)(EventListScreen)
