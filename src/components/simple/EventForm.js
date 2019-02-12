import React from 'react'
import t from 'tcomb-form-native'
import { formatDate } from '../../utils/dates'
import { Button } from 'react-native-elements'
import { View } from 'react-native'
import { paddingSides } from '../../styles/global'

const { Form } = t.form

const options = {
  fields: {
    description: {
      label: 'Kuvaus',
      error: 'Kuvaus ei saa olla tyhjä.'
    },
    startdate: {
      label: 'Aloitusaika',
      mode: 'datetime',
      config: {
        format: (date) => formatDate(date)
      }
    },
    enddate: {
      label: 'Lopetusaika',
      mode: 'datetime',
      error: 'Tapahtuma ei voi loppua ennen alkamisaikaa.',
      config: {
        format: (date) => formatDate(date)
      }
    }
  }
}

const style = {
  container: {
    width: '100%',
    backgroundColor: 'white',
    padding: paddingSides,
    paddingBottom: 50
  }
}

const EventForm = React.forwardRef((props, ref) => {
  const {
    event,
    onFormChange,
    onButtonPress,
    buttonTitle
  } = props

  const DateIsAfter = t.refinement(t.Date, (date) => date >= event.startdate)

  const Event = t.struct({
    description: t.String,
    startdate: t.Date,
    enddate: DateIsAfter
  })

  return (
    <View style={style.container}>
      <Form
        ref={ref}
        type={Event}
        options={options}
        value={event}
        onChange={onFormChange}
      />

      <Button
        buttonStyle={props.buttonStyle}
        onPress={onButtonPress}
        title={buttonTitle}
      />
    </View>
  )}
)

export default EventForm
