import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import ArrowRight from './ArrowRight'
import { DateTime, Duration } from 'luxon'

const stylesLocal = StyleSheet.create({
  item: {
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'white'
  },
  itemRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 0
  },
  desc: {
    fontSize: 15,
    marginTop: 5,
    marginLeft: 15,
    marginBottom: 5,
    color: '#555'
  }
})

const EventEntry = (props) => {
  const startTime = DateTime.fromISO(props.startTime).setLocale('fi')
  const endTime = DateTime.fromISO(props.endTime).setLocale('fi')
  const duration = Duration.fromMillis(endTime - startTime)

  return (
    <View style={ stylesLocal.item }>
      <TouchableHighlight underlayColor='#d9d9d9' onPress={ props.onPress }>
        <View style={ stylesLocal.itemRow }>
            <View>
              <Text style={stylesLocal.desc}>Käyttäjä: { props.username }</Text>
              <Text style={stylesLocal.desc}>Kuvaus: { props.content }</Text>
              <Text style={stylesLocal.desc}>Alkoi: { startTime.toLocaleString(DateTime.DATETIME_SHORT) }</Text>
              { props.endTime
                ? <Text style={stylesLocal.desc}>Kesto: { duration.toFormat("hh'h' mm'm' ss's'") }</Text>
                : null }
            </View>
            { props.displayArrow
              ? <ArrowRight color="#c7c7cc" />
              : null }
        </View>
      </TouchableHighlight>
    </View>
  )
}

export default EventEntry
