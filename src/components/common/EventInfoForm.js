import React from 'react'
import t from 'tcomb-form-native'
import { formatDate } from '../../utils/dates'
import { Button } from 'react-native-elements'
import { View } from 'react-native'
import { paddingSides } from '../../styles/global'
import { ScrollView } from 'react-native-gesture-handler'

const { Form } = t.form

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
  button: {
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
            height: 120,
            textAlignVertical: 'top'
          },
          error: {
            ...Form.stylesheet.textbox.error,
            height: 120
          }
        }
      }
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

const EventInfoForm = React.forwardRef((props, ref) => {
  let {
    event,
    onFormChange,
    onButtonPress,
  } = props

  const DateIsAfter = t.refinement(t.Date, (date) => date >= event.startdate)

  const Event = t.struct({
    title: t.String,
    description: t.String,
    startdate: t.Date,
    enddate: DateIsAfter,
  })

  return (
    <View style={style.noPadding}>
      <ScrollView>
        <View style={style.container}>
          <Form
            ref={ref}
            type={Event}
            options={options}
            value={event}
            onChange={onFormChange}
            style={style.container}
          />
          <View style={style.bottom}>
            <Button
              buttonStyle={style.button}
              onPress={onButtonPress}
              title='Seuraava'
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
)

export default EventInfoForm
