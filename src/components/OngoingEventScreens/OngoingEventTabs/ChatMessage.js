import React from 'react'
import { View } from 'react-native'
import { Text, Divider, Button } from 'react-native-elements'
import { connect } from 'react-redux'

import eventMessageService from '../../../services/eventMessages'
import { formatDate } from '../../../utils/dates'
import colors from '../../../styles/colors'
import styles, { paddingSides } from '../../../styles/global'

const style = {
  container: {
    paddingHorizontal: paddingSides,
    paddingVertical: 10,
    backgroundColor: 'white'
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

const ChatMessage = (props) => {
  const { navigation, user, ongoingEvent } = props
  const { admins, creator } = ongoingEvent
  const chatMessage = navigation.getParam('item')

  const back = () => navigation.navigate('ChatScreen')

  const deletionIsAllowed = () => {
    if(user._id === chatMessage.user._id) return true
    if(user._id === creator._id) return true
    if(admins.map(a => a._id).includes(user._id)) return true

    return false
  }

  const deleteButton = () => {
    if(deletionIsAllowed()) {
      eventMessageService.del(chatMessage._id)
      back()
    }
  }

  return (
    <View style={styles.noPadding}>
      <View style={style.container}>

        <Divider style={style.divider} />

        <Text style={style.text}>{ chatMessage.text }</Text>

        <Divider style={style.divider} />

        <Text style={style.text}>Lähettäjä: { chatMessage.user.username }</Text>
        <Text style={style.text}>Lähetetty:   { formatDate(chatMessage.created) }</Text>

        <Divider style={style.divider} />

        <Button
          title='Poista'
          buttonStyle={style.buttonDelete}
          onPress={deleteButton}
          disabled={!deletionIsAllowed()}
          raised
        />

        <Divider style={style.divider} />

        <Button
          title='<- Takaisin'
          onPress={back}
          raised
        />
      </View>
    </View>
  )
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  user: state.user
})

export default connect(
  mapStateToProps,
  null
)(ChatMessage)
