import React from 'react'
import { View, Linking, WebView } from 'react-native'
import { Text, Divider, Icon, Button } from 'react-native-elements'
import styles, { paddingSides } from '../../styles/global'
import { KYPPI_URL } from 'react-native-dotenv'
import colors from '../../styles/colors'
import locationService from '../../services/location'
import { getAll, selectTarget, resetTargets } from '../../reducers/targetReducer'

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
    fontSize: 20,
    fontWeight: 'bold'
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

  const { item, distance } = navigation.getParam('target')

  return (
    <View style={styles.noPadding}>
      <View style={style.container}>

        <Text style={style.title}>{item.name}</Text>
        <Text style={style.text}>Etäisyys kohteeseen: {distance} metriä</Text>
        <Text style={style.text}>Kohteen tyyppi: {item.type}</Text>
        <Text style={style.text}>Kohteen materiaali: {item.material}</Text>
        <Button
          title='MJ-rekisteri'
          onPress={() => { Linking.openURL(`${KYPPI_URL}${item.mj_id}`) }}
          buttonStyle={{ marginTop: 8 }}
        />

        <Button
          title='Valitse kohteeksi'
          onPress={() => console.log('Ei tee vielä mitään')}
          buttonStyle={{ backgroundColor: colors.success, marginTop: 8 }}

        />

      </View>
    </View>
  )
}

export default Target