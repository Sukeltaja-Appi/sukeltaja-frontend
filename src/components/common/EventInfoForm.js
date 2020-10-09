import React, { Component } from 'react'
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

const DateIsAfter = t.refinement(t.Date, (date) => date >= event.startdate)

const Event = t.struct({
  title: t.String,
  description: t.String,
  startdate: t.Date,
  enddate: DateIsAfter,
})

class EventInfoForm extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()

    this.state = {
      showDatePicker: false,
      showTimePicker: false,
      event: {
        title: '',
        description: '',
        startdate: now(),
        enddate: inOneHour(),
      }
    }
  }

  onButtonPress = async () => {
    const { event } = this.state.event
    const eventToAdd = {
      title: this.state.event.title,
      description: this.state.event.description,
      startdate: this.state.event.startdate,
      enddate: this.state.event.enddate
    }
    console.log(eventToAdd)
    await this.props.createEvent(eventToAdd)

    this.props.navigation.navigate('CustomTargetScreen')
  }

  onDateChange = (event, date) => {
    const stdate = this.state.startdate
    console.log(date)
    this.setState({
      event: { ...event, startdate: date },
      showTimePicker: true
    })
  }

  onTimeChange = (event, time) => {
    console.log(time)
  }

  render() {
    return (
      <View style={style.noPadding}>
        <ScrollView>
          <View style={style.container}>
            {this.state.showDatePicker &&
              <RNDateTimePicker
                mode='date'
                value={this.state.event.startdate}
                onChange={this.onDateChange}
              />
            }
            {this.state.showTimePicker &&
              <RNDateTimePicker
                mode='time'
                value={new Date()}
                onChange={this.onTimeChange}
              />
            }
            <Form
              ref={this.ref}
              type={Event}
              options={options}
              value={this.state.event}
              onChange={(event) => this.setState({ event })}
              style={style.container}
            />
            <View style={style.bottom}>
              <Button buttonStyle={style.button}
                title='Aloitusaika'
                onPress={() => this.setState({
                  showDatePicker: true,
                  showTimePicker: false
                })}
              />
              <Button
                buttonStyle={style.button}
                onPress={this.onButtonPress}
                title='Seuraava'
              />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
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

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  ongoingDives: state.ongoingDives,
  user: state.user
})

export default connect(
  mapStateToProps,
  { createEvent }
)(EventInfoForm)
