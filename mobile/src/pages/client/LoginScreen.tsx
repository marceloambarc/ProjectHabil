import * as React from 'react';
import { useState, useEffect } from 'react';

import { View, Text, StyleSheet, KeyboardAvoidingView,
TextInput, TouchableOpacity, Animated, ActivityIndicator, Alert, 
Keyboard, TouchableWithoutFeedback, Platform, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { Feather } from '@expo/vector-icons'

import api from '../../services/api';
import tokenCredentials from '../../services/token.json';

export default function Login(){
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState('');
  const [isSecure, setIsSecure] = useState(true);

  const params  = new URLSearchParams();

  const username = tokenCredentials.username;
  const tokenPassword = tokenCredentials.password;
  const grant_type = tokenCredentials.grant_type;

  params.append('username', `${username}`)
  params.append('password', `${tokenPassword}`)
  params.append('grant_type', `${grant_type}`)

  async function getToken() {
    const response = await api.post('token',params, {
      headers: {
        ['Content-type'] : 'application/x-www-urlencoded'
      }
    })
    setUserToken(response.data.access_token);
  }

  useEffect(() => {
    setTimeout(() => {
      getToken();
      setIsLoading(false);
    }, 1000);
  },[]);

  const [cnpj, setCnpj] = useState('');
  let ref_cnpj = React.createRef<any>();

  const [password, setPassword] = useState('');
  let ref_password = React.useRef<TextInput>(null);

  const navigation = useNavigation();
  const [logo] = useState(new Animated.ValueXY({ x: 130, y: 130 }));

  async function handleAccess(){
    if(!cnpj || !password){
      Alert.alert(
        'Erro',
        'Credenciais Inválidas.',
      );
      return;
    }

    try {
      await api.post('companies/logon',{
        cnpj: cnpj,
        password: password
      },{
        headers: {'Authorization': 'Bearer '+userToken}
      }).then(res => navigation.navigate('Home',{
        id: res.data.id,
        name: res.data.name,
        image: res.data.image,
        cnpj: cnpj,
        userToken: userToken
      }));
    }catch(err){
      Alert.alert(
        'Acesso Inválido',
        'Tente novamente após alguns minutos.',
      );
    }
  }

  async function handleRegister(){
    navigation.navigate('Register');
  }

  async function handleForgotPassword(){
    navigation.navigate('Forgot');
  }

  async function handleHomeNavigation(){
    navigation.navigate('Início');
  }

  function eyeView(){
    if(isSecure){
      return (
        <TouchableOpacity style={styles.passwordView} onPress={() => setIsSecure(false)}>
          <Feather name="eye" size={24} color="black" />
        </TouchableOpacity>
      )
    }else{
      return(
        <TouchableOpacity style={styles.passwordView} onPress={() => setIsSecure(true)}>
          <Feather name="eye-off" size={24} color="black" />
        </TouchableOpacity>
      );
    }
  }

  if(isLoading){
    return (
      <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size='large' color='#ff6600'/>
      </View>
    )
  }
  return (
    <KeyboardAvoidingView
      style={styles.background}>
        <View style={styles.containerLogo}>
          <TouchableWithoutFeedback onPress={handleHomeNavigation}>
            <Animated.Image
            style={{
              width: logo.x,
              height: logo.y
            }}
            source={require('../../../assets/icon.png')}
              />
          </TouchableWithoutFeedback>
        </View>
    
          <View style={styles.container}>
            <TextInputMask
            type={'cnpj'}
            style={styles.input}
            placeholder="Cnpj"
            autoCorrect={false}
            value={cnpj}
            onChangeText={setCnpj}
            ref={ref_cnpj}
            returnKeyType='next'
            onSubmitEditing={() => ref_password.current?.focus()}
            />

          <View style={styles.passwordContainer}>
            <View style={styles.passwordCol1}>
              <TextInput
              secureTextEntry={isSecure}
              autoCapitalize="none"
              style={styles.passwordInput}
              placeholder="Senha"
              autoCorrect={false}
              autoCompleteType="password"
              value={password}
              onChangeText={setPassword}
              ref={ref_password}
              onSubmitEditing={() => Keyboard.dismiss()}
              />
            </View>

            <View style={styles.passwordCol2}>
              {eyeView()}
            </View>
          </View>
    
            <TouchableOpacity style={styles.btnSubmit} onPress={handleAccess}>
              <Text style={styles.submitText}>Acessar</Text>
            </TouchableOpacity>
    
            <TouchableOpacity style={styles.btnRegister} onPress={handleRegister}>
              <Text style={styles.registerText}>Criar conta Gratuita</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnRegister} onPress={handleForgotPassword}>
              <Text style={styles.forgetText}>Esqueci minha Senha.</Text>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#FFF'
  },
  containerLogo:{
    flex:1,
    justifyContent:'center',
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width: '90%',
    paddingTop: Dimensions.get('window').height * 0.025
  },
  input:{
    backgroundColor:'#a9acb1',
    width:'90%',
    marginBottom: 15,
    color:'#222',
    fontSize: 17,
    borderRadius:7,
    padding:10
  },

  passwordContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  passwordInput: {
    backgroundColor:'#a9acb1',
    width:'100%',
    marginBottom: 15,
    color:'#222',
    fontSize: 17,
    borderRadius:7,
    padding:10
  },
  passwordView: {
    padding: Dimensions.get('window').width * 0.001
  },
  passwordCol1: {
    width: '85%',
  },
  passwordCol2: {
    width: '12%',
    marginLeft: Dimensions.get('window').width * .01,
    padding: Dimensions.get('window').width * 0.001
  },

  btnSubmit:{
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7
  },
  submitText:{
    color: '#FFF',
    fontSize: 18
  },
  btnRegister:{
    marginTop: 20
  },
  registerText:{
    color: '#35AAFF'
  },
  forgetText: {
    color: '#ff6600'
  }
});