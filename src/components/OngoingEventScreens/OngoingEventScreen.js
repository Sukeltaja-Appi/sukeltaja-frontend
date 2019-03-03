import React from 'react'
import { View, FlatList } from 'react-native'
import { Text, Button, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'

import { endEvent, mergeOngoingEvent } from '../../reducers/eventReducer'
import { endDive } from '../../reducers/diveReducer'
import styles from '../../styles/global'
import colors from '../../styles/colors'

const style = {
  buttonEnd: {
    ...styles.roundButton,
    backgroundColor: colors.red,
  },
  main: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50,
  },
  list: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
    alignItems: 'center'
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
    let { ongoingEvent, selectedTargets } = props
    const length = selectedTargets.length

    if(length > 0) ongoingEvent.target = selectedTargets[length-1].id

    await endDives()
    await props.mergeOngoingEvent(ongoingEvent)
    ongoingEvent = props.ongoingEvent
    await props.endEvent(ongoingEvent)

    navigate('StartEventScreen')
  }

  const selectUser = () => {

  }

  const displayName = (participant) => {
    if (typeof participant.username !== 'undefined') return participant.username
    return participant
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

console.log(users[0])
  return (
    <View style={style.main}>
      <Text h1 >Meneillään oleva tapahtuma</Text>
      <View style={{ height: 20 }} />

      <Text h2>Osallistujat:</Text>

      <View style={style.list}>
        <FlatList
          data={users}
          renderItem={({ item }) => {

            return (
              <ListItem
                title={displayName(item)}
                onPress={() => selectUser(item)}
                bottomDivider
                chevron
              />
            )}
          }
          keyExtractor={item => returnID(item)}
        />
      </View>


      <View style={style.bottom}>
        <Button title='Lopeta' onPress={() => endEventButton()} buttonStyle={style.buttonEnd} raised />
      </View>
    </View>
  )
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  ongoingDive: state.ongoingDive,
  selectedTargets: state.selectedTargets
})

export default connect(
  mapStateToProps,
  { endEvent, mergeOngoingEvent, endDive }
)(OngoingEventScreen)
