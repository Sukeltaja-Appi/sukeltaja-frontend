import React from 'react'
import { View } from 'react-native'
import { Text, Divider } from 'react-native-elements'
import styles, { paddingSides } from '../../styles/global'
import { DateTime, Duration } from 'luxon'
import { format } from '../../utils/durationFormatter'

const style = {
  paddingTop: 10,
  paddingLeft: paddingSides,
  paddingRight: paddingSides,
  paddingBottom: 10,
  backgroundColor: 'white'
}

const Event = (props) => {
  const { navigation } = props

  const startTime = DateTime
    .fromISO(navigation.getParam('startdate'))
    .setLocale('fi')

  const endTime = DateTime
    .fromISO(navigation.getParam('enddate'))
    .setLocale('fi')

  const duration = Duration.fromMillis(endTime - startTime)

  return (
    <View style={styles.noPadding}>
      <View style={style}>
        <Text h4>{navigation.getParam('content')}</Text>
        <Text>Alkoi: { startTime.toLocaleString(DateTime.DATETIME_SHORT) }</Text>
        { navigation.getParam('enddate') ? <Text>Kesto: {format(duration)}</Text> : null }
      </View>
      <Divider />
    </View>
  )
}

export default Event
