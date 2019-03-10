import React from 'react'
import { View } from 'react-native'
import { Text, Divider, Icon } from 'react-native-elements'
import styles, { paddingSides } from '../../styles/global'
import colors from '../../styles/colors'
import { formatDate } from '../../utils/dates'

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

const Event = (props) => {
  const { navigation } = props

  const { startdate, enddate, title, description } = navigation.getParam('item')

  const navigate = (route, params) => navigation.navigate(route, params)

  return (
    <View style={styles.noPadding}>
      <View style={style.container}>

        <View style={styles.row}>
          <Text h3 style={style.title}>{title}</Text>
          <Icon
            name='edit'
            type='feather'
            onPress={() => navigate('EditEventScreen', { item: navigation.getParam('item') })}
            color={colors.red}
            size={34}
            iconStyle={{ padding: 8 }}
            containerStyle={style.iconContainer}
          />
        </View>

        <Divider style={style.divider} />

        <Text style={style.text}>Kuvaus:         {description}</Text>
        <Text style={style.text}>Aloitusaika:   { formatDate(startdate) }</Text>
        <Text style={style.text}>Lopetusaika: { formatDate(enddate) }</Text>
      </View>
      <Divider />
    </View>
  )
}

export default Event
