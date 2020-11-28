import React from 'react'
import { connect } from 'react-redux'
import { CommonActions } from '@react-navigation/native'
import { View, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import DiveForm from '../../common/DiveForm'

import locationService from '../../../services/location'
import { updateDive } from '../../../reducers/diveReducer'
import colors from '../../../styles/colors'
import styles from '../../../styles/global'
import { paddingSides } from '../../../styles/global'
import { setOngoingEvent } from '../../../reducers/eventReducer'

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

class DiveScreenEdit extends React.Component {
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
      originalDive: props.route.params.item,
      ...rest
    }
  }

  navigate = (value) => this.props.navigation.navigate(value)

  updateButton = async () => {
    const { dive } = this.state
    const { user, events, updateDive } = this.props
    const event = events.find(e => e.dives.some(item => item._id === dive._id))

    dive.event = event._id
    const updatedDive = await updateDive(dive, user._id)

    this.props.navigation.navigate('Sukellus', { updatedDive })
  }

  Dive = () => {
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
  render() {
    return this.Dive()
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  events: state.events,
  ongoingEvent: state.ongoingEvent
})

export default connect(
  mapStateToProps,
  { updateDive }
)(DiveScreenEdit)