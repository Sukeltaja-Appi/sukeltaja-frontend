import React from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text, StyleSheet, RefreshControl } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import { FontAwesome5 } from '@expo/vector-icons'

import { initializeDives } from '../../../reducers/diveReducer'
import { formatDate } from '../../../utils/dates'
import styles from '../../../styles/global'
import colors from '../../../styles/colors'

const style = StyleSheet.create({
  divider: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    height: 10
  },
  flexRowCenter: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  }
})

const n6 = 6

class DiveHistoryScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dives: [],
      isFetching: false
    }
    this.loadDives()
  }

  componentDidMount() {
    this.updatedDives()
  }

  updatedDives = () => {
    const { dives } = this.props

    //console.log(this.props.dives)
    this.setState({ dives: dives })
  }

  loadDives = async () => {
    this.setState({ isFetching: true })
    await this.props.initializeDives()
    this.setState({ isFetching: false })
    this.updatedDives()
  }

  divesSortedByDate = () => {
    return this.state.dives.sort((a, b) => b.startdate.localeCompare(a.startdate))
  }

  nameOfEvent = (eventId) => {
    const { events } = this.props
    const event = events.find(e => e._id === eventId)

    return event.title
  }

  targetOfEvent = (eventId) => {
    const { events } = this.props
    const event = events.find(e => e._id === eventId)

    if (event.target===undefined) {
      return 'Oma kohde'
    }
    const targetName = event.target.name + '/' + event.target.type

    return targetName
  }

  navigate = (value) => this.props.navigation.navigate(value)

  selectDive = (dive) => {
    this.props.navigation.navigate('Sukellus', { dive })
  }

  lengthOfDive = (startTime, endTime) => {
    const diff = new Date(endTime) - new Date(startTime)
    const minutes = Math.round((diff/1000)/60)

    return minutes
  }

  List = () => {

    return (
      <View style={styles.noPadding}>
        <FlatList
          data={this.divesSortedByDate()}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isFetching}
              onRefresh={this.loadDives}
              colors={['#118BFC']}
            />
          }
          renderItem={({ item }) => {
            const { startdate, enddate, latitude, longitude, event } = item
            const eventName = this.nameOfEvent(event)
            const targetName = this.targetOfEvent(event)
            const diveLength = this.lengthOfDive(startdate, enddate)

            return (
              <ListItem
                onPress={() => this.selectDive(item)}
                bottomDivider
                containerStyle={{ paddingVertical: 3, paddingHorizontal: 16 }}
              >
                <FontAwesome5 name='water' size={36} color={'#606060'} />
                <ListItem.Content>
                  <ListItem.Title style={{ color: colors.primaryText, fontSize: 18, flex: 1, flexWrap: 'wrap'}}>
                    {eventName}
                  </ListItem.Title>
                  <ListItem.Subtitle style={style.subtitle}>
                    {
                      'Aloitus: ' + formatDate(startdate) + '\n'
                      + 'Kesto: ' + diveLength + ' min' + '\n'
                      + 'Koordinaatit: L: '
                      + parseFloat(latitude).toFixed(n6) + '; P:'
                      + parseFloat(longitude).toFixed(n6) +'\n'
                      + 'Kohde: ' + targetName
                    }
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            )
          }
          }
          keyExtractor={item => item._id}
        />
      </View>
    )
  }
  render() {
    return this.List()
  }
}

const mapStateToProps = (state) => ({
  events: state.events,
  user: state.user,
  dives: state.user.dives
})

export default connect(
  mapStateToProps,
  { initializeDives }
)(DiveHistoryScreen)
