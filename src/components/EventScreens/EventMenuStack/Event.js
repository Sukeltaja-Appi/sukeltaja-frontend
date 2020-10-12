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
  lowerTitle: {
    fontSize: 25
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
  const { startdate, enddate, title, description, creator, participants, target } = event

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
        <Text style={style.lowerTitle}>Info</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Icon name='event' type='material' color='grey' size={20} />
          <Text style={style.text}>{ new Date(startdate).getDate() }.
          { new Date(startdate).getMonth() } - { new Date(startdate).getDate() }.
          { new Date(startdate).getMonth() }.{ new Date(startdate).getFullYear() }</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Icon name='schedule' type='material' color='grey' size={20} />
          <Text style={style.text}>Lähtö { new Date(startdate).getHours() }:{ new Date(startdate).getMinutes() }</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Icon name='person' type='material' color='grey' size={20} />
          <Text style={style.text}>{creator.username}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Icon name='group' type='material' color='grey' size={20} />
          <Text style={style.text}>{participants.length + 1}</Text>
        </View>

        <Divider style={style.divider} />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Icon name='description' type='material' color='grey' size={30} />
          <Text style={style.lowerTitle}>Kuvaus</Text>
        </View>
        <Text style={style.text}>{description}</Text>

        <Divider style={style.divider} />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Icon name='location-on' type='material' color='grey' size={30} />
          <Text style={style.lowerTitle}>Sijainti</Text>
        </View>
        <Text style={style.text}>lisätään</Text>

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
