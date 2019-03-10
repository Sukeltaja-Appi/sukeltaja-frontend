import React from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text } from 'react-native'
import { ListItem, CheckBox } from 'react-native-elements'
import { formatDate } from '../../utils/dates'
import styles from '../../styles/global'
import colors from '../../styles/colors'
import { setOngoingEvent } from '../../reducers/eventReducer'

const style = {
  checkBox: {
    paddingHorizontal: 0,
    paddingVertical: 21,
    marginVertical: 0
  },
  subtitle: {
    fontStyle: 'italic',
    fontSize: 14
  }
}

const EventListScreen = (props) => props.events.length === 0 ? <EmptyList /> : <List {...props} />

const EmptyList = () => (
  <View style={styles.centered}>
    <Text style={styles.h5}>Ei omia tapahtumia.</Text>
  </View>
)

const List = (props) => {
  const { events, ongoingEvent, setOngoingEvent } = props

  const navigate = (item) => props.navigation.navigate('Event', { item })

  const eventsSortedByDate = () => events.sort((a, b) => b.startdate.localeCompare(a.startdate))

  const isOngoingEvent = (event) => event === ongoingEvent

  const eventStyle = (event) => ({
    paddingVertical: 0,
    paddingLeft: 6,
    paddingRight: 14,
    backgroundColor: isOngoingEvent(event) ? colors.secondary_light : 'white'
  })

  const renderCheckBox = (event) => (
    <CheckBox
      checkedIcon='check'
      checked={isOngoingEvent(event)}
      containerStyle={style.checkBox}
      onPress={() => isOngoingEvent(event) ? setOngoingEvent(null) : setOngoingEvent(event)}
    />
  )

  return (
    <View style={styles.noPadding}>
      <FlatList
        data={eventsSortedByDate()}
        extraData={ongoingEvent}
        renderItem={({ item }) => {
          const { title, startdate } = item

          return (
            <ListItem
              title={title}
              subtitle={formatDate(startdate)}
              onPress={() => navigate(item)}
              subtitleStyle={style.subtitle}
              contentContainerStyle={{ paddingVertical: 14 }}
              containerStyle={eventStyle(item)}
              bottomDivider
              leftElement={renderCheckBox(item)}
              chevron
              pad={0}
            />
          )}
        }
        keyExtractor={item => item._id}
      />
    </View>
  )
}

const mapStateToProps = (state) => ({
  events: state.events,
  ongoingEvent: state.ongoingEvent
})

export default connect(
  mapStateToProps,
  { setOngoingEvent }
)(EventListScreen)
