import * as React from 'react';
import { useState } from 'react';
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

  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isNewPasswordSecure, setIsNewPasswordSecure] = useState(true);
  const [isConfirmNewPasswordSecure, setIsConfirmNewPasswordSecure] = useState(true);


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

    if(newPassword === confirmNewPassword){
      api.post('companies/logon',{
        cnpj: companyCnpj,
        password: password
      },{
        headers: {'Authorization': 'Bearer '+userToken}
      }).then(res => {
        api.put(`companies/${companyId}`,{
          password: newPassword,
          is_active: 1
        },{
          headers: {'Authorization': 'Bearer '+userToken} 
        }).then(res => {
          Alert.alert(
            'Ok',
            'Sua Senha foi Alterada com Sucesso.'
          )
          navigation.navigate('Login');
        }).catch(err => {
          Alert.alert(
            'Ops!',
            'Tivemos Erro ao alterar sua senha, entre em contato com o Suporte.'
          )
        })
      }).catch(err => {
        Alert.alert(
          'Ops!',
          'Senha Anterior Inválida'
        )
      })
    }else{
      Alert.alert(
        'Ops!',
        'As Senhas não coincidem'
      )
    }
  }

  function eyeView1(){
    if(isPasswordSecure){
      return (
        <TouchableOpacity style={styles.passwordView} onPress={() => setIsPasswordSecure(false)}>
          <Feather name="eye" size={24} color="black" />
        </TouchableOpacity>
      );
    }else{
      return(
        <TouchableOpacity style={styles.passwordView} onPress={() => setIsPasswordSecure(true)}>
          <Feather name="eye-off" size={24} color="black" />
        </TouchableOpacity>
      );  
    }
  }

  function eyeView2(){
    if(isNewPasswordSecure){
      return (
        <TouchableOpacity style={styles.passwordView} onPress={() => setIsNewPasswordSecure(false)}>
          <Feather name="eye" size={24} color="black" />
        </TouchableOpacity>
      );
    }else{
      return(
        <TouchableOpacity style={styles.passwordView} onPress={() => setIsNewPasswordSecure(true)}>
          <Feather name="eye-off" size={24} color="black" />
        </TouchableOpacity>
      );  
    }
  }

  function eyeView3(){
    if(isConfirmNewPasswordSecure){
      return (
        <TouchableOpacity style={styles.passwordView} onPress={() => setIsConfirmNewPasswordSecure(false)}>
          <Feather name="eye" size={24} color="black" />
        </TouchableOpacity>
      );
    }else{
      return(
        <TouchableOpacity style={styles.passwordView} onPress={() => setIsConfirmNewPasswordSecure(true)}>
          <Feather name="eye-off" size={24} color="black" />
        </TouchableOpacity>
      );  
    }
  }
  
  return (
    <SafeAreaView>
      <View style={styles.headerBackground}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Feather style={styles.icon} name='arrow-left' size={28} color="#191919" />
          </TouchableOpacity>
          <Image
            style={styles.cmaLogo}
            source={require("../../../../assets/cmatextlogo.png")}
          />
        </View>
      </View>

      <View style={styles.bodyContainer}>

        <View style={styles.passwordContainer}>
          <TextInput 
            style={styles.input}
            placeholder="Insira sua Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={isPasswordSecure}
            autoCapitalize="none"
          />
          {eyeView1()}
        </View>

        <View style={styles.passwordContainer}>
          <TextInput 
            style={styles.newInput}
            placeholder="Insira a nova Senha"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={isNewPasswordSecure}
            autoCapitalize="none"
          />
          {eyeView2()}
        </View>
        
        <View style={styles.passwordContainer}>
          <TextInput
          style={styles.newInput}
            placeholder="Confirme Sua nova Senha"
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            secureTextEntry={isConfirmNewPasswordSecure}
            autoCapitalize="none"
          />
          {eyeView3()}
        </View>
        

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
    marginRight: '37%',
    marginTop: 5,
  },
  icon: {
    marginLeft: 10,
    paddingBottom: 5
  },
  bodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70,
  },
  input: {
    backgroundColor:'#a9acb1',
    width:'80%',
    marginBottom: 50,
    color:'#222',
    fontSize: 17,
    borderRadius:7,
    padding: 10
  },
  newInput: {
    backgroundColor:'#a9acb1',
    width:'80%',
    marginBottom: 30,
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
    marginTop: 25,
  },
  submitText:{
    color: '#FFF',
    fontSize: 18
  },

  /*PASSWORD VIEWS*/
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  passwordView: {
    padding: 10
  }
});