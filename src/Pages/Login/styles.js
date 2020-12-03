import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: "#107289"
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoImg: {
    height: 180,
    width: 180
  },
  p: {
    fontSize: 20
  },
  login: {
    borderBottomColor: '#111111',
    borderBottomWidth: 1,
    width: '80%'
  },
  body: {
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 30
  },
  header: {
    height: 300
  }
})