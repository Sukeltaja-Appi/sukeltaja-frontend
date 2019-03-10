import React from 'react'
import { View, FlatList } from 'react-native'
import { Text, Button, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'

import { endEvent, mergeOngoingEvent, leaveOngoingEvent, getOngoingEvent } from '../../reducers/eventReducer'
import { endDive } from '../../reducers/diveReducer'
import colors from '../../styles/colors'
import { usernameOrId, objectToID } from '../../utils/utilityFunctions'

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
  constructor(props) {
    super(props)
    this.endButton = this.endButton.bind(this)
  }

  reloadEvent = async () => {
    const { ongoingEvent, getOngoingEvent } = this.props

    await getOngoingEvent(ongoingEvent)
  }

  componentDidMount() {
    this.reloadEvent()
  }

  navigate = (value, item) => this.props.navigation.navigate(value, { item })

  endDives = async () => {
    const { endDive, ongoingEvent, ongoingDive } = this.props

    if(ongoingDive) {

      ongoingDive.enddate = new Date()
      ongoingDive.event = ongoingEvent.id
      await endDive(ongoingDive)
    }
  }

  endEventButton = async () => {
    let { ongoingEvent, endEvent } = this.props

    await this.endDives()
    await endEvent(ongoingEvent)

    this.navigate('StartEventScreen')
  }

  leaveEventButton = () => {
    this.props.leaveOngoingEvent()
    this.navigate('StartEventScreen')
  }

  toInvites = () => {
    this.navigate('InviteScreen')
  }

  endButton = () => {
    const { user, ongoingEvent } = this.props

    if(user.id === objectToID(ongoingEvent.creator)) {
      return(
        <Button
          title='Lopeta'
          onPress={this.endEventButton}
          buttonStyle={style.buttonEnd}
          raised
        />
      )
    }

    return(
      <Button
        title={'Poistu'}
        onPress={this.leaveEventButton}
        buttonStyle={style.buttonEnd}
        raised
      />
    )
  }

  pressUser = (item) => {
    console.log(item)
  }

  render () {
    const { ongoingEvent } = this.props

    let users = []

    if (ongoingEvent) {
      const { creator, admins, participants } = ongoingEvent

      users = [ creator, ...admins, ...participants ]
    }

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
                  onPress={this.pressUser(item)}
                  bottomDivider
                />
              )}
            }
            keyExtractor={item => objectToID(item)}
          />

        </View>

        <View style={style.bottom}>
          <Button
            title='+ Kutsu lisää osallistujia'
            onPress={this.toInvites}
            buttonStyle={style.buttonInvite}
            raised
          />
          <View style={style.buttonDivider}/>
          {this.endButton()}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  ongoingDive: state.ongoingDive,
  user: state.user
})

export default connect(
  mapStateToProps,
  { endEvent, mergeOngoingEvent, endDive, leaveOngoingEvent, getOngoingEvent }
)(OngoingEvent)
