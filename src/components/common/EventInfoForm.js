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
  const [isShowingDatePicker, setIsShowingDatePicker] = useState(false)
  const [isShowingTimePicker, setIsShowingTimePicker] = useState(false)
  const [isModifyingStartDate, setIsModifyingStartDate] = useState(true)
  const [startDateButtonText, setStartDateButtonText] = useState('Alkaa: ' + formatDate(now()))
  const [endDateButtonText, setEndDateButtonText] = useState('Loppuu: ' + formatDate(inOneHour()))
  const [divingEvent, setEvent] = useState({
    title: '',
    description: '',
    startdate: new Date(),
    enddate: inOneHour()
  })

  const Event = t.struct({
    title: t.String,
    description: t.String
  })

  const onButtonPress = async () => {
    await props.createEvent(divingEvent)
    props.navigation.navigate('CustomTargetScreen')
  }

  const onDateChange = (event, date) => {
    if (date !== undefined) {
      if (isModifyingStartDate === true) {
        setEvent({...divingEvent, startdate: date})
      } else {
        setEvent({...divingEvent, enddate: date})
      }
      renderPicker(false)
    }
  }

  const onTimeChange = (event, date) => {
    setIsShowingDatePicker(false)
    setIsShowingTimePicker(false)

    if (date !== undefined) {
      const newDate = isModifyingStartDate ? divingEvent.startdate : divingEvent.enddate
      newDate.setMinutes(date.getMinutes())
      newDate.setHours(date.getHours())

      if (isModifyingStartDate === true) {
        setEvent({...divingEvent, startdate: newDate})
        setStartDateButtonText('Alkaa: ' + formatDate(newDate))
      } else {
        setEvent({...divingEvent, endDate: newDate})
        setEndDateButtonText('Loppuu: ' + formatDate(newDate))
      }
    }
  }

  const renderPicker = datePicker => {
    setIsShowingDatePicker(datePicker)
    setIsShowingTimePicker(!datePicker)
  }

  return (
    <View style={style.noPadding}>
      <ScrollView>
        <View style={style.container}>
          {isShowingDatePicker &&
            <RNDateTimePicker
              mode='date'
              value={new Date()}  //new Date() toimii
              onChange={onDateChange}
            />
          }
          {isShowingTimePicker &&
            <RNDateTimePicker
              mode='time'
              value={new Date()}
              onChange={onTimeChange}
            />
          }
          <Form
            //ref={this.ref}
            type={Event}
            options={options}
            value={divingEvent}
            onChange={(event) => setEvent(event)}
            style={style.container}
          />
          <Button buttonStyle={style.dateButton}
            title={startDateButtonText}
            onPress={(e) => {
              setIsModifyingStartDate(true)
              renderPicker(true)
            }}
          />
          <Button buttonStyle={style.dateButton}
            title={endDateButtonText}
            onPress={(e) => {
              console.log('nyt')
              setIsModifyingStartDate(false)
              renderPicker(true)
            }}
          />
          <Button
            buttonStyle={style.button}
            onPress={onButtonPress}
            title='Seuraava'
          />
        </View>
      </ScrollView>
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
