import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux'

import colors from '../../styles/colors'

const style = {
  main: {
    backgroundColor: colors.red,
    paddingTop: 15
  },
  text: {
    fontSize: 20
  }
}

class OfflineNotifier extends React.Component {

  render () {
    if(this.props.network.isConnected) return null
    else return (
      <View style={style.main}>
        <Text style={style.text}>Verkko ei ole saatavilla.</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  network: state.network
})

export default connect(
  mapStateToProps,
  null
)(OfflineNotifier)
