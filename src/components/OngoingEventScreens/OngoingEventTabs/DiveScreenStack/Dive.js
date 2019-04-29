import React from 'react'
import { View } from 'react-native'
import { Text, Divider, Icon, Button } from 'react-native-elements'
import { connect } from 'react-redux'

import { deleteDive } from '../../../../reducers/diveReducer'
import { formatDate } from '../../../../utils/dates'
import colors from '../../../../styles/colors'
import styles, { paddingSides } from '../../../../styles/global'

const style = {
  container: {
    paddingHorizontal: paddingSides,
    paddingVertical: 10,
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
  },
  buttonDelete: {
    backgroundColor: colors.red
  }
}

const Dive = (props) => {
  const { navigation, ongoingDives, ongoingEvent, deleteDive } = props

  const dive = navigation.getParam('item')
  const { user, startdate, enddate, latitude, longitude } = dive
  const currentUser = props.user

  const navigate = (route, params) => navigation.navigate(route, params)

  const back = () => navigation.navigate('DiveListScreen')

  const showEndDate = () => {
    if(enddate) return 'Lopetusaika: ' + formatDate(enddate)

    return 'Meneillään oleva!'
  }

  let { creator, admins, participants } = ongoingEvent

  admins = [ creator, ...admins ]

  const deletionNotAllowed = () => {
    if(ongoingDives.map(d => d._id).includes(dive._id)) return true
    if(currentUser._id !== user._id && !admins.map(a => a._id).includes(currentUser._id)) return true

    return false
  }

  const deleteButton = async () => {

    const allParticipants = [ creator, ...admins, ...participants ]
    let allowed = false

    if(!ongoingDives.map(d => d._id).includes(dive._id)) {
      if (currentUser._id === dive.user._id) allowed = true
      else if (admins.map(a => a._id).includes(currentUser._id)) {

        for (let i=0; i < allParticipants.length; i++) {

          if(allParticipants[i]._id === dive.user._id) {
            allowed = true
            break
          }
        }
      }
    }

    if(allowed) {
      await deleteDive(dive, user._id)

      back()
    }
  }

  return (
    <View style={styles.noPadding}>
      <View style={style.container}>

        <View style={styles.row}>
          <Text h3 style={style.title}>Sukeltaja: {user.username}</Text>
          <Icon
            name='edit'
            type='feather'
            onPress={() => navigate('EditDiveScreen', { item: dive })}
            color={colors.red}
            size={34}
            iconStyle={{ padding: 8 }}
            containerStyle={style.iconContainer}
          />
        </View>

        <Divider style={style.divider} />

        <Text style={style.text}>Aloitusaika:   { formatDate(startdate) }</Text>
        <Text style={style.text}>{showEndDate()}</Text>
        <Text style={style.text}>Leveysaste:   {latitude}</Text>
        <Text style={style.text}>Pituusaste:    {longitude}</Text>

        <Divider style={style.divider} />

        <Button
          title='Poista'
          buttonStyle={style.buttonDelete}
          onPress={deleteButton}
          disabled={deletionNotAllowed()}
          raised
        />

        <Divider style={style.divider} />

        <Button
          title='<- Takaisin'
          onPress={back}
          raised
        />
      </View>
      <Divider />
    </View>
  )
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  ongoingDives: state.ongoingDives,
  user: state.user
})

export default connect(
  mapStateToProps,
  { deleteDive }
)(Dive)
