import React from 'react'
import {View, TextInput, Text} from 'react-native'
export default function (props) {
  const standardStyle = {
    borderRadius: 300,
    borderWidth: 2,
    paddingHorizontal: 20,
    width: 200
  }
  return (
    <View style={{...standardStyle, ...props.style}} >      
      <TextInput placeholder={props.placeholder} secureTextEntry={props.hidden}
        onChangeText={text => {props.updateField(text)}}
        value={props.value}
        />
    </View>
  )
}