import React from 'react'
import { View } from 'react-native'
import { Text, Divider } from 'react-native-elements'
import { connect } from 'react-redux'

import styles, { paddingSides } from '../../../styles/global'
import { formatDate } from '../../../utils/dates'
import colors from '../../../styles/colors'

const style = {
  container: {
    paddingHorizontal: paddingSides,
    paddingVertical: 20,
    backgroundColor: 'white'
  },
  iconContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  title: {
    flex: 5
  },
  divider: {
    marginVertical: 20
  },
  text: {
    fontSize: 16
  }
}

const n6 = 6

const lengthOfDive = (startTime, endTime) => {
  const diff = new Date(endTime) - new Date(startTime)
  const minutes = Math.round((diff/1000)/60)

  return minutes
}

const Dive = (props) => {
  const dive = props.route.params.dive
  const { startdate, enddate, event, latitude, longitude } = dive

  const targetOfEvent = (eventId) => {
    const { events } = props
    const event = events.find(e => e._id === eventId)

    if (event.target===undefined) {
      return 'Oma kohde: '
    }
    const targetName = event.target.name + '/' + event.target.type

    return targetName
  }

  return (
    <View style={style.noPadding}>
      <View style={style.container}>
        <View style={styles.row}>
          <Text h4 style={style.title}>
            {targetOfEvent(event)} {formatDate(startdate)}
          </Text>
        </View>
        <Divider style={style.divider} />
        <Text style={style.text}>Sukelluksen kesto: {lengthOfDive(startdate, enddate)} min</Text>
        <Text style={style.text}>Leveyspiiri: {parseFloat(latitude).toFixed(n6)}</Text>
        <Text style={style.text}>Pituuspiiri: {parseFloat(longitude).toFixed(n6)}</Text>
        <Text style={style.text}>{latitude}</Text>
      </View>
    </View>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  events: state.events
})

export default connect(
  mapStateToProps,
  { }
)(Dive)