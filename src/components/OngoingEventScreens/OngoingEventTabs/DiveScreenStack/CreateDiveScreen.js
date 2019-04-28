import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import DiveForm from '../../../common/DiveForm'

import locationService from '../../../../services/location'
import { createDive } from '../../../../reducers/diveReducer'
import { now, inTenMinutes } from '../../../../utils/dates'

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

class CreateDiveScreen extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()

    let longitude = 0.1
    let latitude = 0.1
    const { target } = this.props.ongoingEvent

    if (target) {
      latitude = target.latitude
      longitude = target.longitude
    }

    this.state = {
      dive: {
        user: '',
        startdate: now(),
        enddate: inTenMinutes(),
        latitude,
        longitude
      }
    }
  }

  getLocation = async() => {
    try {
      const location = await locationService.getLocationAsync()

      const latitude = location.coords.latitude
      const longitude = location.coords.longitude

      let dive = this.state.dive

      dive.latitude = latitude
      dive.longitude = longitude

      this.setState({ dive })
    } catch(err) { console.log('Geolocation unavailable.') }
  }

  // Any user in the event is allowed to create Dives for themselves
  // To create dives for some other event user, the user must be event admin.
  createButton = async () => {
    const validated = this.ref.current.getValue()
    const { dive } = this.state

    if (validated) {
      const { user, ongoingEvent } = this.props
      let { creator, admins, participants } = ongoingEvent

      dive.event = ongoingEvent._id

      admins = [ creator, ...admins]
      const allParticipants = [ creator, ...admins, ...participants ]
      let allowed = false

      if (user.username === dive.user) {
        dive.user = user._id
        allowed = true

      } else if (admins.map(a => a._id).includes(user._id)) {

        for (let i=0; i < allParticipants.length; i++) {

          if(allParticipants[i].username === dive.user) {

            dive.user = allParticipants[i]._id
            allowed = true
            break
          }
        }
      }

      if(allowed) {
        await this.props.createDive(dive)
        this.props.navigation.replace('DiveListScreen')
      }
    }
  }

  navigate = (value) => this.props.navigation.navigate(value)

  render() {
    const { dive } = this.state

    return (
      <View style={styles.noPadding}>
        <ScrollView>
          <DiveForm
            ref={this.ref}
            dive={dive}
            onFormChange={(dive) => this.setState({ dive })}
            onButtonPress={this.createButton}
            buttonStyle={{ backgroundColor: colors.success }}
            buttonTitle="Lisää Sukellus"
          />
          <View style={style.buttonContainer}>
            <Button
              title='Hae Nykyinen sijaintini'
              onPress={this.getLocation}
              raised
            />
            <View style={style.divider}/>
            <Button
              title='<-- Takaisin'
              onPress={() => this.navigate('DiveListScreen')}
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
  user: state.user
})

export default connect(
  mapStateToProps,
  { createDive }
)(CreateDiveScreen)
