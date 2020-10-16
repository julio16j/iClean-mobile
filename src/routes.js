import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from './Pages/Home'
const AppStack = createStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }} >
        <AppStack.Screen name="home" component={Home} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}
