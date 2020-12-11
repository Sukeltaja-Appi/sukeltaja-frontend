import React from 'react'
import { connect } from 'react-redux'
import { CommonActions } from '@react-navigation/native'
import { View, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import DiveForm from '../../../common/DiveForm'

import locationService from '../../../../services/location'
import { updateDive } from '../../../../reducers/diveReducer'
import colors from '../../../../styles/colors'
import styles from '../../../../styles/global'
import { paddingSides } from '../../../../styles/global'

const style = {
  divider: {
    height: 10
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: paddingSides,
    paddingBottom: 50
  }
}

class EditDiveScreen extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()

    const {
      _id,
      user,
      startdate,
      enddate,
      latitude,
      longitude,
      ...rest
    } = props.route.params.item

    this.state = {
      dive: {
        _id,
        user: user.username,
        startdate: new Date(startdate),
        enddate: new Date(enddate),
        longitude,
        latitude
      },
      navigatedFromDiveHistory: props.route.params.diveHistory ? true : false,
      originalDive: props.route.params.item,
      ...rest
    }
  }

  getLocation = async () => {
    console.log(this.state)
    try {
      const location = await locationService.getLocationAsync()

      const latitude = location.coords.latitude
      const longitude = location.coords.longitude

      let dive = this.state.dive

      dive.latitude = latitude
      dive.longitude = longitude

      this.setState({ dive })
    } catch (err) { console.log('Geolocation unavailable.') }
  }

  back = (dive) => {
    const { navigatedFromDiveHistory } = this.state

    if (navigatedFromDiveHistory) {
      this.props.navigation.navigate('Sukellus', { dive })

      return
    }

    const resetAction = CommonActions.reset({
      index: 2,
      routes: [
        { name: 'DiveScreen' },
        { name: 'DiveListScreen' },
        { name: 'Dive', params: { item: dive } },
      ],
    })

    this.props.navigation.dispatch(resetAction)
  }

  // User can only edit dives in which they are the diver
  // or any dives in the event if they have admin/creator status.
  updateButton = async () => {
    var { dive } = this.state
    const validated = this.ref.current.getValue()
    const { navigatedFromDiveHistory, user, events, ongoingEvent, updateDive } = this.props
    const event = events.find(e => e.dives.some(item => item._id === dive._id))

    if (validated) {
      if (navigatedFromDiveHistory) {
        let allowed = false

        if (dive.startdate < dive.enddate) {
          allowed = true
        }

        if (allowed) {
          dive.event = event._id
          dive = await updateDive(dive, user._id)

          this.props.navigation.navigate('Sukellus', { dive })
        }

        return
      }

      let { creator, admins, participants } = ongoingEvent

      admins = [creator, ...admins]
      const allParticipants = [creator, ...admins, ...participants]
      let allowed = false

      if (user.username === dive.user) {
        dive.user = user._id
        allowed = true

      } else if (admins.map(a => a._id).includes(user._id)) {

        for (let i = 0; i < allParticipants.length; i++) {

          if (allParticipants[i].username === dive.user) {

            dive.user = allParticipants[i]._id
            allowed = true
            break
          }
        }
      }

      if (allowed) {
        dive.event = ongoingEvent._id
        const updatedDive = await updateDive(dive, user._id)

        this.back(updatedDive)
      }
    }
  }

  render() {
    const { dive, originalDive } = this.state

    return (
      <View style={styles.noPadding}>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <DiveForm
            ref={this.ref}
            dive={dive}
            onFormChange={(dive) => this.setState({ dive })}
            onButtonPress={this.updateButton}
            buttonStyle={{ backgroundColor: colors.success }}
            buttonTitle='Tallenna muutokset'
          />
          <View style={style.buttonContainer}>
            <Button
              title='Hae Nykyinen sijaintini'
              onPress={this.getLocation}
              raised
            />
            <View style={style.divider} />
            <Button
              title='<-- Takaisin'
              onPress={() => this.back(originalDive)}
              raised
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  events: state.events,
  user: state.user
})

export default connect(
  mapStateToProps,
  { updateDive }
)(EditDiveScreen)
