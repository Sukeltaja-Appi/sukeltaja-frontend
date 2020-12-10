import React from 'react'
import { TouchableOpacity, ActivityIndicator, Text } from 'react-native'
import colors from '../../styles/colors'

const style = {
  commonButtonContainer: {
    borderRadius: 12,
    backgroundColor: colors.primary,
    padding: 10,
    elevation: 5
  },
  commonButtonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'nunito-bold',
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  disabledContainerStyle: {
    backgroundColor: colors.buttonDisabled_light
  },
  disabledTextStyle: {
    color: colors.buttonDisabled_dark
  }
}

const CommonButton = ({
  onPress,
  title,
  buttonStyle,
  titleStyle,
  disabled,
  loading,
}) => {
  const extraContainerStyle = buttonStyle ?? {}
  const extraTitleStyle = titleStyle ?? {}

  if (loading) {
    return (
      <TouchableOpacity style={{ ...style.commonButtonContainer, ...extraContainerStyle }}>
        <ActivityIndicator size="small" color="white" style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }} />
        <Text
          style={{
            ...style.commonButtonText,
            ...extraTitleStyle,
            color: 'rgba(0,0,0,0)',
          }}
        >
          {title}
        </Text>
      </TouchableOpacity >
    )
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        disabled
          ? { ...style.commonButtonContainer, ...style.disabledContainerStyle }
          : { ...style.commonButtonContainer, ...extraContainerStyle }
      }
      disabled={disabled}
    >
      <Text
        style={
          disabled
            ? { ...style.commonButtonText, ...style.disabledTextStyle }
            : { ...style.commonButtonText, ...extraTitleStyle }
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CommonButton
