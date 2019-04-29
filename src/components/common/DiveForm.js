import React from 'react'
import t from 'tcomb-form-native'
import { formatDate } from '../../utils/dates'
import { Button } from 'react-native-elements'
import { View } from 'react-native'
import { paddingSides } from '../../styles/global'

const { Form } = t.form

const options = {
  i18n: {
    optional: '',
    required: ''
  },
  fields: {
    user: {
      label: 'Sukeltaja',
      error: 'Anna tapahtumaan osallistuvan sukeltajan käyttäjänimi.'
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
    },
    latitude: {
      label: 'Leveysaste',
      error: 'Anna asteet muodossa: 12.412345'
    },
    longitude: {
      label: 'Pituusaste',
      error: 'Anna asteet muodossa: 12.41413'
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

const DiveForm = React.forwardRef((props, ref) => {
  let {
    dive,
    onFormChange,
    onButtonPress,
    buttonTitle
  } = props

  const DateIsAfter = t.refinement(t.Date, (date) => date >= dive.startdate)

  const Dive = t.struct({
    user: t.String,
    startdate: t.Date,
    enddate: DateIsAfter,
    latitude: t.Number,
    longitude: t.Number
  })

  return (
    <View style={style.container}>
      <Form
        ref={ref}
        type={Dive}
        options={options}
        value={dive}
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

export default DiveForm
