import * as React from 'react';
import { useState, useEffect } from 'react';
import { Image, SafeAreaView, View, 
Text, StyleSheet, TouchableOpacity,
TextInput, Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/core';
import api from '../../../services/api';

interface ChangePasswordProps {
  companyId: number;
  companyCnpj: string;
  userToken: string;
}

export default function ChangePassword({navigation}:{navigation:any}){
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const route = useRoute();
  const params = route.params as ChangePasswordProps;

  const companyId = params.companyId;
  const companyCnpj = params.companyCnpj;
  const userToken = params.userToken;

  async function handleChangePassword(){
    if(!password){
      Alert.alert(
        'Erro!',
        'Você Esqueceu de inserir a Senha'
      );
    }
    if(!newPassword){
      Alert.alert(
        'Erro!',
        'Você Esqueceu de inserir a Nova Senha'
      );
    }
    if(!confirmNewPassword){
      Alert.alert(
        'Erro!',
        'Você Esqueceu de inserir a Confirmação de Senha'
      );
    }

    if(password != confirmNewPassword){
      Alert.alert(
        'Ops!',
        'As Senhas não Coincidem'
      );
    }

    api.post('companies/logon',{
      cnpj: companyCnpj,
      password: password
    },{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(res => {
      api.put(`companies/${companyId}`,{
        password: password
      },{
        headers: {'Authorization': 'Bearer '+userToken}
      }).then(res => {
        Alert.alert(
          'Ok',
          'Senha Alterada com Sucesso!'
        );
        navigation.navigate('Home');
      }).catch(err => {
        Alert.alert(
          'Ops!',
          'Tivemos um erro na Alteração da Senha'
        );
      });
    }).catch(err => {
      Alert.alert(
        'Ops!',
        'Senha Inválida'
      );
    })
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

        <TextInput 
          style={styles.input}
          placeholder="Insira sua Senha"
          value={password}
          onChangeText={setPassword}
          caretHidden={true}
        />

        <TextInput 
          style={styles.newInput}
          placeholder="Insira a nova Senha"
          value={newPassword}
          onChangeText={setNewPassword}
          caretHidden={true}
        />

        <TextInput
        style={styles.newInput}
          placeholder="Confirme Sua nova Senha"
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          caretHidden={true}
        />

        <TouchableOpacity style={styles.btnSubmit} onPress={handleChangePassword}>
          <Text style={styles.submitText}>Alterar Senha</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  cmaLogo: {
    height: 20,
    width: 100,
    marginLeft: 10,
    marginTop: 5,
  },
  icon: {
    marginRight: 10,
    paddingBottom: 5
  },
  bodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70,
  },
  input: {
    backgroundColor:'#a9acb1',
    width:'90%',
    marginBottom: 15,
    color:'#222',
    fontSize: 17,
    borderRadius:7,
    padding:10
  },
  newInput: {
    backgroundColor:'#a9acb1',
    width:'90%',
    marginBottom: 15,
    marginTop: 10,
    color:'#222',
    fontSize: 17,
    borderRadius:7,
    padding:10
  },
  btnSubmit: {
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