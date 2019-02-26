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

const ConversationsScreen = (props) => {
  // const { conversations } = props
  //
  // const navigate = (item) => (
  //   props.navigation.navigate('Conversation', { item })
  // )
  //
  // const conversationsSortedByDate = () => (
  //   conversations.sort((a, b) => b.startdate.localeCompare(a.startdate))
  // )
  //
  // const showConversations = () => {
  //   if (conversations.length === 0) {
  //     return (
  //       <View style={styles.centered}>
  //         <Text style={styles.h5}>Ei omia tapahtumia.</Text>
  //       </View>
  //     )
  //   }
  //
  //   return(
  //     <View style={styles.noPadding}>
  //       <FlatList
  //         data={conversationsSortedByDate()}
  //         renderItem={({ item }) => {
  //           const { description, startdate } = item
  //
  //           return (
  //             <ListItem
  //               title={description}
  //               subtitle={formatDate(startdate)}
  //               onPress={() => navigate(item)}
  //               subtitleStyle={style.subtitle}
  //               bottomDivider
  //               chevron
  //             />
  //           )}
  //         }
  //         keyExtractor={item => item.id}
  //       />
  //     </View>
  //   )
  // }
  //
  // return showConversations()

  return(
    <View></View>
  )
}

const mapStateToProps = (state) => ({})

export default connect(
  null,
  null
)(ConversationsScreen)
