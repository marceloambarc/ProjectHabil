import * as React from 'react';
import { useState } from 'react';
import { View, Text, SafeAreaView, 
StyleSheet, Image, TouchableOpacity,
TextInput, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Feather } from '@expo/vector-icons';

import { host, port, fromEmail, pass } from '../../../../email.json';
import mailgun from '../../../services/mailgun';
import api from '../../../services/api';

export default function Forgot({navigation}:{navigation:any}){

  const [cnpj, setCnpj] = useState('');
  const [toEmail, setToEmail] = useState('');
  
  const title = "Recuperar Senha"; 
  const message = "Recuperar Senha";
  const content = "Teste de troca de senha - link: <a href=\"http:\/\/www.habilinformatica.com.br\/\">CompreMaisAki<\/a>";

  async function handleForgot(){
    if(!cnpj){
      Alert.alert(
        "Erro",
        "Insira seu CNPJ cadastrado",
      );
    }else{
      const registeredCompany = true;//await api.get(`companies/${cnpj}`);
      if (!registeredCompany){
        Alert.alert(
          "Erro",
          "Empresa fora do cadastro ou Inativa, entre em contato com o Suporte.",
        );
      }
      try {
        await mailgun.post('mailgun',{
          host: host, 
          port: port,
          fromEmail: fromEmail, 
          pass: pass, 
          toEmail: toEmail, 
          title: title,
          message: message,
          content: content,
        }).then(() => {
          Alert.alert(
            "Alerta",
            "Sua senha é importante para nós, enviamos um e-mail(verifique sua caixa de spam)."
          );
          navigation.navigate('Início');
        }).catch(err => {
          Alert.alert(
            "Ops!",
            "Tivemos um erro."
          );
          console.log(err);
          navigation.navigate('Início');
        });
      }catch(err){
        Alert.alert(
          "Ops!",
          "Tivemos um erro, entre em contato com Suporte."
        )
      }
    }
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

});