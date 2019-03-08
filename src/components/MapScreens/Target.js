import React from 'react'
import { connect } from 'react-redux'
import { View, Linking } from 'react-native'
import { Overlay, Button, Text } from 'react-native-elements'
import decimalToDMS from '../../utils/coordinates'

import { KYPPI_URL } from 'react-native-dotenv'
import colors from '../../styles/colors'

import { updateEvent } from '../../reducers/eventReducer'
import { setCurrentTarget } from '../../reducers/targetReducer'

const style = {
  h5: {
    fontSize:18,
    paddingVertical: 2
  },
  overlay: {
    position: 'absolute',
    bottom: 0
  }
}

const Target = (props) => {
  const { target, isVisible, onBackdropPress, currentTarget, ongoingEvent, setCurrentTarget, updateEvent } = props
  const { name, type, material, latitude, longitude, mj_id } = target

  const selectTarget = (target) => {
    setCurrentTarget(target)

    if (ongoingEvent) {
      const event = ongoingEvent

      event.target = target ? target.id : null
      updateEvent(event)
    }
  }

  const selectTargetButton = () => {
    if (currentTarget === target) {
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

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      width='100%'
      height='auto'
      overlayStyle={style.overlay}
      animationType='fade'
    >
      <View>
        <Text h4 style={{ fontWeight: 'bold' }}>{name}</Text>

        { type && <Text style={style.h5}>{`Tyyppi: ${type}`}</Text> }

        { material && <Text style={style.h5}>{`Materiaali: ${material}`}</Text> }

        <Text style={style.h5}>{`${decimalToDMS(latitude)} N`}</Text>

        <Text style={{ ...style.h5, marginBottom: 5 }}>{`${decimalToDMS(longitude)} E`}</Text>

        { selectTargetButton() }

        <Button
          title='MJ-rekisteri'
          onPress={() => Linking.openURL(`${KYPPI_URL}${mj_id}`)}
          buttonStyle={{ marginTop: 8 }}
        />

      </View>
    </Overlay>
  )
}

const mapStateToProps = (state) => ({
  currentTarget: state.currentTarget,
  ongoingEvent: state.ongoingEvent,
})

export default connect(
  mapStateToProps,
  { setCurrentTarget, updateEvent }
)(Target)
