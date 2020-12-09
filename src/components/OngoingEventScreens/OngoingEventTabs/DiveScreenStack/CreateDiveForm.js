import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import locationService from '../../../../services/location'
import { createDive } from '../../../../reducers/diveReducer'
import { now, inOneHour, formatDate, inTenMinutes } from '../../../../utils/dates'
import _ from 'lodash'
import { paddingSides } from '../../../../styles/global'
import t from 'tcomb-form-native'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import CommonButton from '../../../common/CommonButton'
import AppText from '../../../common/AppText'
import { useIsFocused } from '@react-navigation/native'
import colors from '../../../../styles/colors'

const { Form } = t.form

const style = {
  container: {
    width: '100%',
    padding: paddingSides,
    paddingBottom: 50,
  },
  dateButton: {
    width: '100%',
    paddingVertical: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    borderRadius: 10,
  },
  buttonContainer: {
    paddingBottom: 40,
    marginTop: 40,
    paddingVertical: 50,
  },
  button: {
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  buttonDivider: {
    height: 20,
  },
}

const CreateDiveForm = (props) => {
  const [startDate, setStartDate] = useState(now())
  const [endDate, setEndDate] = useState(inTenMinutes())
  const [dive, setDive] = useState({
    user: props.user.username,
    longitude: '0.1',
    latitude: '0.1'
  })

  const getLocation = async() => {
    try {
      const location = await locationService.getLocationAsync()

      const latitude = location.coords.latitude
      const longitude = location.coords.longitude

      dive.latitude = latitude
      dive.longitude = longitude
      setDive(null)
      setDive( dive )
    } catch(err) { console.log('Geolocation unavailable.') }
  }

  // Any user in the event is allowed to create Dives for themselves
  // To create dives for some other event user, the user must be event admin.
  const createButton = async () => {

    const { user, ongoingEvent, createDive } = props
    let { creator, admins, participants } = ongoingEvent

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

    dive.user = user._id

    const diving = {
      ...dive,
      startdate: startDate,
      event: ongoingEvent._id,
      enddate: endDate,
    }

    if(allowed) {
      console.log(diving)
      console.log(user._id)
      await createDive(diving, user._id)
      props.navigation.replace('DiveListScreen')
    }
  }

  return (
    <View>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={style.container}>
          <Form
            type={Dive}
            options={userOptions}
            value={dive}
            onChange={(dive) => setDive(dive)}
          />
          <Button
            buttonStyle={style.button}
            title='Hae sijainti'
            onPress={getLocation}
          />
          <AppText style={{
            color: colors.primary,
            fontSize: 16,
            marginBottom: 5,
            marginLeft: 10
          }}>Alkamisaika:</AppText>
          <DateTimePickerButton
            date={startDate}
            setDate={setStartDate}
            text=""
          />
          <AppText style={{
            color: colors.primary,
            fontSize: 16,
            marginBottom: 5,
            marginLeft: 10
          }}>Loppumisaika:</AppText>
          <DateTimePickerButton
            date={endDate}
            setDate={setEndDate}
            text=""
          />
          <View syle={style.buttonContainer}>
            <View style={style.buttonDivider} />
            <CommonButton
              title="Lisää sukellus"
              onPress={createButton}
              containerStyle={style.submitButton}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const Dive = t.struct({
  user: t.String,
  longitude: t.Number,
  latitude: t.Number
})

const DateTimePickerButton = (props) => {
  const { date, setDate, text } = props
  const [isShowingDatePicker, showDatePicker] = useState(false)
  const [isShowingTimePicker, showTimePicker] = useState(false)
  const [localDate, setLocalDate] = useState(date)

  const onDateChange = (event, newDate) => {
    showDatePicker(false)
    if (newDate !== undefined) {
      setDate(newDate)
      setLocalDate(newDate)
      showTimePicker(true)
    }
  }

  const onTimeChange = (event, newDate) => {
    showTimePicker(false)
    if (newDate !== undefined) {
      setLocalDate(localDate.setMinutes(newDate.getMinutes()))
      setLocalDate(localDate.setHours(newDate.getHours()))
      setDate(localDate)
      setLocalDate(localDate)
    }
  }

  return (
    <View style={style.noPadding}>
      {isShowingDatePicker && (
        <RNDateTimePicker mode="date" value={date} onChange={onDateChange} />
      )}
      {isShowingTimePicker && (
        <RNDateTimePicker mode="time" value={date} onChange={onTimeChange} />
      )}
      <Button
        buttonStyle={style.button}
        title={text + ' ' + formatDate(localDate)}
        onPress={() => showDatePicker(true)}
      />
    </View>
  )
}

const stylesheet = _.cloneDeep(t.form.Form.stylesheet)

stylesheet.textbox.normal.backgroundColor = 'white'
stylesheet.controlLabel.normal.color = 'black'
stylesheet.controlLabel.normal.marginLeft = 15
stylesheet.textbox.normal.borderRadius = 15
stylesheet.controlLabel.normal.fontFamily = 'nunito-bold'
stylesheet.controlLabel.error.fontFamily = 'nunito-bold'
stylesheet.textbox.error.backgroundColor = 'white'
stylesheet.controlLabel.error.color = 'white'
stylesheet.controlLabel.error.marginLeft = 15
stylesheet.textbox.error.borderRadius = 20

const userOptions = {
  fields: {
    user: {
      label: 'Sukeltajan nimi',
      error: 'Sukeltajan nimi ei saa olla tyhjä.',
      stylesheet: stylesheet,
    },
    latitude: {
      label: 'Leveysaste',
      error: 'Leveysaste ei saa olla tyhjä.',
      stylesheet: stylesheet,
    },
    longitude: {
      label: 'Pituusaste',
      error: 'Pituusaste ei saa olla tyhjä.',
      stylesheet: stylesheet,
    }
  }
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  user: state.user
})

export default connect(
  mapStateToProps,
  { createDive }
)(CreateDiveForm)
