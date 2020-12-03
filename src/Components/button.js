import React from 'react'
import {TouchableOpacity, Text} from 'react-native'
export default function (props) {
  const buttonStandardStyle = {
    height: 50,
    marginTop: 20,
    backgroundColor:'#107',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
  }
  return (
    <TouchableOpacity onPress={props.click}
      style={{...buttonStandardStyle, ...props.style}} >
      <Text style={{fontSize: 20, color: 'white', ...props.labelStyle}} >{props.label}</Text>
    </TouchableOpacity>
  )
}