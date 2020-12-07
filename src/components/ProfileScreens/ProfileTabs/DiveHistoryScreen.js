import React from 'react'
import { connect } from 'react-redux'
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native'
import { ListItem } from 'react-native-elements'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'

import { initializeEvents } from '../../../reducers/eventReducer'
import { formatDate } from '../../../utils/dates'
import styles from '../../../styles/global'
import colors from '../../../styles/colors'

const style = StyleSheet.create({
  divider: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    height: 10
  },
  title: {
    fontFamily: 'nunito-bold',
    color: '#379EFE',
    fontSize: 16,
    paddingRight: 20,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'nunito-bold',
    marginLeft: 5,
  },
  diveContainer: {
    paddingVertical: 0,
    paddingLeft: 1,
    justifyContent: 'flex-start',
    flexGrow: 100,
  },
  iconContainer: {
    flexBasis: 100,
    flexGrow: 0,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#379EFE',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  flexRowCenter: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  }
})

const n60 = 60
const n1000 = 1000

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
    const { events } = this.props

    var merged = [].concat.apply([], events.map(e => e.dives))

    var filtered = merged.filter(d => d.user._id === this.props.user._id)

    this.setState({ dives: filtered })
  }

  loadDives = async () => {
    this.setState({ isFetching: true })
    await this.props.initializeEvents()
    this.setState({ isFetching: false })
    this.updatedDives()
  }

  divesSortedByDate = () => {
    return this.state.dives.sort((a, b) => b.startdate.localeCompare(a.startdate))
  }

  targetOfEvent = (id) => {
    const { events } = this.props
    const event = events.find(e => e.dives.some(item => item._id === id))

    if (event===undefined) {
      return
    }

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
    const minutes = Math.round((diff/n1000)/n60)

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
            const { startdate, enddate, _id } = item
            const targetName = this.targetOfEvent(_id)
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
                    <MaterialIcons name='date-range' size={20} color={colors.primary}/>
                    <ListItem.Subtitle style={style.subtitle}>
                      {formatDate(startdate)}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Content style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                    <MaterialIcons name='schedule' size={20} color={colors.primary}/>
                    <ListItem.Subtitle style={style.subtitle}>
                      {'Kesto: ' + diveLength + ' min'}
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
  { initializeEvents }
)(DiveHistoryScreen)
