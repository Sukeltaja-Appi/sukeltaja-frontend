import React, { Component, useState } from 'react'
import t from 'tcomb-form-native'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { formatDate } from '../../utils/dates'
import { Button } from 'react-native-elements'
import { View } from 'react-native'
import { paddingSides } from '../../styles/global'
import { ScrollView } from 'react-native-gesture-handler'
import { createEvent } from '../../reducers/eventReducer'
import { connect } from 'react-redux'
import { now, inOneHour } from '../../utils/dates'

const { Form } = t.form

const EventInfoForm = (props) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(inOneHour())
  const [divingEvent, setEvent] = useState({
    title: '',
    description: ''
  })

  const Event = t.struct({
    title: t.String,
    description: t.String
  })

  const submitForm = async () => {
    const event = {
      ...divingEvent,
      startdate: startDate,
      enddate: endDate
    }
    await props.createEvent(event)
    props.navigation.navigate('CustomTargetScreen')
  }

  return (
    <View style={style.noPadding}>
      <ScrollView>
        <View style={style.container}>
          <Form
            type={Event}
            options={options}
            value={divingEvent}
            onChange={(event) => setEvent(event)}
            style={style.container}
          />
          <DateTimePickerButton
            date={startDate}
            setDate={setStartDate}
            text={'Alkaa: '}
          />
          <DateTimePickerButton
            date={endDate}
            setDate={setEndDate}
            text={'Loppuu: '}
          />
          <Button
            buttonStyle={style.button}
            onPress={submitForm}
            title='Seuraava'
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
  const [localDate, setLocalDate] = useState(date)

  const onDateChange = (event, newDate) => {
    showDatePicker(false)
    if (newDate !== undefined) {
      setDate(newDate)
      setLocalDate(newDate)
    }
    showTimePicker(true)
  }

  const onTimeChange = (event, newDate) => {
    showDatePicker(false)
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
      {isShowingDatePicker &&
        <RNDateTimePicker
          mode='date'
          value={date}
          onChange={onDateChange}
        />
      }
      {isShowingTimePicker &&
        <RNDateTimePicker
          mode='time'
          value={date}
          onChange={onTimeChange}
        />
      }
      <Button buttonStyle={style.dateButton}
        title={text + ' ' + formatDate(localDate)}
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
    paddingBottom: 50
  },
  bottom: {
    justifyContent: 'flex-end',
    width: '100%',
    padding: paddingSides,
    bottom: 20,
  },
  dateButton: {
    width: '100%',
    paddingVertical: 10,
    marginTop: 30,
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  button: {
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 40,
    backgroundColor: '#00A3FF',
    paddingVertical: 15,
    borderColor: '#118BFC',
    borderWidth: 3,
    borderRadius: 40,
  }
}

const options = {
  i18n: {
    optional: '',
    required: ''
  },
  fields: {
    title: {
      label: 'Otsikko',
      error: 'Otsikko ei saa olla tyhjä.',
    },
    description: {
      label: 'Kuvaus',
      multiline: true,
      stylesheet: {
        ...Form.stylesheet,
        textbox: {
          ...Form.stylesheet.textbox,
          normal: {
            ...Form.stylesheet.textbox.normal,
            height: 140,
            textAlignVertical: 'top'
          },
          error: {
            ...Form.stylesheet.textbox.error,
            height: 140
          }
        }
      }
    }
  }
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  ongoingDives: state.ongoingDives,
  user: state.user
})

export default connect(
  mapStateToProps,
  { createEvent }
)(EventInfoForm)
