import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import { Alert } from 'react-native'

const standardAlert = () => {
  Alert.alert(
    'Paikantaminen epäonnistui.',
    'Salli paikantaminen puhelimen asetuksista, jos haluat käyttää paikannusta.',
    [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: true }
  )
}

let getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION)

  return status === 'granted' ? await Location.getCurrentPositionAsync({}) : standardAlert()
}

export default { getLocationAsync }
