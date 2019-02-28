import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { ListItem, Button } from 'react-native-elements'
import styles from '../../styles/global'
import { formatDate } from '../../utils/dates'
import { connect } from 'react-redux'
import { joinOngoingEvent } from '../../reducers/eventReducer'

const style = {
  subtitle: {
    fontStyle: 'italic',
    fontSize: 14
  },
  buttonRow: {
    justifyContent: 'center',
    padding: 10
  },
  buttonDivider: {
    width: 20
  }
}

const InvitesScreen = (props) => {

  const join = (message) => {

  }

  const abandon = (message) => {

  }

  const { messages } = props

  const navigate = (item) => (
    props.navigation.navigate('Invite', { item })
  )

  const messagesSortedByDate = () => (
    messages.sort((a, b) => b.created.localeCompare(a.created))
  )

  const showMessages = () => {
    if (messages.length === 0) {
      return (
        <View style={styles.centered}>
          <Text style={styles.h5}>Ei kutsuja.</Text>
        </View>
      )
    }

    return(
      <View style={styles.noPadding}>
        <FlatList
          data={messagesSortedByDate()}
          renderItem={({ item }) => {
            const { sender, created } = item

            return (
              <ListItem
                title={sender}
                subtitle={formatDate(created)}
                onPress={() => navigate(item)}
                subtitleStyle={style.subtitle}
                bottomDivider
                chevron
              >

              <View style={{ ...styles.row, ...style.buttonRow }}>
                <Button
                  title="Liity"
                  onPress={() => join(item)}
                />
                <View style={style.buttonDivider}/>
                <Button
                  title="Hylkää"
                  onPress={() => abandon(item)}
                />
              </View>

              </ListItem>
            )}
          }
          keyExtractor={item => item.id}
        />
      </View>
    )
  }

  return showMessages()

  return(
    <View></View>
  )
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  messages: state.messages
})

export default connect(
  mapStateToProps,
  { joinOngoingEvent }
)(InvitesScreen)
