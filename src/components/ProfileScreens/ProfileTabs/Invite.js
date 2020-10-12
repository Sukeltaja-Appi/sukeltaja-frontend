import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'

import { joinOngoingEvent } from '../../../reducers/eventReducer'
import { checkMessage } from '../../../reducers/messageReducer'
import { formatDate } from '../../../utils/dates'
import styles from '../../../styles/global'
import colors from '../../../styles/colors'

const style = {
  buttonJoin: {
    backgroundColor: colors.green
  },
  buttonRemove: {
    backgroundColor: colors.red
  },
  buttonDivider: {
    height: 30
  },
  h5: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center'
  },
  h3: {
    marginTop: 6,
    fontSize: 26,
    textAlign: 'center'
  }
}

const Invite = (props) => {
  const { joinOngoingEvent, checkMessage, navigation } = props
  const { message, parent } = navigation.params?.invProps

  const join = async () => {
    await joinOngoingEvent(message.data)
    await checkMessage(message, 'accepted')
    parent.updateInvites()
    navigation.navigate('InvitesScreen')
    navigation.navigate('OngoingEvent')
  }

  const removeInvite = async () => {
    await checkMessage(message, 'rejected')
    parent.updateInvites()
    navigation.navigate('InvitesScreen')
  }

  const invitationTypeDisplay = () => {
    if (message.type === 'invitation_admin') return 'Kutsu ylläpitäjäksi tapahtumaan:'
    if (message.type === 'invitation_participant') return 'Kutsu tapahtumaan:'
  }

  const { title, startdate, enddate } = message.data

  return (
    <View style={styles.noPadding}>
      <Text style={style.h5}>Lähettäjä: {message.sender.username}</Text>
      <Text style={style.h5}>Lähetetty: {formatDate(message.created)}</Text>
      <Text style={style.h5}>{invitationTypeDisplay(message.sender)}</Text>
      <Text style={style.h3}>{title}</Text>
      <Text style={style.h5}>Alkaa: {formatDate(startdate)}</Text>
      <Text style={style.h5}>Päättyy: {formatDate(enddate)}</Text>
      <Button
        title="Hylkää"
        onPress={() => removeInvite()}
        buttonStyle={style.buttonRemove}
      />
      <View style={style.buttonDivider}/>
      <Button
        title="Liity"
        onPress={() => join()}
        buttonStyle={style.buttonJoin}
      />
      <View style={style.buttonDivider}/>
      <Button
        title="<- Takaisin"
        onPress={() => navigation.navigate('InvitesScreen')}
      />
    </View>
  )
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  user: state.user
})

export default connect(
  mapStateToProps,
  { joinOngoingEvent, checkMessage }
)(Invite)
