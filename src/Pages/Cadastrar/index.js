import React, {useState} from 'react'
import {View, Text, TouchableOpacity, CheckBox, ScrollView} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Input from '../../Components/input'
import Button from '../../Components/button'
import Spinner from 'react-native-loading-spinner-overlay'                    
import userService from '../../Services/userService'
import { sucessMessage, erroMessage} from '../../Services/alerts'
import { stringNotNull } from '../../Services/utils'
import Header from '../../Components/header'
import styles from './styles'
import * as Notifications from 'expo-notifications';

export default function Cadastrar() {
  const navigation = useNavigation()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [nome, setNome] = useState()
  const [selecionado,setSelecionado] = useState(false)
  const [loading, setLoading] = useState(false)
  async function signup (nome, email, password, confirmPassword, selecionado) {
    setLoading(true)
    if (!validaCadastro(nome, email, password, confirmPassword, selecionado)) {
      setLoading(false)
      return
    }
    try {
      const tokenResponse = await Notifications.getExpoPushTokenAsync()
      const response = await userService.cadastrar(email, password, nome, tokenResponse.data)
      if (response.data.exception === undefined) {
        sucessMessage('Cadastrado com sucesso')
        limparCampos()
        NavigateHome(response.data)
      }
      else erroMessage("Erro")
    } catch (err) {
      console.log(err)
      erroMessage('Cadastro Inválido')
    }
    setLoading(false)
  }
  function limparCampos () {
    setLoading(false)
    setEmail(null)
    setNome(null)
    setSelecionado(null)
    setPassword(null)
    setConfirmPassword(null)
  }
  function NavigateLogin () {
    navigation.navigate('login')
  }
  function NavigateHome (usuario) {
    navigation.navigate('home', { usuario })
  }
  function validaCadastro (nome, email, password, confirmPassword, selecionado) {
    if (!selecionado) {
      erroMessage('Por favor aceite os termos de uso')
      return false
    }
    if (!stringNotNull(nome)) {
      erroMessage('Nome não poder nulo')
      return false
    }
    if (!stringNotNull(email)) {
      erroMessage('Email não poder nulo')
      return false
    }
    if (!stringNotNull(password)) {
      erroMessage('Senha não poder nula')
      return false
    } else {
      if (!stringNotNull(confirmPassword)) {
        erroMessage('Confirme a senha não pode ser nulo')
        return false
      } else {
        if (password !== confirmPassword) {
          erroMessage('Senhas não coincidem')
          return false
        }
      }
    }
    return true
  }
  return (
    <ScrollView  style={styles.container} >
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
      <Header voltar={()=> {navigation.goBack()}} />
      <View style={[styles.center, styles.body]}>
        <View>
          <Text style={styles.p}>Informe seus dados</Text>
        </View>
        <View>
          <Input updateField={setNome} value={nome} placeholder={'Nome'} style={{marginTop: 10, width: 300}} />
          <Input updateField={setEmail} value={email} placeholder={'Email'} style={{marginTop: 10, width: 300}} />
          <Input updateField={setPassword} value={password} placeholder={'Senha'} hidden={true} style={{marginTop: 10, width: 300}} />
          <Input updateField={setConfirmPassword} value={confirmPassword} placeholder={'Confirme a senha'} hidden={true} style={{marginTop: 10, width: 300}} />
          <View style={{marginTop:10, width:300, flexDirection:'row'}}>
            <CheckBox
            value={selecionado}
            onValueChange={setSelecionado}
            style={{alignSelf:'center'}}
            />
            <Text style={{margin:8}}>Aceite os termos de uso</Text>
        </View>
          <View style={{width: '100%', flexDirection: 'row'}}>
            <TouchableOpacity style={{marginTop: 10, width: '50%'}} onPress={() => NavigateLogin()}>
              <Text >Ir para login</Text>
            </TouchableOpacity>
          </View>
          <Button label={'Cadastrar'} click={() => signup(nome, email, password, confirmPassword, selecionado)} style={{width: 300}}/>
        </View>
      </View>
    </ScrollView>
  )
}

  
  