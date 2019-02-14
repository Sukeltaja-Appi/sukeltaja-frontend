import { Location, Permissions, Alert } from 'expo'

const standardAlert = () => {
  Alert.alert(
    'Paikantaminen epäonnistui.',
    'Salli paikantaminen puhelimen asetuksista, jos haluat käyttää paikannusta',
    [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: true }
  )
}

const defaultLoc = {
  coords: {
    latitude: 60.15,
    longitude: 24.9
  },
  failed: true
}

let getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION)

  if (status !== 'granted') {
    standardAlert()

    return defaultLoc

  } else return await Location.getCurrentPositionAsync({})
}

export default { getLocationAsync }
