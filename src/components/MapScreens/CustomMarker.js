import React, { useRef, useEffect } from 'react'
import { Marker } from 'react-native-maps'

const CustomMarker = (props) => {

  const markerRef = useRef(null)

  useEffect(() => {
    if (props.calloutVisible)
      markerRef.current.showCallout()
    else
      markerRef.current.hideCallout()
  }, [props.calloutVisible])

  return (
    <Marker {...props} ref={marker => { markerRef.current = marker }} />
  )
}

export default CustomMarker
