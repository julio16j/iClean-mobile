import React, {useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Input from '../../Components/input'
import Button from '../../Components/button'
import Spinner from 'react-native-loading-spinner-overlay'                    
import userService from '../../Services/userService'
import { sucessMessage, erroMessage} from '../../Services/alerts'
import Header from '../../Components/header'
import styles from './styles'

export default function Login() {
  const navigation = useNavigation()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)
  async function login (email, password) {
    setLoading(true)
    try {
      const response = await userService.login(email, password)
      if (response.data.exception === undefined) {
        limparCampos()
        NavigateHome(response.data)
      }
      else erroMessage("Erro")
    } catch (err) {
      console.log(err)
      erroMessage('Email ou Senha incorretos')
    }
    setLoading(false)
  }
  function limparCampos () {
    setLoading(false)
    setEmail(null)
    setPassword(null)
  }
  function NavigateHome (usuario) {
    navigation.navigate('home', { usuario })
  }
  function NavigateCadastrar () {
    navigation.navigate('cadastrar')
  }
  return (
    <ScrollView  style={styles.container} >
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
      <Header voltar={() => {console.log('cliquei')}} />
      <View style={[styles.center, styles.body]}>
        <View>
          <Input updateField={setEmail} value={email} placeholder={'Email'} style={{marginTop: 10, width: 300}} />
          <Input updateField={setPassword} value={password} placeholder={'Senha'} hidden={true} style={{marginTop: 10, width: 300}} />
          <View style={{width: '100%', flexDirection: 'row'}}>
            <TouchableOpacity style={{marginTop: 10, width: '50%'}} onPress={() => NavigateCadastrar()}>
              <Text >Cadastre-se</Text>
            </TouchableOpacity>
          </View>
          <Button label={'Login'} click={() => login(email, password)} style={{width: 300}}/>
        </View>
      </View>
    </ScrollView>
  )
}

  
  