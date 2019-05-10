import React from 'react'
import { connect } from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation'
import { View, ScrollView } from 'react-native'
import EventForm from '../../common/EventForm'

import { updateEvent } from '../../../reducers/eventReducer'
import styles from '../../../styles/global'
import colors from '../../../styles/colors'

class EditEventScreen extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()

    const {
      _id,
      title,
      description,
      startdate,
      enddate,
      ...rest
    } = props.navigation.getParam('item')

    this.state = {
      event: {
        _id,
        title,
        description,
        startdate: new Date(startdate),
        enddate: new Date(enddate)
      },
      ...rest
    }
  }

  updateButton = async () => {
    const validated = this.ref.current.getValue()
    const { event, ...rest } = this.state

    if (validated) {
      const updatedEvent = await this.props.updateEvent({ ...event, ...rest })

      const navigateAction = (routeName, params) => NavigationActions.navigate({
        routeName, params
      })

      const { ongoingEvent } = this.props

      if (ongoingEvent && ongoingEvent._id === this.state.event._id) {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            navigateAction('EventMenuScreen')
          ]
        })

        this.props.navigation.dispatch(resetAction)

        this.props.navigation.navigate('OngoingEvent')

      } else {
        const resetAction = StackActions.reset({
          index: 2,
          actions: [
            navigateAction('EventMenuScreen'),
            navigateAction('EventListScreen'),
            navigateAction('Event', { item: updatedEvent })
          ]
        })

        this.props.navigation.dispatch(resetAction)
      }
    }
  }

  render() {
    const { event } = this.state

    return (
      <View style={styles.noPadding}>
        <ScrollView>
          <EventForm
            ref={this.ref}
            event={event}
            onFormChange={(event) => this.setState({ event })}
            onButtonPress={this.updateButton}
            buttonStyle={{ backgroundColor: colors.success }}
            buttonTitle='Tallenna muutokset'
          />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent
})

export default connect(
  mapStateToProps,
  { updateEvent }
)(EditEventScreen)
