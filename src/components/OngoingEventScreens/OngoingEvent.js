import React from 'react'
import { View, FlatList } from 'react-native'
import { Text, Button, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'

import { setOngoingEvent, getOngoingEvent } from '../../reducers/eventReducer'
import { endDives } from '../../reducers/diveReducer'
import colors from '../../styles/colors'

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

class OngoingEvent extends React.Component {

  loadEvent = async () => {
    const { ongoingEvent, getOngoingEvent } = this.props

    await getOngoingEvent(ongoingEvent)
  }

  componentDidMount() {
    this.loadEvent()
  }

  navigate = (value, item) => this.props.navigation.navigate(value, { item })

  toInvites = () => {
    this.navigate('InviteScreen', { item: { ongoingComponent: this } })
  }

  toEditing = () => {
    this.navigate('EditEventScreen', this.props.ongoingEvent)
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

    if(!userIsCreator(user) && !userIsAdmin(user)) return true

    return false
  }

  /*eslint-disable */
  pressUser = (item) => {
    console.log()
  }
  /*eslint-enable */

  render () {
    const { ongoingEvent } = this.props
    const { admins, participants, creator, title } = ongoingEvent

    // This should eventually be replaced by enforcing unique roles
    // in the backend.
    const users = [ ...admins, ...participants, creator ]
    const distinctIds = [ ...new Set(users.map(user => user._id)) ]
    const distinctUsers = distinctIds
      .map(_id => {
        return {
          _id,
          username: users.find(user => user._id === _id).username
        }
      })

    return (
      <View style={style.main}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text h3>{title}</Text>
        </View>

        <Text h4>Osallistujat:</Text>

        <View style={style.list}>
          <FlatList
            data={distinctUsers}
            renderItem={({ item }) => {

              return (
                <ListItem
                  title={item.username}
                  onPress={this.pressUser(item)}
                  bottomDivider
                />
              )}
            }
            keyExtractor={item => item._id}
          />

        </View>

        <View style={style.bottom}>
          <Button
            title='+ Kutsu lisää osallistujia'
            onPress={this.toInvites}
            buttonStyle={style.buttonInvite}
            disabled={this.userIsNotAdmin()}
            raised
          />
          <View style={style.buttonDivider}/>
          <Button
            title='Muokka tapahtumaa'
            onPress={this.toEditing}
            disabled={this.userIsNotAdmin()}
            raised
          />
          <View style={style.buttonDivider}/>
          <Button
            title={'Poistu'}
            onPress={this.leaveEventButton}
            buttonStyle={style.buttonEnd}
            raised
          />
        </View>
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
)(OngoingEvent)
