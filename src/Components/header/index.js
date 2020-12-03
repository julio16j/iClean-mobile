import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './style'
import { AntDesign } from '@expo/vector-icons'

export default function header({voltar}) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={voltar}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title} >IClean</Text>
    </View>
  );
}