import React from 'react'
import { View, FlatList } from 'react-native'
import { Text, Button, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'

import { formatDate } from '../../../../utils/dates'

import colors from '../../../../styles/colors'
import styles from '../../../../styles/global'
import { paddingSides } from '../../../../styles/global'

const style = {
  headline: {
    alignItems: 'center',
    marginBottom: 10
  },
  subtitle: {
    fontStyle: 'italic',
    fontSize: 14
  },
  divider: {
    height: 10
  },
  top: {
    flex: 5,
    justifyContent: 'flex-start',
    marginTop: 10
  },
  bottom: {
    flex: 2,
    justifyContent: 'flex-end',
    width: '100%',
    padding: paddingSides,
    marginBottom: 12
  },
  buttonCreate: {
    backgroundColor: colors.green
  },
}

const n6 = 6

class DiveListScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  navigate = (value) => this.props.navigation.navigate(value)
  navigateToDive = (item) => this.props.navigation.navigate('Dive', { item })

  divesSortedByDate = () => this.props.ongoingEvent.dives.sort((a, b) => b.startdate.localeCompare(a.startdate))

  displayEndDate = (dive) => {
    const { ongoingDives } = this.props

    if (ongoingDives.map(d => d._id).includes(dive._id)) 'Meneillään oleva!'

    return 'Loppui: ' + formatDate(dive.enddate)
  }

  render() {
    const { ongoingEvent } = this.props

    return (
      <View style={styles.noPadding}>
        <View style={style.top}>
          <View style={style.headline}>
            <Text style={{ fontSize: 24 }}>Sukellukset</Text>
          </View>
          <FlatList
            data={this.divesSortedByDate()}
            extraData={ongoingEvent.dives}
            renderItem={({ item }) => {
              const { user, startdate, latitude, longitude } = item

              return (
                <ListItem
                  title={'Sukeltaja: ' + user.username}
                  subtitle={
                    'Alkoi: ' + formatDate(startdate) + '\n'
                    + this.displayEndDate(item)
                    + '\nKoordinaatit: L:'
                    + parseFloat(latitude).toFixed(n6) + '; P:'
                    + parseFloat(longitude).toFixed(n6)}
                  onPress={() => this.navigateToDive(item)}
                  subtitleStyle={style.subtitle}
                  bottomDivider
                  chevron
                />
              )}
            }
            keyExtractor={item => item._id}
          />
        </View>
        <View style={style.bottom}>
          <View style={style.divider}/>
          <Button
            title='Luo uusi sukellus ->'
            buttonStyle={style.buttonCreate}
            onPress={() => this.navigate('CreateDiveScreen')}
            raised
          />
          <View style={style.divider}/>
          <Button
            title='Aloita sukelluksia ->'
            onPress={() => this.navigate('DiveScreen')}
            raised
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  ongoingDives: state.ongoingDives,
  user: state.user
})

export default connect(
  mapStateToProps,
  null
)(DiveListScreen)
