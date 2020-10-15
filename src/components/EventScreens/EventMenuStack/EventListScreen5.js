import React from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { ListItem, CheckBox } from 'react-native-elements'

import { setOngoingEvent } from '../../../reducers/eventReducer'
import { formatDate } from '../../../utils/dates'
import colors from '../../../styles/colors'
import styles from '../../../styles/global'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AppButton from '../../common/AppButton'

/*
const data = [
  {
    title: 'Luo uusi sukellustapahtuma',
    leftIcon: () => <Icon name="edit-2" type="material" color="#118BFC" />,
    onPress: () => navigate('Luo tapahtuma')
  }
]
*/

const EventListScreen5 = (props) => props.events.length === 0 ? <EmptyList {...props} /> : <List {...props} />

const EmptyList = (props) => {
  const navigate = (value) => { props.navigation.navigate(value) }
  return (
    <View>
      <View style={styles.centered}>
        <Text style={styles.h5}>Ei omia tapahtumia.</Text>
      </View>
      <View style={style.container}>
      <AppButton
              title="Luo tapahtuma"
              onPress={() => navigate('Luo tapahtuma')}
            />
      </View>
    </View>
  )
}

const List = (props) => {
  const { events, ongoingEvent, setOngoingEvent } = props

  const navigate = (item) => props.navigation.navigate('Tapahtumasivu', { item })

  const eventsSortedByDate = () => events.sort((a, b) => b.startdate.localeCompare(a.startdate))

  const isOngoingEvent = (event) => ongoingEvent ? event._id === ongoingEvent._id : false

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
              onPress={() => navigate(item)}
              containerStyle={eventStyle(item)}
              bottomDivider
              pad={0}
            >
              {renderCheckBox(item)}
              <ListItem.Content>
                <ListItem.Title>{title}</ListItem.Title>
                <ListItem.Subtitle style={style.subtitle}>
                  {formatDate(startdate)}
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

const style = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: '50%',
    height: '20%',
    alignSelf: 'flex-end'
  },
  checkBox: {
    paddingHorizontal: 0,
    paddingVertical: 21,
    marginVertical: 0
  },
  subtitle: {
    fontStyle: 'italic',
    fontSize: 14
  }
})

const mapStateToProps = (state) => ({
  events: state.events,
  ongoingEvent: state.ongoingEvent
})

export default connect(mapStateToProps, { setOngoingEvent })(EventListScreen5)
