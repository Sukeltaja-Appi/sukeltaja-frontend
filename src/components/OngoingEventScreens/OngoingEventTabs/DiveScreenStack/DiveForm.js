import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import locationService from '../../../../services/location'
import { createDive, updateDive } from '../../../../reducers/diveReducer'
import { now, formatDate, inTenMinutes } from '../../../../utils/dates'
import _ from 'lodash'
import { paddingSides } from '../../../../styles/global'
import t from 'tcomb-form-native'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import CommonButton from '../../../common/CommonButton'
import AppText from '../../../common/AppText'
import colors from '../../../../styles/colors'

const { Form } = t.form

const DiveForm = (props) => {
  const reference = React.createRef()
  const item = props.route.params?.item
  const editingDive = item !== undefined ? true : false
  const diveHistory = props.route.params?.diveHistory ? true : false
  const event = diveHistory ? props.route.params.ongoingEvent : props.ongoingEvent
  const [startDate, setStartDate] = useState(editingDive ? new Date(item.startdate) : now())
  const [endDate, setEndDate] = useState(editingDive ? new Date(item.enddate) : inTenMinutes())
  const [dive, setDive] = useState(editingDive ?
    { user: item.user.username, longitude: item.longitude, latitude: item.latitude } :
    { user: props.user.username, longitude: '0.1', latitude: '0.1' })

  useEffect(() => {
    if (startDate > endDate) {
      setEndDate(startDate)
    }
  }, [startDate])

  useEffect(() => {
    if (startDate > endDate) {
      setStartDate(endDate)
    }
  }, [endDate])

  const getLocation = async () => {
    try {
      const location = await locationService.getLocationAsync()

      const latitude = location.coords.latitude
      const longitude = location.coords.longitude

      dive.latitude = latitude
      dive.longitude = longitude
      setDive(null)
      setDive(dive)
    } catch (err) { console.log('Geolocation unavailable.') }
  }

  // Any user in the event is allowed to create Dives for themselves
  // To create dives for some other event user, the user must be event admin.
  const submitForm = async () => {
    if (!reference.current.getValue()) {
      return
    }
    const { user, ongoingEvent, createDive, updateDive } = props
    let { creator, admins, participants } = event

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

    if (editingDive) {
      dive.user = user._id
    }

    const diving = {
      ...dive,
      startdate: startDate,
      enddate: endDate,
      event: ongoingEvent._id,
    }

    if (allowed) {
      if (editingDive) {
        const updatedDive = { ...item, ...diving, event: event._id }

        await updateDive(updatedDive, user._id)
      } else {
        await createDive(diving, user._id)
      }

      if (diveHistory) {
        props.navigation.navigate('Profiili')
      } else {
        props.navigation.replace('DiveListScreen')
      }
    }
  }

  return (
    <View>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={style.container}>
          <Form
            ref={reference}
            type={Dive}
            options={options}
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
          />
          <View syle={style.buttonContainer}>
            <View style={style.buttonDivider} />
            <CommonButton
              title={editingDive ? 'Tallenna muutokset' : 'Luo sukellus'}
              onPress={submitForm}
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
  latitude: t.Number,
  longitude: t.Number,
})

const DateTimePickerButton = (props) => {
  const { date, setDate } = props
  const [isShowingDatePicker, showDatePicker] = useState(false)
  const [isShowingTimePicker, showTimePicker] = useState(false)

  const onDateChange = (event, newDate) => {
    showDatePicker(false)
    if (newDate !== undefined) {
      setDate(newDate)
      showTimePicker(true)
    }
  }

  const onTimeChange = (event, newDate) => {
    showTimePicker(false)
    if (newDate !== undefined) {
      setDate(newDate)
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
        title={formatDate(date)}
        onPress={() => showDatePicker(true)}
      />
    </View>
  )
}

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

const stylesheet = _.cloneDeep(t.form.Form.stylesheet)

stylesheet.textbox.normal.backgroundColor = 'white'
stylesheet.controlLabel.normal.color = '#118bfc'
stylesheet.controlLabel.normal.marginLeft = 10
stylesheet.textbox.normal.borderRadius = 15
stylesheet.controlLabel.normal.fontFamily = 'nunito-extrabold'
stylesheet.controlLabel.error.fontFamily = 'nunito-extrabold'
stylesheet.textbox.error.backgroundColor = 'white'
stylesheet.controlLabel.error.color = 'white'
stylesheet.controlLabel.error.marginLeft = 15
stylesheet.textbox.error.borderRadius = 20

const options = {
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
  { createDive, updateDive }
)(DiveForm)
