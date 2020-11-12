import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
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
}) => {
  const extraContainerStyle = buttonStyle ?? {}
  const extraTitleStyle = titleStyle ?? {}

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
