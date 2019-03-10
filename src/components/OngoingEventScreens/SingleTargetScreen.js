import React from 'react'
import { View, Linking } from 'react-native'
import { Text, Button } from 'react-native-elements'
import styles, { paddingSides } from '../../styles/global'
import { KYPPI_URL } from 'react-native-dotenv'
import colors from '../../styles/colors'
import { selectTarget, setSelectedTargets} from '../../reducers/targetReducer'
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

  const { item, distance } = navigation.getParam('target')

  const navigate = (value) => navigation.navigate(value)

  const select = (target) => {
    const targets = [{ target }]

    selectTarget(target)
    setSelectedTargets(targets)
    console.log(targets)
    navigate('TargetScreen')
  }
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
          onPress={() => select(item)}
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