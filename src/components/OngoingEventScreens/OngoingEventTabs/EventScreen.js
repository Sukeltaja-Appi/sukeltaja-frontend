import React from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import { Text, Button, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'

import { setOngoingEvent, getOngoingEvent } from '../../../reducers/eventReducer'
import { endDives } from '../../../reducers/diveReducer'
import colors from '../../../styles/colors'
import styles from '../../../styles/global'
import { paddingSides } from '../../../styles/global'

const style = {
  buttonEnd: {
    backgroundColor: colors.red,
  },
  buttonInvite: {
    backgroundColor: colors.green
  },
  top: {
    justifyContent: 'flex-start',
    width: '100%',
    padding: paddingSides,
    marginTop: 10
  },
  middle: {
    justifyContent: 'center',
    width: '100%',
    padding: paddingSides,
    marginTop: 10
  },
  bottom: {
    justifyContent: 'flex-end',
    width: '100%',
    padding: paddingSides,
    marginBottom: 10,
  },
  buttonDivider: {
    height: 15
  },
  descriptionStyle: {
    fontSize: 17
  }
}

class EventScreen extends React.Component {

  loadEvent = async () => {
    const { ongoingEvent, getOngoingEvent } = this.props

    await getOngoingEvent(ongoingEvent)
  }

  componentDidMount() {
    this.loadEvent()
  }

  navigate = (value, item) => this.props.navigation.navigate(value, { item })

  toInvites = () => {
    this.navigate('InviteScreen')
  }

  toEditing = () => {
    this.props.navigation.navigate('Muokkaa tapahtumaa', {
      item: this.props.ongoingEvent
    })
  }

  leaveEventButton = () => {
    const { setOngoingEvent, endDives, ongoingDives, user } = this.props

    endDives(ongoingDives, user._id)
    setOngoingEvent(null)
    this.navigate('StartEventScreen')
  }

  userIsCreator = (user) => user._id === this.props.ongoingEvent.creator._id
  userIsAdmin = (user) => this.props.ongoingEvent.admins.map(a => a._id).includes(user._id)

  userIsNotAdmin = () => {
    const { user } = this.props
    const { userIsCreator, userIsAdmin } = this

    if (!userIsCreator(user) && !userIsAdmin(user)) return true

    return false
  }

  /*eslint-disable */
  pressUser = (item) => {
    console.log()
  }
  /*eslint-enable */

  render() {
    const { ongoingEvent } = this.props
    const { admins, participants, creator, title, description } = ongoingEvent

    // This should eventually be replaced by enforcing unique roles
    // in the backend.
    const users = [creator, ...admins, ...participants]

    return (
      <View style={styles.noPadding}>
        <ScrollView keyboardShouldPersistTaps='handled'>

          <View style={style.top}>
            <View style={{ marginBottom: 15 }}>
              <Text h3>{title}</Text>
            </View>

            <Text style={style.descriptionStyle}>{description}</Text>

          </View>

          <View style={style.middle}>
            <Button
              title='Kutsu lisää osallistujia'
              onPress={this.toInvites}
              buttonStyle={style.buttonInvite}
              disabled={this.userIsNotAdmin()}
              raised
            />
            <View style={style.buttonDivider} />
            <Button
              title='Muokkaa tapahtumaa'
              onPress={this.toEditing}
              disabled={this.userIsNotAdmin()}
              raised
            />
            <View style={style.buttonDivider} />
            <Button
              title='Poistu'
              onPress={this.leaveEventButton}
              buttonStyle={style.buttonEnd}
              raised
            />
          </View>

          <View style={style.bottom}>
            <View style={{ marginBottom: 10, magrinTop: 10 }}>
              <Text h4>Osallistujat:</Text>
            </View>

            <FlatList
              data={users}
              renderItem={({ item }) => {
                return (
                  <ListItem
                    onPress={this.pressUser(item)}
                    bottomDivider
                  >
                    <ListItem.Content>
                      <ListItem.Title>{item.usename}</ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                )
              }
              }
              keyExtractor={item => item._id}
            />
          </View>

        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  ongoingDives: state.ongoingDives,
  user: state.user
})

export default connect(
  mapStateToProps,
  { endDives, setOngoingEvent, getOngoingEvent }
)(EventScreen)
