import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default function RegisterPromotion({ navigation }){

  const handlePreview = () => {
    navigation.navigate('Preview');
  }

  return(
    <View style={styles.background}>

      <View style={styles.container}>
        <Text style={styles.title}>Bem-Vindo user</Text>
        <Text style={styles.about}>Cadastro de Promoções</Text>

        <TextInput
        style={styles.input}
        placeholder="Produto"
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <TextInput
        style={styles.input}
        placeholder="Valor"
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <TextInput
        style={styles.description}
        placeholder="Descrição"
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <TextInput
        style={styles.input}
        placeholder="Data"
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.submitText}>Selecionar Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSubmit} onPress={handlePreview}>
          <Text style={styles.submitText}>Visualizar</Text>
        </TouchableOpacity>
      </View>
      
    </View>
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
  title:{
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    alignItems:'center',
    justifyContent: 'center'
  },
  about:{
    color: '#FFF',
    fontSize: 16,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
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
  description:{
    backgroundColor:'#FFF',
    width:'90%',
    height: 100,
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10
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
  }
});