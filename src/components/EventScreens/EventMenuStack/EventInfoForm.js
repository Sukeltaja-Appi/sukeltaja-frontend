import React, { useEffect, useState } from 'react'
import t from 'tcomb-form-native'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { formatDate } from '../../../utils/dates'
import { Button } from 'react-native-elements'
import { View } from 'react-native'
import { paddingSides } from '../../../styles/global'
import { startEvent, updateEvent, setOngoingEvent } from '../../../reducers/eventReducer'
import { connect } from 'react-redux'
import { inOneHour } from '../../../utils/dates'
import decimalToDMS from '../../../utils/coordinates'
import AppButton from '../../common/AppButton'
import _ from 'lodash'
import { ScrollView } from 'react-native-gesture-handler'

const { Form } = t.form

const EventInfoForm = (props) => {
  const item = props.route.params.item
  const modifying = item !== undefined ? true : false
  const [startDate, setStartDate] = useState(modifying ? new Date(item.startdate) : new Date())
  const [endDate, setEndDate] = useState(modifying ? new Date(item.enddate) : inOneHour())
  const [target, setTarget] = useState(modifying ? item.target : props.route.params.target)
  const [divingEvent, setEvent] = useState(modifying ? {
    title: item.title,
    description: item.description,
  } : {
    title: '',
    description: '',
  })

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

  const Event = t.struct({
    title: t.String,
    description: t.String,
  })

  const submitForm = async () => {
    const event = {
      ...divingEvent,
      startdate: startDate,
      enddate: endDate,
      target,
    }

    if (!modifying) {
      await props.startEvent(event)
    } else {
      await props.updateEvent({ ...item, ...event })
    }

    props.navigation.navigate('Tapahtumat', {
      screen: 'Omat tapahtumat'
    })
  }

  const targetChanged = (newTarget) => {
    console.log(newTarget)
    setTarget(newTarget)
    props.navigation.goBack()
  }

  const changeLocation = () =>
    props.navigation.navigate('Valitse sijainti', {
      previousTarget: target,
      targetSelected: targetChanged,
    })

  const getLocationButtonTitle = () => {
    if (target !== undefined) {
      if (target.name !== undefined && target.name !== '') {
        return `Kohde: ${target.name}`
      }

      return `Sijainti: ${decimalToDMS(target.latitude)}, ${decimalToDMS(
        target.longitude
      )}`
    }

    return 'Valitse sijainti'
  }

  const getSubmitButtonTitle = () => {
    if (modifying) {
      return 'Tallenna muutokset'
    }

    return 'Luo tapahtuma!'
  }

  return (
    <View>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={style.container}>
          <Form
            type={Event}
            options={options}
            value={divingEvent}
            onChange={(event) => setEvent(event)}
          />
          <Button
            buttonStyle={style.button}
            title={getLocationButtonTitle()}
            onPress={changeLocation}
          />
          <DateTimePickerButton
            date={startDate}
            setDate={setStartDate}
            text="Alkaa: "
          />
          <DateTimePickerButton
            date={endDate}
            setDate={setEndDate}
            text="Loppuu: "
          />
          <AppButton
            title={getSubmitButtonTitle()}
            onPress={submitForm}
            containerStyle={style.submitButton}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const DateTimePickerButton = (props) => {
  const { date, setDate, text } = props
  const [isShowingDatePicker, showDatePicker] = useState(false)
  const [isShowingTimePicker, showTimePicker] = useState(false)

  const onDateChange = (event, newDate) => {
    showDatePicker(false)
    if (newDate !== undefined) {
      setDate(newDate)
    }
    showTimePicker(true)
  }

  const onTimeChange = (event, newDate) => {
    showDatePicker(false)
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
        title={text + ' ' + formatDate(date)}
        onPress={() => {
          showDatePicker(true)
          showTimePicker(false)
        }}
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
  button: {
    paddingVertical: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#00A3FF',
  },
  submitButton: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginRight: 40,
    marginLeft: 40,
  },
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

const options = {
  fields: {
    title: {
      label: 'Tapahtuman nimi',
      error: 'Otsikko ei saa olla tyhjä.',
      stylesheet: stylesheet,
    },
    description: {
      multiline: true,
      label: 'Kuvaus',
      stylesheet: {
        ...stylesheet,
        textbox: {
          ...stylesheet.textbox,
          bottom: 30,
          normal: {
            ...stylesheet.textbox.normal,
            height: 140,
            textAlignVertical: 'top',
          },
          error: {
            ...stylesheet.textbox.error,
            height: 140,
          },
        },
      },
    },
  },
}

const mapStateToProps = (state) => ({
  setOngoingEvent: state.setOngoingEvent,
  ongoingEvent: state.ongoingEvent,
})

export default connect(mapStateToProps, { startEvent, updateEvent, setOngoingEvent })(
  EventInfoForm
)
