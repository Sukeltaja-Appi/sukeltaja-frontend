import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text, Divider } from 'react-native-elements'
import styles, { paddingSides } from '../../styles/global'
import { DateTime, Duration } from 'luxon'
import { formatDuration, formatDate } from '../../utils/dates'

const style = {
  paddingTop: 10,
  paddingLeft: paddingSides,
  paddingRight: paddingSides,
  paddingBottom: 10,
  backgroundColor: 'white'
}

const Event = (props) => {
  const { navigation } = props

  const { startdate, enddate, content } = navigation.getParam('item')

  const navigate = (route, params) => props.navigation.navigate(route, params)

  const duration = Duration.fromMillis(DateTime.fromISO(enddate) - DateTime.fromISO(startdate))

  return (
    <View style={styles.noPadding}>
      <View style={style}>
        <Text h4>{content}</Text>
        <Text>Alkoi: { formatDate(startdate) }</Text>
        { enddate ? <Text>Kesto: {formatDuration(duration)}</Text> : null }
        <TouchableOpacity
          onPress={() => navigate('EditEventScreen', { item: navigation.getParam('item') })}
          style={styles.button} >
          <Text style={styles.buttonText}>Muokkaa</Text>
        </TouchableOpacity>
      </View>
      <Divider />
    </View>
  )
}

export default Event
