import * as React from 'react';
import { useState } from 'react';

import { View, Text, StyleSheet, KeyboardAvoidingView,
TextInput, TouchableOpacity, Animated } from 'react-native';

import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

export default function Login(){

  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const [logo] = useState(new Animated.ValueXY({x: 90, y: 90}));

  async function handleAccess(){
    const data = {cnpj, password}

    try {
      await api.post('auth', {
        cnpj: data.cnpj,
        password: data.password,
      }).then(res => {
        var token = res.data.token;
        console.log(token);
        navigation.navigate('Home');
      }).catch(err => {
        alert(err);
      });
    }catch(err){
      console.log(err);
      navigation.navigate('Login');
    }
  }

  async function handleRegister(){
    navigation.navigate('Register');
  }
  
   return(
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image
         style={{
           width: logo.x,
           height: logo.y
         }}
         source={require('../../../assets/icons/adaptive-icon.png')}
          />
        </View>
  
        <View style={styles.container}>
          <TextInput
          keyboardType='number-pad'
          style={styles.input}
          placeholder="Cnpj"
          autoCorrect={false}
          value={cnpj}
          onChangeText={setCnpj}
          />

          <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Senha"
          autoCorrect={false}
          autoCompleteType="password"
          caretHidden={true}
          value={password}
          onChangeText={setPassword}
          />
  
          <TouchableOpacity style={styles.btnSubmit} onPress={handleAccess}>
            <Text style={styles.submitText}>Acessar</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.btnRegister} onPress={handleRegister}>
            <Text style={styles.registerText}>Criar conta Gratuita</Text>
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
      backgroundColor: '#191919'
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
      paddingTop: 50
    },
    input:{
      backgroundColor:'#FFF',
      width:'90%',
      marginBottom: 15,
      color:'#222',
      fontSize: 17,
      borderRadius:7,
      padding:10
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
      color: '#FFF'
    }
});