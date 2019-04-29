import React from 'react'
import { View } from 'react-native'
import { Text, Divider, Icon, Button } from 'react-native-elements'
import { connect } from 'react-redux'

import { deleteEvent } from '../../../reducers/eventReducer'
import { formatDate } from '../../../utils/dates'
import colors from '../../../styles/colors'
import styles, { paddingSides } from '../../../styles/global'

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
  },
  buttonDelete: {
    backgroundColor: colors.red
  }
}

const Event = (props) => {
  const { navigation, ongoingEvent, deleteEvent } = props

  const event = navigation.getParam('item')
  const { startdate, enddate, title, description } = event

  const navigate = (route, params) => navigation.navigate(route, params)

  const deleteButton = async () => {
    await deleteEvent(event, ongoingEvent)
    navigation.navigate('EventListScreen')
  }

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

        <Divider style={style.divider} />

        <Button
          title='Poista'
          buttonStyle={style.buttonDelete}
          onPress={deleteButton}
          raised
        />

      </View>
      <Divider />
    </View>
  )
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent
})

export default connect(
  mapStateToProps,
  { deleteEvent }
)(Event)
