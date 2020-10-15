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
  const { navigation, ongoingDives, ongoingEvent, deleteDive, user } = props

  const dive = props.route.params.item
  const { startdate, enddate, latitude, longitude } = dive

  const navigate = (route, params) => navigation.navigate(route, params)

  const back = () => navigation.navigate('DiveListScreen')

  const showEndDate = () => {
    if(enddate) return 'Lopetusaika: ' + formatDate(enddate)

    return 'Meneillään oleva!'
  }

  let { creator, admins } = ongoingEvent

  admins = [ creator, ...admins ]

  const deletionAllowed = () => {
    if(ongoingDives.map(d => d._id).includes(dive._id)) return false
    if(user._id !== dive.user._id && !admins.map(a => a._id).includes(user._id)) return false

    return true
  }

  const deleteButton = async () => {
    if(deletionAllowed()) {
      await deleteDive(dive, user._id)

      back()
    }
  }

  return (
    <View style={styles.noPadding}>
      <View style={style.container}>

        <View style={styles.row}>
          <Text h3 style={style.title}>Sukeltaja: {dive.user.username}</Text>
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
          disabled={!deletionAllowed()}
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
