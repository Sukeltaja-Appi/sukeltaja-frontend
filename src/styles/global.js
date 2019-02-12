import { StyleSheet } from 'react-native'
import colors from './colors'

export const paddingSides = 21

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  centered: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: paddingSides
  },
  noPadding: {
    flex: 1,
    backgroundColor: colors.background
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50
  },
  row: {
    flexDirection: 'row'
  },
  h5: {
    marginTop: 50,
    fontSize: 18,
    textAlign: 'center'
  },
  roundButton: {
    width: 100,
    height: 100,
    borderRadius: 50
  }
})
