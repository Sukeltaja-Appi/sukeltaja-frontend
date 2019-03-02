import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import styles from '../../styles/global'

const TargetScreen = (props) => {
  const { selectedTargets } = props

  let target = null
  let length = selectedTargets.length
  if(length > 0) target = selectedTargets[length-1]

  let targetName = 'No target selected'
  if(target !== null) targetName = target.name

  return(
    <View>
      <Text style={styles.h5}> {targetName} </Text>
    </View>
  )
}

const mapStateToProps = (state) => ({
  selectedTargets: state.selectedTargets
})

export default connect(
  mapStateToProps,
  null
)(TargetScreen)
