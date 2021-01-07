import * as React from 'react';
import { useState } from 'react';

import { View, Text, ScrollView, TextInput, 
Animated, TouchableOpacity, StyleSheet,
Modal, TouchableHighlight, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function Register(){
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [logo] = useState(new Animated.ValueXY({x: 90, y: 90}));

  return(
    <ScrollView>

        <View style={styles.background}>
          <View style={styles.container}>
            <TextInput
            style={styles.input}
            placeholder="Ramo"
            autoCorrect={false}
            onChangeText={() => {}}
            />

            <TextInput
            keyboardType='number-pad'
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
            keyboardType='phone-pad'
            style={styles.input}
            placeholder="Adicionar Telefone"
            autoCorrect={false}
            onChangeText={() => {}}
            />

            <TextInput
            keyboardType='email-address'
            style={styles.input}
            placeholder="Email"
            autoCorrect={false}
            onChangeText={() => {}}
            />

            <TextInput
            style={styles.input}
            placeholder="Endereço"
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

            <View style={styles.passwordContainer}>
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
            </View>

            <View style={styles.containerLogo}>
              <Animated.Image
              style={{
                width: logo.x,
                height: logo.y
              }}
              source={require('../../assets/icons/adaptive-icon.png')}
              />
            </View>

            <View style={styles.termContainer}>
              <Text style={styles.termText}>Concordo com os</Text>
              <TouchableOpacity onPress={() => {
                setModalVisible(true);
              }}>
                <Text style={styles.termText}>Termos de Uso</Text>
              </TouchableOpacity>
            </View>

            {/*TERM MODAL*/}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
              >
                
                  <View style={styles.modalView}>

                    {/* MODAL CONTENT */}
                    <Text style={styles.modalTitle}>Termo de uso.</Text>
                    <ScrollView style={styles.tcContainer}>
                      <Text style={styles.tcP}>Lorem</Text>
                      <Text style={styles.tcP}>Ipsum</Text>
                        <Text style={styles.tcL}>{'\u2022'}</Text>
                      <Text style={styles.tcP}>Text</Text>

                    </ScrollView>

                    {/* MODAL CLOSE BUTTON */}
                    <TouchableHighlight
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >

                      <Text>Hide Modal</Text>
                    </TouchableHighlight>
                  </View>
                
              </Modal>
            

            <TouchableOpacity 
              style={styles.btnSubmit}
              onPress={() => {
                navigation.navigate('Login')
              }}
            >
              <Text style={styles.submitText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </ScrollView>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  background:{
    backgroundColor: '#191919',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    paddingTop: 50
  },
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%'
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
  passwordContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: '90%'
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
  termContainer:{
    marginBottom: 20
  },
  termText:{
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10
  },
  btnSubmit:{
    backgroundColor: '#35AAFF',
    width:'90%',
    marginBottom: 30,
    color:'#222',
    fontSize: 17,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:7,
    padding:10
  },
  submitText:{
    color: '#FFF',
    fontSize: 20
  },
  modalView:{
    margin: 20,
    width: '90%',
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
  },
  modalTitle:{
    fontSize: 22,
    alignSelf: 'center'
  },
  tcP:{
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12
  },
  tcL:{
    marginLeft:10,
    marginTop:10,
    marginBottom:10,
    fontSize:12
  },
  tcContainer:{
    marginTop:15,
    marginBottom:15,
    height: height * .7
  }
});