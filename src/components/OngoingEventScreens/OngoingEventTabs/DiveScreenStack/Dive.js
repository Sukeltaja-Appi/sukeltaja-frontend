import React from 'react'
import { View } from 'react-native'
import { Text, Divider, Icon, Button } from 'react-native-elements'

import { formatDate } from '../../../../utils/dates'
import colors from '../../../../styles/colors'
import styles, { paddingSides } from '../../../../styles/global'

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
    flex: 5
  },
  divider: {
    marginVertical: 20
  },
  text: {
    fontSize: 16
  }
}

const Dive = (props) => {
  const { navigation } = props

  const { user, startdate, enddate, latitude, longitude } = navigation.getParam('item')

  const navigate = (route, params) => navigation.navigate(route, params)

  const back = () => navigation.navigate('DiveListScreen')

  const showEndDate = () => {
    if(enddate) return 'Lopetusaika: ' + formatDate(enddate)

    return 'Meneillään oleva!'
  }

  return (
    <View style={styles.noPadding}>
      <View style={style.container}>

        <View style={styles.row}>
          <Text h3 style={style.title}>Sukeltaja: {user.username}</Text>
          <Icon
            name='edit'
            type='feather'
            onPress={() => navigate('EditDiveScreen', { item: navigation.getParam('item') })}
            color={colors.red}
            size={34}
            iconStyle={{ padding: 8 }}
            containerStyle={style.iconContainer}
          />
        </View>

        <Divider style={style.divider} />

        <Text style={style.text}>Aloitusaika:   { formatDate(startdate) }</Text>
        <Text style={style.text}>{showEndDate()}</Text>
        <Text style={style.text}>Leveysaste:   {latitude}</Text>
        <Text style={style.text}>Pituusaste:    {longitude}</Text>

        <Divider style={style.divider} />

        <Button
          title='<- Takaisin'
          onPress={() => back()}
          raised
        />
      </View>
      <Divider />
    </View>
  )
}

export default Dive
