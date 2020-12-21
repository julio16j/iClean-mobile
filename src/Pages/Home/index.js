import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import styles from './styles'
import Header from '../../Components/header'
import { useRoute, useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'    
import Button from '../../Components/button'
import * as Notifications from 'expo-notifications';
import limpezaService from '../../Services/limpezaService'
import { FontAwesome5 } from '@expo/vector-icons'; 
export default function home () {
  const route = useRoute()
  const [usuario, setUsuario] = useState({})
  const [limpezas, setLimpezas] = useState([])
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  function navigateToLimpeza (limpeza) {
    navigation.navigate('limpeza', { limpeza })
  }
  function navigateToNovaLimpeza () {
    navigation.navigate('novaLimpeza', { usuario })
  }
  useEffect (() => {
    if (route.params) {
      if (route.params.usuario) {
        setUsuario(route.params.usuario)
        limpezaService.getLimpezasByUsuarioId(route.params.usuario.id).then(
          limpezasNovas => setLimpezas(limpezasNovas)
        )
      }
      if (route.params.atualizar) atualizarLista()
    }
    const subscriptionAppMinimizado = Notifications.addNotificationResponseReceivedListener(response => {
      navigateToLimpeza(response.notification.request.content.data)
    });
    return () => {
      subscriptionAppMinimizado.remove()
    }
  }, [route.params])
  async function excluir (limpezaId) {
   setLoading(true)
   await limpezaService.excluir(limpezaId)
   await atualizarLista()
   setLoading(false)
  }
  async function atualizarLista () {
    const responseLimpezas = await limpezaService.getLimpezasByUsuarioId(usuario.id)
    setLimpezas(responseLimpezas ? responseLimpezas : [])
  }
  function formatarData (localDate) {
    if (localDate) {
      let splitDate = localDate.split('-')
      return splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0]
    } return localDate
  }
  return (
    <View style={styles.container}>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
      <Header voltar={() => navigation.goBack()} />
      <View style={styles.body}>
       <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%'}}>
        <Text style={{color: 'black', fontSize: 20}} >Olá, {usuario.nome}</Text>
        <Text style={{color: 'black'}} >{usuario.email}</Text>
       </View>
       <View style={{borderWidth: 5, borderBottomColor: 'black', borderRadius: 5, minHeight:100, marginTop: 10}} >
        {limpezas.length <= 0 && <Text style={{padding: 10}}>Não Há limpezas Registradas Para Você</Text>}
        {limpezas.length > 0 && <FlatList
          data={limpezas}
          keyExtractor={limpeza => String(limpeza.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: limpeza }) => (
            <View style={{flexDirection: 'row', width: 300, justifyContent: 'space-around', marginTop: 5}}>
              <Text>{formatarData(limpeza.dataProximaLimpeza)}</Text>
              <Text>{limpeza.frequencia}</Text>
            </View>
          )}
        />}
       </View>
      </View>
    </View>
  )
}
