import React, { useEffect, useState } from 'react'
import t from 'tcomb-form-native'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { formatDate } from '../../../utils/dates'
import { Button } from 'react-native-elements'
import { View } from 'react-native'
import { paddingSides } from '../../../styles/global'
import { startEvent, setOngoingEvent } from '../../../reducers/eventReducer'
import { connect } from 'react-redux'
import { inOneHour } from '../../../utils/dates'
import decimalToDMS from '../../../utils/coordinates'
import AppButton from '../../common/AppButton'
import targetService from '../../../services/targets'
import { useIsFocused } from '@react-navigation/native'
import _ from 'lodash'
import { ScrollView } from 'react-native-gesture-handler'

const { Form } = t.form

const EventInfoForm = (props) => {
  const isFocused = useIsFocused()
  const [modifyEvent, setModifyEvent] = useState(false)
  const [navFromCustomMap, setNavFromCustomMap] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(inOneHour())
  const [target, setTarget] = useState()
  const [divingEvent, setEvent] = useState({
    title: '',
    description: '',
  })

  useEffect(() => {
    const item = props.route.params.item

    if (!modifyEvent && item !== undefined) {
      setModifyEvent(true)

      setEvent({
        title: item.title,
        description: item.description
      })
      setStartDate(new Date(item.startdate))
      setEndDate(new Date(item.enddate))
      setTarget({
        ...item.target,
        location: {
          longitude: item.target.longitude,
          latitude: item.target.latitude
        },
      })

      return
    }

    if (navFromCustomMap) {
      setNavFromCustomMap(false)

      return
    }
    if (isFocused) {
      getInitialData()
    }
  }, [isFocused])

  const getInitialData = async () => {
    const targetFromMap = props.route.params.target

    if (targetFromMap !== undefined) {
      setTarget(targetFromMap)
    }
  }

  const Event = t.struct({
    title: t.String,
    description: t.String,
  })

  const submitForm = async () => {
    let location

    if (modifyEvent) {
      console.log('test')

      return
    }

    if (target !== 'undefined') {
      location = await targetService.create({
        ...target,
        name: undefined,
        user_created: true,
      })
    }

    const event = {
      ...divingEvent,
      startdate: startDate,
      enddate: endDate,
      target: location,
    }

    await props.startEvent(event)
    props.navigation.navigate('Tapahtumat', {
      screen: 'Omat tapahtumat'
    })
  }

  const navigate = () => {
    props.navigation.navigate('Valitse sijainti', {
      target: target,
      setTarget: setTarget,
      setNavFromCustomMap: setNavFromCustomMap,
    })
  }

  const getLocationButtonTitle = () => {
    if (target !== undefined) {
      return `Sijainti: ${decimalToDMS(target.latitude)}, ${decimalToDMS(
        target.longitude
      )}`
    }

    return 'Muokkaa sijaintia'
  }

  const getSubmitButtonTitle = () => {
    if (modifyEvent) {
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
            onPress={navigate}
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
          <View syle={style.buttonContainer}>
            <AppButton
              title={getSubmitButtonTitle()}
              onPress={submitForm}
              containerStyle={style.submitButton}
            />
          </View>
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
  buttonContainer: {
    paddingBottom: 40,
    marginTop: 40,
    paddingVertical: 50,
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

export default connect(mapStateToProps, { startEvent, setOngoingEvent })(
  EventInfoForm
)
