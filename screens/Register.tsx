import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Animated, ScrollView } from 'react-native';

export default function RegisterPromotion({ navigation }){

  const [logo] = useState(new Animated.ValueXY({x: 90, y: 90}));

  return(
    <ScrollView style={styles.background}>

      <View style={styles.container}>

        <TextInput
        style={styles.input}
        placeholder="Ramo"
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <TextInput
        style={styles.input}
        placeholder="CNPJ"
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <TextInput
        style={styles.input}
        placeholder="Nome Fantasia"
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <TextInput
        style={styles.input}
        placeholder="Adicionar Telefone"
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <TextInput
        style={styles.input}
        placeholder="Email"
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <TextInput
        style={styles.input}
        placeholder="Endereco"
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <TextInput
        style={styles.input}
        placeholder="Bairro"
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <TextInput
        style={styles.input}
        placeholder="Cidade"
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <TextInput
        style={styles.input}
        placeholder="UF"
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <TextInput
        style={styles.passwordInput}
        placeholder="Senha"
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <TextInput
        style={styles.passwordInput}
        placeholder="Confirme Senha"
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <View style={styles.containerLogo}>
          <Animated.Image
          style={{
            width: logo.x,
            height: logo.y
          }}
          source={require('../assets/snack-icon.png')}
          />
        </View>

        <Text style={styles.termText}>Concordo com os</Text>
        <TouchableOpacity>
          <Text style={styles.termText}>Termos de Uso</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.submitText}>Enviar</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#191919'
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width: '90%',
    paddingTop: 50
  },
  containerLogo:{
    flex:1,
    justifyContent:'center',
    padding: 20
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
  passwordInput:{
    backgroundColor:'#FFF',
    width:'90%',
    marginTop: 15,
    color:'#222',
    fontSize: 17,
    borderRadius:7,
    padding:10
  },
  btnSubmit:{
    backgroundColor: '#35AAFF',
    width:'90%',
    marginBottom: 15,
    color:'#222',
    fontSize: 17,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:7,
    padding:10
  },
  submitText:{
    color: '#FFF',
    fontSize: 18
  },
  termText:{
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10
  },
});