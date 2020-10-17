import React from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text, StyleSheet, TouchableHighlight, RefreshControl } from 'react-native'
import { ListItem } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'

import { getMessages } from '../../../reducers/messageReducer'
import styles from '../../../styles/global'
import colors from '../../../styles/colors'
import AppText from '../../common/AppText'
import { joinOngoingEvent } from '../../../reducers/eventReducer'
import { checkMessage } from '../../../reducers/messageReducer'

const style = StyleSheet.create({
  acceptButton: {
    padding: 10,
    borderRadius: 100,
    marginBottom: 5,
    borderColor: '#e8e8e8'
  },
  rejectButton: {
    padding: 10,
    borderRadius: 100,
    borderColor: '#e8e8e8',
    marginRight: 15
  },
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

class InvitesScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      invites: [],
      isFetching: false,
    }

    this.loadMessages()
  }

  componentDidMount() {
    this.updateInvites()
  }

  // FIXME
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { messages } = nextProps

    this.setState({ invites: messages.filter(msg => msg.type.startsWith('invitation_')) })
  }

  updateInvites = () => {
    const { messages } = this.props

    this.setState({ invites: messages.filter(msg => msg.type.startsWith('invitation_')) })
  }

  loadMessages = async () => {
    this.setState({ isFetching: true })
    await this.props.getMessages()
    this.setState({ isFetching: false })
    this.updateInvites()
  }

  selectMessage = (message) => {
    if (message.type === 'invitation_admin' || message.type === 'invitation_participant') {
      this.props.navigation.navigate('Kutsu', {
        invProps: {
          message: message,
          updateInvites: () => this.updateInvites()
        }
      })
    }
  }

  InvitesSortedByDate = () => {
    return this.state.invites.sort((a, b) => b.created.localeCompare(a.created))
  }

  async acceptInvite(invite) {
    await this.props.joinOngoingEvent(invite.data)
    await this.props.checkMessage(invite, 'accepted')
    this.updateInvites()
  }

  async rejectInvite(invite) {
    console.log('REJECT ', invite)
    await this.props.checkMessage(invite, 'rejected')
    this.updateInvites()
  }

  showMessages = () => {
    const formatDDMM = d => `${d.getDate()}.${d.getMonth() + 1}`

    return (
      <View style={styles.noPadding}>
        <FlatList
          data={this.InvitesSortedByDate()}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isFetching}
              onRefresh={this.loadMessages}
              colors={['#118BFC']}
            />
          }

          ListEmptyComponent={() => (
            <View style={styles.centered}>
              <AppText style={styles.h5}>Ei kutsuja</AppText>
            </View>
          )
          }

          renderItem={({ item }) => {
            const { sender, created, data } = item
            let { title, startdate, enddate } = data

            startdate = new Date(startdate)
            enddate = new Date(enddate)

            return (
              <ListItem
                onPress={() => this.selectMessage(item)}
                bottomDivider
                containerStyle={{ paddingVertical: 0, paddingHorizontal: 16 }}
              >
                <ListItem.Content style={{ ...style.flexRowCenter }}>
                  <View style={{ paddingVertical: 16, flexShrink: 1 }}>
                    <AppText style={{ color: colors.primaryText, fontSize: 18, flex: 1, flexWrap: 'wrap' }} >
                      {title}
                    </AppText>
                    <View style={{ ...style.flexRowCenter }}>
                      <MaterialIcons name='person' size={18} color={'#606060'} />
                      <Text style={{ paddingLeft: 5 }}>{sender.username}</Text>
                    </View>
                    <View style={{ ...style.flexRowCenter }}>
                      <MaterialIcons name='date-range' size={18} color={'#606060'} />
                      <Text style={{ paddingLeft: 5 }}>
                        {`${formatDDMM(startdate)}. - ${formatDDMM(enddate)}.${enddate.getFullYear()}`}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexGrow: 1 }} />
                  <TouchableHighlight style={style.rejectButton}
                    onPress={() => this.rejectInvite(item)}
                    underlayColor='#d4d4d4'
                  >
                    <MaterialIcons name='clear' size={40} color={'#999'} />
                  </TouchableHighlight>
                  <TouchableHighlight style={style.acceptButton}
                    onPress={() => this.acceptInvite(item)}
                    underlayColor='#d4d4d4'
                  >
                    <MaterialIcons name='check' size={40} color={'#68FF77'} />
                  </TouchableHighlight>
                </ListItem.Content>
              </ListItem>
            )
          }}
          keyExtractor={item => item._id}
        />
      </View>
    )
  }

  render() {
    return this.showMessages()
  }
}

const mapStateToProps = (state) => ({
  ongoingEvent: state.ongoingEvent,
  messages: state.messages,
  user: state.user
})

export default connect(
  mapStateToProps,
  { getMessages, joinOngoingEvent, checkMessage }
)(InvitesScreen)
