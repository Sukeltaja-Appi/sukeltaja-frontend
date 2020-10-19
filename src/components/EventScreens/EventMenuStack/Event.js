import React from 'react'
import { View, ScrollView, SafeAreaView } from 'react-native'
import { Text, Divider, Icon, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import MapView, { Marker} from 'react-native-maps'
import { deleteEvent } from '../../../reducers/eventReducer'
import { formatDate } from '../../../utils/dates'
import colors from '../../../styles/colors'
import styles, { paddingSides } from '../../../styles/global'
import BackgroundImage from '../../common/BackgroundImage'

const style = {
  container: {
    paddingHorizontal: paddingSides,
    paddingVertical: 0
  },
  iconContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  title: {
    flex: 1,
    color: 'white'
  },
  lowerTitle: {
    fontSize: 25,
    color: 'white'
  },
  divider: {
    marginVertical: 20
  },
  text: {
    fontSize: 16,
    color: 'white'
  },
  buttonDelete: {
    backgroundColor: colors.red
  },
  map: {
    flex: 1,
    width:'100%',
    height: 250,
    borderRadius: 20
  }
}

const Event = (props) => {
  const { route, navigation, ongoingEvent, deleteEvent } = props

  const event = route.params.item
  const { startdate, enddate, title, description, creator, participants, target } = event

  const navigate = (route, params) => navigation.navigate(route, params)

  const deleteButton = async () => {
    await deleteEvent(event, ongoingEvent)
    navigation.navigate('Omat tapahtumat')
  }

  return (
      <SafeAreaView style={styles.noPadding}>
        <BackgroundImage>
        <ScrollView style={style.container}>
        
        <View style={styles.row}>
          <Text h3 style={style.title}>{title}</Text>
          <Icon
            name='edit'
            type='feather'
            onPress={() => navigate('Muokkaa tapahtumaa', { item: route.params.item })}
            color={colors.red}
            size={34}
            iconStyle={{ padding: 8 }}
            containerStyle={style.iconContainer}
          />
        </View>

        <Divider style={style.divider} />
        <Text style={style.lowerTitle}>Info</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Icon name='event' type='material' color='white' size={20} />
          <Text style={style.text}>{ new Date(startdate).getDate() }.
            { new Date(startdate).getMonth() } - { new Date(enddate).getDate() }.
            { new Date(enddate).getMonth() }.{ new Date(enddate).getFullYear() }
          </Text>
        </View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Icon name='schedule' type='material' color='white' size={20} />
          <Text style={style.text}>Lähtö { new Date(startdate).getHours() }:{ new Date(startdate).getMinutes() }</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Icon name='person' type='material' color='white' size={20} />
          <Text style={style.text}>{creator.username}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Icon name='group' type='material' color='white' size={20} />
          <Text style={style.text}>{participants.length + 1}</Text>
        </View>

        <Divider style={style.divider} />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Icon name='description' type='material' color='white' size={30} />
          <Text style={style.lowerTitle}>Kuvaus</Text>
        </View>
        <Text style={style.text}>{description}</Text>

        <Divider style={style.divider} />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Icon name='location-on' type='material' color='white' size={30} />
          <Text style={style.lowerTitle}>Sijainti</Text>
        </View>
        <Text style={style.text}>puuttuu</Text>

        <MapView
        style={style.map}
        initialRegion={{
        latitude: 60.1733244,
        longitude: 24.9410248,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
        }}>
        <Marker
          coordinate={{latitude: 60.1733244, longitude: 24.9410248}}
        />
        </MapView>

        

        <Divider style={style.divider} />
        <Button
          title='Poista'
          buttonStyle={style.buttonDelete}
          onPress={deleteButton}
          raised
        />

        <Divider />
      </ScrollView>
      </BackgroundImage>
      </SafeAreaView>
  )
}


const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent
})

export default connect(
  mapStateToProps,
  { deleteEvent }
)(Event)
