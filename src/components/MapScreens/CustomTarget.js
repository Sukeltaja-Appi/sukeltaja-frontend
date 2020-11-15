import React, { useState } from 'react'
import { View, Linking, StyleSheet, Text } from 'react-native'
import { Input } from 'react-native-elements'
import decimalToDMS from '../../utils/coordinates'

import AppText from '../common/AppText'
import AppButton from '../common/AppButton'
import targetService from '../../services/targets'

const style = StyleSheet.create({
  view: {
    flex: 1,
    padding: 10,
  },
  h4: {
    fontSize: 28,
  },
  h5: {
    fontSize: 16,
  },
  buttonStyle: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    marginTop: 10,
  }
})

const CustomTarget = ({ target, targetSelected }) => {
  const { latitude, longitude } = target

  const [name, setName] = useState('')

  const createTarget = async () => {
    const createdTarget = await targetService.create({
      ...target,
      name,
      user_created: true
    })

    targetSelected(createdTarget)
  }

  return (
    <View style={style.view}>
      <Input placeholder='Kohteen nimi' value={name} onChange={(e) => setName(e.target.value)}></Input>
      <Text style={style.h5}>{`${decimalToDMS(latitude)} N`}</Text>
      <Text style={style.h5}>{`${decimalToDMS(longitude)} E`}</Text>
      <AppButton
        title='Valitse kohteeksi'
        containerStyle={style.buttonStyle}
        onPress={createTarget}
      />
    </View>
  )
}

export default CustomTarget
