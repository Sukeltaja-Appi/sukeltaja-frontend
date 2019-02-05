import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import ArrowRight from '../simple/ArrowRight'
import styles from '../../styles/global'
import { DateTime } from 'luxon'
import { connect } from 'react-redux'

const style = {
  subtitle: {
    fontStyle: 'italic',
    fontSize: 14
  }
}

const EventListScreen = (props) => {
  const { events } = props

  const formatDate = (date) => (
    DateTime
      .fromISO(date)
      .setLocale('fi')
      .toLocaleString(DateTime.DATETIME_SHORT)
  )

  const navigate = (id, content, startdate, enddate, item) => (
    props.navigation.navigate('Event', {
      id,
      content,
      startdate,
      enddate,
      item
    })
  )

  const eventsSortedByDate = () => (
    events.sort((a, b) => b.startdate.localeCompare(a.startdate))
  )

  const showEvents = () => {
    if (events.length === 0) {
      return (
        <View style={styles.centered}>
          <Text style={styles.h5}>Ei omia tapahtumia.</Text>
        </View>
      )
    }

    return(
      <View style={styles.noPadding}>
        <FlatList
          data={eventsSortedByDate()}
          renderItem={({ item }) => {
            const { id, content, startdate, enddate } = item

            return (
              <ListItem
                title={content}
                subtitle={formatDate(startdate)}
                rightIcon={ <ArrowRight/> }
                onPress={() => navigate(id, content, startdate, enddate, item)}
                subtitleStyle={style.subtitle}
                bottomDivider
              />
            )}
          }
          keyExtractor={item => item.id.toString()}
        />
      </View>
    )
  }

  return showEvents()
}

const mapStateToProps = (state) => ({ events: state.events })

export default connect(
  mapStateToProps,
  null
)(EventListScreen)
