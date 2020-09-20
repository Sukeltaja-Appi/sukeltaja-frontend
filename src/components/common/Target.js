import React, { useState } from 'react'
import { connect } from 'react-redux'
import { View, Linking } from 'react-native'
import { Button, Text, Input } from 'react-native-elements'
import decimalToDMS from '../../utils/coordinates'

import { KYPPI_URL } from '@env'
import colors from '../../styles/colors'
import CustomTargetScreen from '../OngoingEventScreens/OngoingEventTabs/CustomTargetScreen'
import targetService from '../../services/targets'

import { updateEvent, setOngoingEvent } from '../../reducers/eventReducer'

const style = {
  h5: {
    fontSize: 18,
    paddingVertical: 2
  }
}

const Target = (props) => {
  const { ongoingEvent, updateEvent, currentTarget, setOngoingEvent } = props
  let target = props.target ? props.target : props.navigation.getParam('target')
  const { name, type, material, latitude, longitude, mj_id } = target

  const [customName, setCustomName] = useState('');

  const customLocation = props.navigation.getParam('custom')

  const selectTarget = async (target) => {
    if (customLocation) {
      const result = await targetService.create({
        ...target,
        name: customName,
        user_created: true
      })
      target = result;
    }
    if (ongoingEvent) {
      const event = ongoingEvent

      event.target = target ? target : null

      setOngoingEvent(event)
      updateEvent(event)

      if (props.navigation.pop) {
        if (customLocation)
          // If custom location pop(1) goes back to the map
          props.navigation.pop(2)
        else
          props.navigation.pop(1)
      }
    }
  }

  const selectTargetButton = () => {
    if (currentTarget && currentTarget._id === target._id) {
      return (
        <Button
          title='Poista kohteen valinta'
          buttonStyle={{ backgroundColor: colors.warning }}
          onPress={() => selectTarget(null)}
        />
      )
    }

    // Right now this button is disabled if there is no ongoing event.
    // Later we can have a pop-up to select this target to any event.

    return (
      <Button
        title='Valitse kohteeksi'
        buttonStyle={{ backgroundColor: colors.success }}
        onPress={() => selectTarget(target)}
        disabled={!ongoingEvent}
      />
    )
  }

  const locationNameField = () => {
    if (customLocation) {
      return (
        <Input
          onChangeText={(text) => setCustomName(text)}
          placeholder='Paikan nimi'
          containerStyle={{ backgroundColor: 'white' }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          value={customName}
        />
      )
    }
  }

  const editCustomLocationButton = () => {
    if (customLocation) {
      return (
        <Button
          title='Muokkaa sijaintia'
          onPress={() => props.navigation.navigate('CustomTargetScreen')}
          buttonStyle={{ marginTop: 8 }}
        />
      )
    }
  }

  const mjRegisterButton = () => {
    if (mj_id) {
      return (
        <Button
          title='MJ-rekisteri'
          onPress={() => Linking.openURL(`${KYPPI_URL}${mj_id}`)}
          buttonStyle={{ marginTop: 8 }}
        />
      )
    }
  }

  return (
    <View style={{ padding: 10 }}>

      { locationNameField()}

      <Text h4 style={{ fontWeight: 'bold' }}>{name}</Text>

      { type && <Text style={style.h5}>{`Tyyppi: ${type}`}</Text>}

      { material && <Text style={style.h5}>{`Materiaali: ${material}`}</Text>}

      <Text style={style.h5}>{`${decimalToDMS(latitude)} N`}</Text>

      <Text style={{ ...style.h5, marginBottom: 5 }}>{`${decimalToDMS(longitude)} E`}</Text>

      { editCustomLocationButton()}

      { selectTargetButton()}

      { mjRegisterButton()}


    </View>
  )
}

const mapStateToProps = (state) => ({
  currentTarget: state.ongoingEvent && state.ongoingEvent.target ? state.ongoingEvent.target : null,
  ongoingEvent: state.ongoingEvent
})

export default connect(
  mapStateToProps,
  { updateEvent, setOngoingEvent }
)(Target)
