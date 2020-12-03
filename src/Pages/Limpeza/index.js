import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, ScrollView} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Input from '../../Components/input'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import Button from '../../Components/button'
import Spinner from 'react-native-loading-spinner-overlay'                    
import limpezaService from '../../Services/limpezaService'
import { sucessMessage, erroMessage} from '../../Services/alerts'
import Header from '../../Components/header'
import moment from 'moment'
import { SimpleLineIcons } from '@expo/vector-icons'
import styles from './styles'

export default function Limpeza() {
  const navigation = useNavigation()
  const route = useRoute()
  const [limpeza, setLimpeza] = useState({dataLimpeza: []})
  const [loading, setLoading] = useState(false)
  useEffect (() => {
    if (route.params) {
      setLimpeza(route.params.limpeza.limpeza)
    }
  }, [route.params])
  async function executar () {
    setLoading(true)
    try {
      const response = await limpezaService.executarLimpeza(limpeza.limpezaId)
      NavigateHome()
    } catch (err) {
      erroMessage('Erro ao registrar Limpeza')
    }
    setLoading(false)
  }
  function NavigateHome () {
    navigation.navigate('home', { atualizar: true })
  }
  return (
    <ScrollView  style={styles.container} >
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
      <Header voltar={() => {navigation.goBack()}} />
      <View style={[styles.center, styles.body]}>
        <View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={styles.botaoData}>
              <Text style={{color: 'white'}}>{limpeza.dataLimpeza[2] + '/' + limpeza.dataLimpeza[1] + '/' + limpeza.dataLimpeza[0] + ''}</Text>
              <SimpleLineIcons name="arrow-down" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Picker
            prompt={'Frequencia'}
            mode={'dropdown'}
            selectedValue={limpeza.frequencia}
            enabled={false}
            style={{width: 300}}>
            <Picker.Item label="Diaria" value="diaria" />
            <Picker.Item label="Semanal" value="semanal" />
            <Picker.Item label="Mensal" value="mensal" />
            <Picker.Item label="Sem Frequência" value="semFrequencia" />
          </Picker>
        </View>
      </View>
      <Button label={'Confirmar'} click={executar} style={{width: 200, marginLeft: 75}} />
    </ScrollView>
  )
}

  
  