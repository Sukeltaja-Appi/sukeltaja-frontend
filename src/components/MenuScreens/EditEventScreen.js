import React from 'react'
import { StyleSheet, ScrollView, Text, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import t from 'tcomb-form-native';

import { updateEvent } from '../../reducers/EventReducer'
import styles from '../stylesGlobal'

const stylesLocal = StyleSheet.create({
  roundButton: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    width: 175,
    height: 70,
    borderRadius: 150
  }
});

const Form = t.form.Form;

const Event = t.struct({
  content:t.String,
  startdate:t.Date,
  enddate:t.Date,
});

const options = {
  fields: {
    content: {
      label: 'Kuvaus'
    },
    startdate: {
      label: 'Aloitus aika',
      mode: 'datetime'
    },
    enddate: {
      label: 'Lopetus aika',
      mode: 'datetime'
    }
  }
};

class EditEventScreen extends React.Component {
  constructor(props) {
    super(props)
    this.event = this.props.navigation.state.params.event
    this.createValue = {
        content: this.event.content,
        startdate: new Date(this.event.startdate),
        enddate: new Date(this.event.enddate)
      }
    }

  static navigationOptions = {
    header: null ,
  };

  navigate = (value) => this.props.navigation.navigate(value)

  acceptButton = () => {
    this.event.content = this.createValue.content
    this.event.startdate = this.createValue.startdate
    this.event.enddate = this.createValue.enddate
    this.props.updateEvent(this.event)
    this.navigate('MenuScreen')
  }

  render() {
      return (
        <ScrollView>

          <Text>
          Käyttäjä: {this.event.user.username}
          </Text>

          <Form
          ref="form"
          type={Event}
          options={options}
          value={this.createValue}
          onChange={(value) =>  this.createValue = value} />

          <TouchableOpacity onPress={this.acceptButton} style={stylesLocal.roundButton} >
            <Text style={styles.buttonText}>Hyväksy muutos!</Text>
          </TouchableOpacity>

        </ScrollView>
        )
    }
}

const ConnectedEditEventScreen = connect(
  null,
  { updateEvent }
)(EditEventScreen)

export default ConnectedEditEventScreen
