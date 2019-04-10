import React from 'react'
import { View } from 'react-native'
import { Text, Icon } from 'react-native-elements'
import { connect } from 'react-redux'

import colors from '../../styles/colors'

const style = {
  main: {
    backgroundColor: colors.red,
    paddingTop: 15
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
}

class OfflineNotifier extends React.Component {

  render() {
    if (this.props.network.isConnected) return null
    else return (
      <View>
        <View style={style.main}>
          <Text style={style.text}>Verkkoyhteysongelma.</Text>
          <Icon name="alert-triangle" type='feather' color='white' />
          <Text style={style.text}> Palvelut eivät toimi normaalisti.</Text>
        </View>
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
