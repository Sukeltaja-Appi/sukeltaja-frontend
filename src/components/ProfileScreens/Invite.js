import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'

import styles from '../../styles/global'
import colors from '../../styles/colors'
import { joinOngoingEvent } from '../../reducers/eventReducer'
import { checkMessage } from '../../reducers/messageReducer'
import { usernameOrId } from '../../utils/userHandler'
import { eventTitleOrID } from '../../utils/eventHandler'
import { formatDate } from '../../utils/dates'

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
    marginTop: 25,
    fontSize: 18,
    textAlign: 'center'
  },
  h3: {
    marginTop: 10,
    fontSize: 26,
    textAlign: 'center'
  }
}

const Invite = (props) => {
  const { joinOngoingEvent, checkMessage, navigation } = props
  const { message, parent } = navigation.getParam('invProps')

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

  return (
    <View style={styles.noPadding}>
      <Text style={style.h5}>Lähettäjä: {usernameOrId(message.sender)}</Text>
      <Text style={style.h5}>Lähetetty: {formatDate(message.created)}</Text>
      <Text style={style.h5}>{invitationTypeDisplay(message.sender)}</Text>
      <Text style={style.h3}>{eventTitleOrID(message.data)}</Text>
      <Text style={style.h5}></Text>
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
