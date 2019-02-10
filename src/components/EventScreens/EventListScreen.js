import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import styles from '../../styles/global'
import { formatDate } from '../../utils/dates'
import { connect } from 'react-redux'

const style = {
  subtitle: {
    fontStyle: 'italic',
    fontSize: 14
  }
}

const EventListScreen = (props) => {
  const { events } = props

  const navigate = (item) => (
    props.navigation.navigate('Event', { item })
  )

  const eventsSortedByDate = () => (
    events.sort((a, b) => b.startdate.localeCompare(a.startdate))
  )

  const showEvents = () => {
    if (events.length === 0) {
      return (
        <View style={styles.centered}>
          <Text style={styles.h5}>Ei omia tapahtumia.</Text>
        </View>
      )
    }

    return(
      <View style={styles.noPadding}>
        <FlatList
          data={eventsSortedByDate()}
          renderItem={({ item }) => {
            const { description, startdate } = item

            return (
              <ListItem
                title={description}
                subtitle={formatDate(startdate)}
                onPress={() => navigate(item)}
                subtitleStyle={style.subtitle}
                bottomDivider
                chevron
              />
            )}
          }
          keyExtractor={item => item.id.toString()}
        />
      </View>
    )
  }

  return showEvents()
}

const mapStateToProps = (state) => ({ events: state.events })

export default connect(
  mapStateToProps,
  null
)(EventListScreen)
