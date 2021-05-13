import * as React from 'react';
import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, 
StyleSheet, SafeAreaView, TextInput, Alert, Keyboard, 
TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { MAIL_URL } from '../../../../url.json';
import { host, port, fromEmail, pass } from '../../../../email.json';

export default function SupportScreen({navigation}:{navigation:any}){
  const [clientEmail, setClientEmail] = useState('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const message = 'Suporte';
  const email = 'contato@habilinformatica.com.br'

  async function handleSupport() {
    async function supportFinish(){
      fetch(`${MAIL_URL}`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: host,
          port: port,
          fromEmail: fromEmail,
          pass: pass,
          toEmail: email,
          title: `CompreMaisAki: ${message}`,
          message: `Cliente: ${clientEmail},
                    ${content}`,
          content: `Cliente: ${clientEmail},
                    ${content}`
        })
      }).then(() => {
        Alert.alert(
          'Ok',
          'Aguarde o contato com algum de nossos Administradores.'
        )
      }).catch(err => {
        Alert.alert(
          'Ops!',
          'Tivemos um erro, Aguarde alguns instantes.'
        )
      })
    }

    async function supportCancel(){
      setClientEmail('');
      setContent('');
      setTitle('');
      navigation.navigate('Início');
    }

    Alert.alert(
      'Suporte',
      'Deseja enviar este Email?',
      [
        {text: "Cancel", onPress: () => supportCancel(), style: "cancel"},
        {text: "OK", onPress: () => supportFinish() }
      ]
    );
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
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

      <View style={styles.bodyContainer}>
        <TextInput
          style={styles.input}
          placeholder="Insira Seu Email"
          autoCorrect={false}
          caretHidden={true}
          value={clientEmail}
          onChangeText={setClientEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Insira o Assunto"
          autoCorrect={false}
          caretHidden={true}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.inputMessage}
          placeholder="Insira a Mensagem"
          textAlignVertical='top'
          multiline={true}
          autoCapitalize='sentences'
          autoCorrect={true}
          value={content}
          onChangeText={setContent}
          onSubmitEditing={() => Keyboard.dismiss()}
        />

        <TouchableOpacity style={styles.btnSubmit} onPress={handleSupport}>
          <Text style={styles.submitText}>Enviar</Text>
        </TouchableOpacity>
      </View>
        
      </TouchableWithoutFeedback>
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

  input:{
    backgroundColor:'#a9acb1',
    width:'90%',
    marginBottom: 15,
    color:'#222',
    fontSize: 17,
    borderRadius:7,
    padding:10
  },
  inputMessage:{
    backgroundColor:'#a9acb1',
    width:'90%',
    height: 250,
    marginBottom: 15,
    marginTop: 25,
    color:'#222',
    fontSize: 17,
    borderRadius:7,
    padding:10
  },
  bodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70,
  },

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