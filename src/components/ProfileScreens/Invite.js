import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'

import styles from '../../styles/global'
import colors from '../../styles/colors'
import { eventToID } from '../../utils/utilityFunctions'
import { joinOngoingEvent } from '../../reducers/eventReducer'
import { checkMessage } from '../../reducers/messageReducer'

const style = {
  buttonJoin: {
    backgroundColor: colors.green
  },
  buttonRemove: {
    backgroundColor: colors.red
  },
  buttonDivider: {
    height: 30
  }
}

const Invite = (props) => {
  const { joinOngoingEvent, checkMessage, user, navigation } = props
  const { message, parent } = navigation.getParam('invProps')

  console.log(message)
  const join = async () => {
    await joinOngoingEvent(eventToID(message.data))
    await checkMessage(message, user.id, 'accepted')
    parent.updateInvites()
    navigation.navigate('InvitesScreen')
  }

  const removeInvite = async () => {
    await checkMessage(message, user.id, 'rejected')
    parent.updateInvites()
    navigation.navigate('InvitesScreen')
  }

  return (
    <View style={styles.noPadding}>
      <Text style={styles.h5}></Text>
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
