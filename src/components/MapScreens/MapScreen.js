import React from 'react'

import SelectTargetScreen from './SelectTargetScreen'

const MapScreen = (props) => {

  const startEvent = async (target) => {
    props.navigation.navigate('Luo tapahtuma', {
      target: { ...target },
    })
  }

  return (
    <SelectTargetScreen targetSelected={startEvent} />
  )
}

export default MapScreen
