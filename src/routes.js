import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import FlashMessage from "react-native-flash-message"
import Home from './Pages/Home'
import Cadastrar from './Pages/Cadastrar'
import Login from './Pages/Login'
import Limpeza from './Pages/Limpeza'
import NovaLimpeza from './Pages/NovaLimpeza'
import { Linking } from 'react-native';
import * as Linkin from 'expo-linking';
import * as Notifications from 'expo-notifications';
const AppStack = createStackNavigator()
export default function Routes() {
  const prefix = Linkin.makeUrl('/');
  const config = {
    home: {
      path: 'home/:title/:description',
      params: {
        title: null,
        description: null
      }
    }
  }
  const linking = {
    prefixes: [prefix],
    config: config
  }
  return (
    <NavigationContainer
    linking={linking}
    >
      <AppStack.Navigator screenOptions={{ headerShown: false }} >
        <AppStack.Screen name="login" component={Login} />
        <AppStack.Screen name="cadastrar" component={Cadastrar} />
        <AppStack.Screen name="home" component={Home} />
        <AppStack.Screen name="limpeza" component={Limpeza} />
        <AppStack.Screen name="novaLimpeza" component={NovaLimpeza} />
      </AppStack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}
