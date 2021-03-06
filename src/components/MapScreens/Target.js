import React, { useState } from 'react'
import { View, Linking, StyleSheet, Text } from 'react-native'
import decimalToDMS from '../../utils/coordinates'

import AppText from '../common/AppText'
import CommonButton from '../common/CommonButton'
import { KYPPI_URL } from '@env'

const style = StyleSheet.create({
  view: {
    flex: 1,
    padding: 10,
  },
  h4: {
    fontSize: 28,
    color: '#424242',
  },
  h5: {
    fontSize: 16,
    color: '#424242',
  },
  buttonStyle: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    marginTop: 10,
  }
})

const Target = ({ target, targetSelected }) => {
  const { name, type, material, latitude, longitude, mj_id } = target
  const [loadingIconVisible, setLoadingIconVisible] = useState(false)

  return (
    <View style={style.view}>
      <AppText style={style.h4}>{name}</AppText>
      {type && <AppText>{`Tyyppi: ${type}`}</AppText>}
      {material && <AppText>{`Materiaali: ${material}`}</AppText>}
      <Text style={style.h5}>{`${decimalToDMS(latitude)} N`}</Text>
      <Text style={style.h5}>{`${decimalToDMS(longitude)} E`}</Text>
      <CommonButton
        title='Valitse kohteeksi'
        containerStyle={style.buttonStyle}
        loading={loadingIconVisible}
        onPress={() => {
          setLoadingIconVisible(true)
          targetSelected(target)
        }}
      />
      { mj_id &&
        <CommonButton
          title='MJ-rekisteri'
          containerStyle={style.buttonStyle}
          onPress={() => Linking.openURL(`${KYPPI_URL}${mj_id}`)}
          buttonStyle={{ marginTop: 8 }}
        />
      }
    </View>
  )
}

export default Target
