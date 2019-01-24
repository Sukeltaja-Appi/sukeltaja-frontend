import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import ArrowRight from './ArrowRight'

const ListItem = (props) => {
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

  return (
    <View style={stylesLocal.item}>
      <TouchableHighlight underlayColor='#ccc' onPress={props.onPress}>
        <View style={stylesLocal.itemRow}>
            <View>
              <Text style={stylesLocal.title}>{props.title}</Text>
              <Text style={stylesLocal.desc}>{props.description}</Text>
            </View>
            { props.displayArrow ? <ArrowRight /> : null }
        </View>
      </TouchableHighlight>
    </View>
  )
}

export default ListItem
