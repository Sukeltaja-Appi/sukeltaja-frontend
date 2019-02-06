import React from 'react'
import { connect } from 'react-redux'
import { createEvent } from '../../reducers/eventReducer'
import t from 'tcomb-form-native'
import { ScrollView, View } from 'react-native'
import { Button } from 'react-native-elements'
import { paddingSides } from '../../styles/global'
import { now, inOneHour, formatDate } from '../../utils/dates'

const { Form } = t.form

const options = {
  fields: {
    content: {
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
    alignItems: 'center',
    marginTop: 20
  },
  scrollview: {
    width: '100%',
    backgroundColor: 'white',
    paddingLeft: paddingSides,
    paddingRight: paddingSides
  }
}

class CreateEventScreen extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      event: {
        content: '',
        startdate: now(),
        enddate: inOneHour()
      }
    }
  }

  createButton = async () => {
    const validated = this.ref.current.getValue()
    const { event } = this.state

    if (validated) {
      await this.props.createEvent(event)

      this.props.navigation.replace('EventListScreen')
    }
  }

  render() {
    const { event } = this.state

    const DateIsAfter = t.refinement(t.Date, (date) => date >= event.startdate)

    const Event = t.struct({
      content: t.String,
      startdate: t.Date,
      enddate: DateIsAfter
    })

    return (
      <View style={style.container}>
        <ScrollView style={style.scrollview}>

          <Form
            ref={this.ref}
            type={Event}
            options={options}
            value={event}
            onChange={(event) => this.setState({ event })}
          />

          <Button
            onPress={this.createButton}
            title="Luo tapahtuma"
          />

        </ScrollView>
      </View>
    )
  }
}

export default connect(
  null,
  { createEvent }
)(CreateEventScreen)
