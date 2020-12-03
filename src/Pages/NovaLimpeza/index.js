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

export default function NovaLimpeza() {
  const navigation = useNavigation()
  const route = useRoute()
  const [limpeza, setLimpeza] = useState({dataProximaLimpeza: moment().format('DD/MM/yyyy'), frequencia: 'diaria'})
  const [usuario, setUsuario] = useState({})
  const [dataEscolhida, setDataEscolhida] = useState(moment().format('DD/MM/yyyy'))
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  useEffect (() => {
    if (route.params) {
      setUsuario(route.params.usuario ? route.params.usuario : {} )
    }
  }, [route.params])
  async function salvar () {
    setLoading(true)
    try {
      if (!validarLimpeza(limpeza)) return
      const novaLimpezaDTO = {
        dataProximaLimpeza: limpeza.dataProximaLimpeza,
        frequencia: limpeza.frequencia,
        usuarioId: usuario.id
      }
      const response = await limpezaService.salvar(novaLimpezaDTO)
      limparCampos()
      NavigateHome(response.data)
    } catch (err) {
      erroMessage('Erro ao registrar Limpeza')
    }
    setLoading(false)
  }
  function limparCampos () {
    setLimpeza({})
  }
  function NavigateHome (limpeza) {
    navigation.navigate('home', { limpeza })
  }
  function validarLimpeza (limpeza) {
    if (!limpeza.dataProximaLimpeza) {
      erroMessage("Data não pode ser nula")
      return false
    }
    if (!limpeza.frequencia) {
      erroMessage("Frequencia não pode ser nula")
      return false
    } return true
  }
  function onChangeData (evento, dataNova) {
    setShow(false)
    if (evento.type === 'set') {
      changeData(dataNova)
    }
  }
  function changeData (dataNova) {
    setLimpeza({...limpeza, dataProximaLimpeza: moment(dataNova).format('YYYY-MM-DD')})
    setDataEscolhida(moment(dataNova).format('DD/MM/YYYY'))
    console.log(limpeza.dataProximaLimpeza)
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
            <TouchableOpacity style={styles.botaoData} onPress={()=>{setShow(true)}}>
              <Text style={{color: 'white'}}>{dataEscolhida + ''}</Text>
              <SimpleLineIcons name="arrow-down" size={24} color="white" />
            </TouchableOpacity>
          </View>
          {show && (
            <DateTimePicker
              value={new Date()}
              mode={"date"}
              display="default"
              onChange={onChangeData}
            />
          )}
          <Picker
            prompt={'Frequencia'}
            mode={'dropdown'}
            selectedValue={limpeza.frequencia}
            onValueChange={(itemValue, itemIndex) => setLimpeza({...limpeza, frequencia: itemValue})}
            style={{width: 300}}>
            <Picker.Item label="Diaria" value="diaria" />
            <Picker.Item label="Semanal" value="semanal" />
            <Picker.Item label="Mensal" value="mensal" />
            <Picker.Item label="Sem Frequência" value="semFrequencia" />
          </Picker>
        </View>
      </View>
      <Button label={'Salvar'} click={salvar} style={{width: 200, marginLeft: 75}} />
    </ScrollView>
  )
}

  
  