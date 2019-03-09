import React from 'react'
import { View, FlatList } from 'react-native'
import { Text, Button, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'

import { endEvent, mergeOngoingEvent } from '../../reducers/eventReducer'
import { endDive } from '../../reducers/diveReducer'
import colors from '../../styles/colors'
import { usernameOrId } from '../../utils/utilityFunctions'

const style = {
  buttonEnd: {
    backgroundColor: colors.red,
  },
  buttonInvite: {
    backgroundColor: colors.green
  },
  main: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 15,
  },
  list: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  buttonDivider: {
    height: 15
  }
}

const OngoingEventScreen = (props) => {

  const navigate = (value) => props.navigation.navigate(value)

  const endDives = async () => {
    const { endDive, ongoingEvent, ongoingDive } = props

    if(typeof ongoingDive !== 'undefined' && ongoingDive !== null) {

      ongoingDive.enddate = new Date()
      ongoingDive.event = ongoingEvent.id
      await endDive(ongoingDive)
    }
  }

  const endEventButton = async () => {
    let { ongoingEvent, selectedTargets, user } = props
    const length = selectedTargets.length

    if(length > 0) ongoingEvent.target = selectedTargets[length-1].id

    await endDives()
    await props.mergeOngoingEvent(ongoingEvent, user.id)
    ongoingEvent = props.ongoingEvent
    await props.endEvent(ongoingEvent)

    navigate('StartEventScreen')
  }

  const pressUser = () => {

  }

  const returnID = (participant) => {
    if (typeof participant._id !== 'undefined') return participant._id

    return participant
  }

  let users = []

  if (typeof props.ongoingEvent !== 'undefined' && props.ongoingEvent !== null ) {
    const { creator, admins, participants } = props.ongoingEvent

    users = [ creator, ...admins, ...participants ]
  }
  console.log('users:-------------------------------------------------')
  console.log(users)
  console.log('users-^------------------------------------------------')

  return (
    <View style={style.main}>
      <Text h3 >Meneillään oleva tapahtuma</Text>
      <View style={{ height: 20 }} />

      <Text h4>Osallistujat:</Text>

      <View style={style.list}>
        <FlatList
          data={users}
          renderItem={({ item }) => {

            return (
              <ListItem
                title={usernameOrId(item)}
                onPress={() => pressUser(item)}
                bottomDivider
              />
            )}
          }
          keyExtractor={item => returnID(item)}
        />

      </View>

      <View style={style.bottom}>
        <Button
          title='+ Kutsu lisää osallistujia'
          onPress={() => navigate('InviteScreen')}
          buttonStyle={style.buttonInvite}
          raised
        />
        <View style={style.buttonDivider}/>
        <Button title='Lopeta' onPress={() => endEventButton()} buttonStyle={style.buttonEnd} raised />
      </View>
    </View>
  )
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  ongoingDive: state.ongoingDive,
  selectedTargets: state.selectedTargets,
  user: state.user
})

export default connect(
  mapStateToProps,
  { endEvent, mergeOngoingEvent, endDive }
)(OngoingEventScreen)
