import React from 'react'
import { View, Linking } from 'react-native'
import { Text, Button } from 'react-native-elements'
import styles, { paddingSides } from '../../styles/global'
import { KYPPI_URL } from 'react-native-dotenv'
import colors from '../../styles/colors'
import { selectTarget, setSelectedTargets } from '../../reducers/targetReducer'
import { connect } from 'react-redux'

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

const SingleTargetScreen = (props) => {
  const { navigation } = props

  const { name, distance, type, material, mj_id } = navigation.getParam('target')

  return (
    <View style={styles.noPadding}>
      <View style={style.container}>

        <Text style={style.title}>{name}</Text>
        <Text style={style.text}>Etäisyys kohteeseen: {distance} metriä</Text>
        <Text style={style.text}>Kohteen tyyppi: {type}</Text>
        <Text style={style.text}>Kohteen materiaali: {material}</Text>
        <Button
          title='MJ-rekisteri'
          onPress={() => { Linking.openURL(`${KYPPI_URL}${mj_id}`) }}
          buttonStyle={{ marginTop: 8 }}
        />

        <Button
          title='Valitse kohteeksi'
          onPress={() => console.log('valitaan')}
          buttonStyle={{ backgroundColor: colors.success, marginTop: 8 }}

        />

      </View>
    </View>
  )
}

export default connect(
  null,
  { setSelectedTargets, selectTarget }
)(SingleTargetScreen)
