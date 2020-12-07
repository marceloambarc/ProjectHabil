import * as React from 'react';
import { useState, useEffect } from 'react';

import { Text, View, StyleSheet, KeyboardAvoidingView, 
Image, TextInput, TouchableOpacity, Animated,
Keyboard
} from 'react-native';

export default function Login({ navigation }){

  const [logo] = useState(new Animated.ValueXY({x: 90, y: 90}));

  const registerHandler = () => {
    navigation.navigate('Register');
  }

  const accessHandler = () => {
    navigation.navigate('AccessCompany');
  }

  return(
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image
        style={{
          width: logo.x,
          height: logo.y
        }}
        source={require('../assets/snack-icon.png')}
        />
      </View>

      <View style={styles.container}>
        <TextInput
        style={styles.input}
        placeholder="Cnpj"
        autoCorrect={false}
        onChangeText={() => {}}
        />
        <TextInput
        style={styles.input}
        placeholder="Senha"
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <TouchableOpacity style={styles.btnSubmit} onPress={accessHandler}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister} onPress={registerHandler}>
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