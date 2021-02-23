import * as React from 'react';
import { useState } from 'react';

import { View, Text, StyleSheet, KeyboardAvoidingView,
TextInput, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import api from '../../services/api';

export default function Login(){
  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const [logo] = useState(new Animated.ValueXY({ x: 90, y: 90 }));

  async function handleAccess(){
    if(!cnpj || !password){
      alert("Credenciais Inválidas!");
      return;
    }

    try {
      await api.post('companies/logon', {
        cnpj: cnpj,
        password: password,
      }).then(async res => {
        var id = res.data.id;
        var name = res.data.name;
        var image = res.data.image;
        navigation.navigate('Home',{
          id: id,
          name: name,
          image: image,
        });
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

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image
         style={{
           width: logo.x,
           height: logo.y
         }}
         source={require('../../../assets/adaptive-icon.png')}
          />
        </View>
  
        <View style={styles.container}>
          <TextInputMask
          type={'cnpj'}
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
          <TouchableOpacity style={styles.btnRegister} onPress={() => {}}>
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
    paddingTop: 50
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