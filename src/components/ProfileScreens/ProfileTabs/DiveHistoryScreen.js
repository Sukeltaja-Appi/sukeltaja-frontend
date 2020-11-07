import React from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text, StyleSheet, RefreshControl } from 'react-native'
import { ListItem } from 'react-native-elements'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'

import { initializeDives } from '../../../reducers/diveReducer'
import { formatDate } from '../../../utils/dates'
import styles from '../../../styles/global'
import colors from '../../../styles/colors'

const style = StyleSheet.create({
  divider: {
    height: 10
  },
  title: {
    fontSize: 18,
    fontFamily: 'nunito-bold',
    marginLeft: 5,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'nunito-bold',
    marginLeft: 5,
  },
  diveContainer: {
    paddingVertical: 0,
    paddingLeft: 1,
    paddingRight: 5,
    marginBottom: 8,
  },
  iconContainer: {
    flex: 0.33,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#379EFE',
    alignItems: 'center',
    height: 135,
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
      return 'Oma kohde: nimetön'
    }

    if (event.target.type===undefined) {
      return 'Oma kohde: ' + event.target.name
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
                underlayColor="#fff"
                containerStyle={style.diveContainer}
                pad={5}
              >
                <ListItem.Content style={style.iconContainer} >
                  <FontAwesome5 name='water' size={36} color={'#fff'} />
                </ListItem.Content>
                <ListItem.Content style={style.diveContainer} >
                  <ListItem.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ListItem.Title style={style.title}>
                      {targetName}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Content style={{ flexDirection: 'row', marginTop: 5 }}>
                    <MaterialIcons name='schedule' size={20} color={colors.primary}/>
                    <ListItem.Subtitle style={style.subtitle}>
                      {formatDate(startdate)}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Content style={{ flexDirection: 'row', marginTop: 5 }}>
                    <MaterialIcons name='schedule' size={20} color={colors.secondary}/>
                    <ListItem.Subtitle style={style.subtitle}>
                      {'Kesto: ' + diveLength + ' min'}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Content style={{ flexDirection: 'row', marginTop: 5 }}>
                    <MaterialIcons name='room' size={20} color={colors.primary}/>
                    <ListItem.Subtitle style={style.subtitle}>
                      {
                        'L: ' + parseFloat(latitude).toFixed(n6) + '; P:' +
                        parseFloat(longitude).toFixed(n6)
                      }
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Content style={{ flexDirection: 'row', marginTop: 5 }}>
                    <MaterialIcons name='date-range' size={20} color={colors.primary}/>
                    <ListItem.Subtitle style={style.subtitle}>
                      {eventName}
                    </ListItem.Subtitle>
                  </ListItem.Content>
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
