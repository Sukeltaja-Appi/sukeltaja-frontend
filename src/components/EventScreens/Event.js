import React from 'react'
import { View } from 'react-native'
import { Text, Divider } from 'react-native-elements'
import styles, { paddingSides } from '../../styles/global'
import { DateTime, Duration } from 'luxon'

const style = {
  paddingTop: 10,
  paddingLeft: paddingSides,
  paddingRight: paddingSides,
  paddingBottom: 10,
  backgroundColor: 'white'
}

const times = {
  second: 1000,
  minute: `${60 * this.second}`,
  hour: `${60 * this.minute}`
}

const Event = (props) => {
  const { navigation } = props
  const { second, minute, hour } = times

  const startTime = DateTime
    .fromISO(navigation.getParam('startdate'))
    .setLocale('fi')

  const endTime = DateTime
    .fromISO(navigation.getParam('enddate'))
    .setLocale('fi')

  const duration = Duration.fromMillis(endTime - startTime)

  const formattedDuration = () => {
    if (duration.milliseconds >= hour) {
      return <Text>Kesto: { duration.toFormat("h'h' m'm' s's'") }</Text>
    } else if (duration.milliseconds >= minute) {
      return <Text>Kesto: { duration.toFormat("m'm' s's'") }</Text>
    } else if (duration.milliseconds >= second) {
      return <Text>Kesto: { duration.toFormat("s's'") }</Text>
    }
  }

  return (
    <View style={styles.noPadding}>
      <View style={style}>
        <Text h4>{navigation.getParam('content')}</Text>
        <Text>Alkoi: { startTime.toLocaleString(DateTime.DATETIME_SHORT) }</Text>
        { navigation.getParam('enddate') ? formattedDuration() : null }
      </View>
      <Divider />
    </View>
  )
}

export default Event
