import React from 'react'
import { View } from 'react-native'
import { Text, Divider, Icon } from 'react-native-elements'
import styles, { paddingSides } from '../../styles/global'
import colors from '../../styles/colors'
import locationService from '../../services/location'

const style = {
  container: {
    paddingHorizontal: paddingSides,
    paddingVertical: 10,
    backgroundColor: 'white'
  },
  iconContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  title: {
    flex: 5
  },
  divider: {
    marginVertical: 20
  },
  text: {
    fontSize: 16
  }
}



const Target = (props) => {
  const { navigation } = props

  const { name, type, latitude, longitude, material, mj_id } = navigation.getParam('item')

  //const { startdate, enddate, description, dives } = navigation.getParam('item')
  //const divesString = JSON.stringify(dives)

  //const navigate = (route, params) => props.navigation.navigate(route, params)

  return (
    <View style={styles.noPadding}>
      <View style={style.container}>

        <View style={styles.row}>
          <Text h3 style={style.title}>{name}</Text>
          <Text style={style.text}>{}</Text>
          <Text style={style.text}>{type}</Text>
          <Text style={style.text}>{material}</Text>
          <Text style={style.text}>{mj_id}</Text>
        </View>
      </View>
    </View>
  )
}

export default Target