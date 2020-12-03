import { StyleSheet } from 'react-native'
import Constants from 'expo-constants';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#107289",
    paddingTop: Constants.statusBarHeight + 20,
    paddingHorizontal: 24,
  },
  body: {
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    height: 200,
    marginTop: 100
  },
})
