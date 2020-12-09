import React from 'react'
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import MapView, { Marker } from 'react-native-maps'
import { MaterialIcons } from '@expo/vector-icons'

import {
  setOngoingEvent,
  getOngoingEvent,
} from '../../../reducers/eventReducer'
import { endDives } from '../../../reducers/diveReducer'
import colors from '../../../styles/colors'
import styles from '../../../styles/global'
import { paddingSides } from '../../../styles/global'
import BackgroundImage from '../../common/BackgroundImage'
import AppText from '../../common/AppText'

const style = {
  buttonEnd: {
    backgroundColor: colors.red,
  },
  buttonInvite: {
    backgroundColor: colors.green,
  },
  top: {
    justifyContent: 'flex-start',
    width: '100%',
    padding: paddingSides,
    marginTop: 10,
  },
  middle: {
    justifyContent: 'center',
    width: '100%',
    padding: paddingSides,
    marginTop: 10,
  },
  bottom: {
    justifyContent: 'flex-end',
    width: '100%',
    padding: paddingSides,
    marginBottom: 10,
  },
  divider: {
    height: 15,
  },
  descriptionStyle: {
    fontSize: 17,
  },
  lowerTitle: {
    fontSize: 25,
    marginBottom: 10,
    paddingLeft: 5,
  },
  text: {
    fontSize: 16,
    marginLeft: 5,
  },
  settingsButton: {
    elevation: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
  },
  map: {
    flex: 1,
    width: '100%',
    height: 250,
  },
  mapContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#118BFC'
  }
}

class EventScreen extends React.Component {
  loadEvent = async () => {
    const { ongoingEvent, getOngoingEvent } = this.props

    await getOngoingEvent(ongoingEvent)
  };

  componentDidMount() {
    this.loadEvent()
  }

  navigate = (value, item) => this.props.navigation.navigate(value, { item });

  toInvites = () => {
    this.navigate('InviteScreen')
  }

  toEditing = () => {
    this.props.navigation.navigate('Muokkaa tapahtumaa', {
      item: this.props.ongoingEvent
    })
  }

  leaveEventButton = () => {
    const { setOngoingEvent, endDives, ongoingDives, user } = this.props

    endDives(ongoingDives, user._id)
    setOngoingEvent(null)
    this.navigate('StartEventScreen')
  };

  userIsCreator = (user) => user._id === this.props.ongoingEvent.creator._id;
  userIsAdmin = (user) =>
    this.props.ongoingEvent.admins.map((a) => a._id).includes(user._id);

  userIsNotAdmin = () => {
    const { user } = this.props
    const { userIsCreator, userIsAdmin } = this

    if (!userIsCreator(user) && !userIsAdmin(user)) return true

    return false
  };

  render() {
    const { ongoingEvent } = this.props
    const {
      //admins,
      participants,
      creator,
      title,
      description,
      startdate,
      enddate,
      target,
    } = ongoingEvent

    const startingDate = new Date(startdate)
    const startTime = `${startingDate.getHours()}:${startingDate.getMinutes().toString().padStart(2, '0')}`

    return (
      <View style={styles.noPadding}>
        <BackgroundImage height={Dimensions.get('screen').height}>
          <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={style.top}>
              <View style={{ marginBottom: 15, flexDirection: 'row' }}>
                <AppText
                  style={{
                    fontSize: 36,
                  }}
                >
                  {title}
                </AppText>
                <TouchableOpacity
                  onPress={this.toEditing}
                  style={style.settingsButton}
                >
                  <Icon name="settings" size={60} color="white" />
                </TouchableOpacity>
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
              >
                <MaterialIcons
                  name="info-outline"
                  size={30}
                  color="white"
                />
                <AppText style={style.lowerTitle}>Info</AppText>
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
              >
                <Icon name="event" type="material" color="white" size={20} />
                <AppText style={style.text}>
                  {new Date(startdate).getDate()}.
                  {new Date(startdate).getMonth()+1} -{' '}
                  {new Date(enddate).getDate()}.
                  {new Date(enddate).getMonth()+1}.
                  {new Date(enddate).getFullYear()}
                </AppText>
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
              >
                <Icon name="schedule" type="material" color="white" size={20} />
                <AppText style={style.text}>
                  Lähtö {startTime}
                </AppText>
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
              >
                <Icon name="person" type="material" color="white" size={20} />
                <AppText style={style.text}>{creator.username}</AppText>
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
              >
                <Icon name="group" type="material" color="white" size={20} />
                <AppText style={style.text}>
                  {participants.length + 1} {participants.length === 0 ? 'osallistuja' : 'osallistujaa'}
                </AppText>
              </View>
              <View style={style.divider} />
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
              >
                <Icon
                  name="description"
                  type="material"
                  color="white"
                  size={30}
                />
                <AppText style={style.lowerTitle}>Kuvaus</AppText>
              </View>
              <AppText style={style.text}>{description}</AppText>
              <View style={style.divider} />
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
              >
                <Icon
                  name="location-on"
                  type="material"
                  color="white"
                  size={30}
                />
                <AppText style={style.lowerTitle}>Sijainti</AppText>
              </View>
              <AppText style={style.text}>{target ? target.name : 'ei kohdetta'}</AppText>

              {target ?
                <View style={style.mapContainer}>
                  <MapView
                    style={style.map}
                    initialRegion={{
                      latitude: target.latitude,
                      longitude: target.longitude,
                      latitudeDelta: 0.05,
                      longitudeDelta: 0.05
                    }}>
                    <Marker
                      coordinate={{ latitude: target.latitude, longitude: target.longitude }}
                      title={target.name}
                    />
                  </MapView>
                </View>
                : null}
            </View>

          </ScrollView>
        </BackgroundImage>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  ongoingDives: state.ongoingDives,
  user: state.user,
})

export default connect(mapStateToProps, {
  endDives,
  setOngoingEvent,
  getOngoingEvent,
})(EventScreen)
