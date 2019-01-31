import React from 'react'
import styles from '../stylesGlobal'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Image, Button } from 'react-native'

const stylesLocal = StyleSheet.create({
  imageBorder: {
    width: 150,
    height: 150,
    borderColor: '#551a8b',
    borderWidth: 3,
    borderRadius: 30,
    marginBottom: 15
  },
  container: {
    flex: 1,
    alignItems: 'center',
    top: 50
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 100,
  }
})

class ProfileMainScreen extends React.Component {

  static navigationOptions = {
    header: null ,
  };

  navigate = (value) => this.props.navigation.navigate(value);

  render() {
    const uri = 'https://upload.wikimedia.org/wikipedia/commons/5/50/USS_Scorpion_sail.jpg'
    const _handlePress = () => {}

    return (
      <View style={stylesLocal.container}>
        <Image style={stylesLocal.imageBorder} source={{ uri }} />
        <Text style={styles.h1}>{this.props.username}</Text>
        <View style={stylesLocal.buttonContainer}>
          <Button color='red' title="Kirjaudu ulos" onPress={_handlePress} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username
  }
}

export default connect(
  mapStateToProps,
  null
)(ProfileMainScreen)
