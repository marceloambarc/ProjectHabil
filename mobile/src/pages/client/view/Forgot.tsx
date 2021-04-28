import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, 
StyleSheet, Image, TouchableOpacity,
TextInput, Alert, ActivityIndicator, Keyboard } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Feather } from '@expo/vector-icons';

import api from '../../../services/api';
import tokenCredentials from '../../../services/token.json';

export default function Forgot({navigation}:{navigation:any}){

  const [cnpj, setCnpj] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState('');

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

  async function handleForgot(){
    if(!cnpj){
      Alert.alert(
        "Erro",
        "Insira seu CNPJ cadastrado",
      );
    }else{
      const registeredCompany = await api.post(`companies/cnpj`,{
        cnpj: `${cnpj}`
      },{
        headers: {'Authorization': 'Bearer '+userToken}
      });
      
      if (!registeredCompany){
        Alert.alert(
          "Erro",
          "Empresa fora do cadastro ou Inativa, entre em contato com o Suporte.",
        );
      }else {
        const passwordReset = await api.put(`companies/${registeredCompany.data.id}`,{
          reset_password: '00000001',
          is_active: 1
        },{
          headers: {'Authorization': 'Bearer '+userToken}
        }).then(res => {
          Alert.alert(
            'Aguarde',
            'Enviaremos um E-mail para recuperação da sua senha.'
          );
          Keyboard.dismiss;
          navigation.navigate('Início');
        }).catch(err => {
          Alert.alert(
            'Ops!',
            'Tivemos um erro, entre em contato com Suporte.'
          )
        });
      }
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
    <SafeAreaView>
      <View style={styles.headerBackground}>
        <View style={styles.headerContainer}>
          <Image
            style={styles.cmaLogo}
            source={require("../../../../assets/cmatextlogo.png")}
          />
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Feather style={styles.icon} name="menu" size={28} color="#191919" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <Text style={styles.forgotText}>
          Ao Enviar a Solicitação, sua senha será redefinida.
        </Text>
        <TextInputMask
          type={'cnpj'}
          style={styles.input}
          placeholder="Insira o CNPJ"
          autoCorrect={false}
          value={cnpj}
          onChangeText={setCnpj}
        />

        <TextInput
          style={styles.input}
          placeholder="Insira o E-mail Cadastrado"
          autoCorrect={false}
          caretHidden={true}
          value={toEmail}
          onChangeText={setToEmail}
        />

        <TouchableOpacity style={styles.btnSubmit} onPress={handleForgot}>
          <Text style={styles.submitText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
      /*HEADER*/
  headerBackground: {
    backgroundColor: '#FFF'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  icon: {
    marginRight: 10,
    paddingBottom: 5
  },
  cmaLogo: {
    height: 20,
    width: 100,
    marginLeft: 10,
    marginTop: 5,
  },

  /*BODY*/
  bodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70,
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

  /*BUTTON*/
  btnSubmit:{
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: 25
  },
  submitText:{
    color: '#FFF',
    fontSize: 18
  },
  forgotText: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 70,
  }

});