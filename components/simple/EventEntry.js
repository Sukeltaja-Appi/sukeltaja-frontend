import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import ArrowRight from './ArrowRight'

const stylesLocal = StyleSheet.create({
  item: {
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'white'
  },
  itemRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
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

//<Text style={stylesLocal.desc}>Started: {props.startTime}</Text>
//<Text style={stylesLocal.desc}>Stopped: {props.stopTime}</Text>

const EventEntry = (props) => {
  return (
    <View style={stylesLocal.item}>
      <TouchableHighlight underlayColor='#d9d9d9' onPress={props.onPress}>
        <View style={stylesLocal.itemRow}>
            <View>
              <Text style={stylesLocal.desc}>ID: {props.id}</Text>
              <Text style={stylesLocal.desc}>Laskuri: {props.counter}</Text>
            </View>
            { props.displayArrow ? <ArrowRight color="#c7c7cc" /> : null }
        </View>
      </TouchableHighlight>
    </View>
  )
}

export default EventEntry
