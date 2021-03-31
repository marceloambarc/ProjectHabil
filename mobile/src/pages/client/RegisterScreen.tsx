import * as React from 'react';
import { useState, useEffect } from 'react';

import { View, Text, ScrollView, TextInput, 
Image, TouchableOpacity, StyleSheet,
Modal, Switch, Dimensions, 
TouchableWithoutFeedback, Alert, 
ActivityIndicator} from 'react-native';

import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import mailgun from '../../services/mailgun';
import { host, port, fromEmail, pass } from '../../../email.json';

import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import Userterm from '../../components/Userterm';

export default function Register(){
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState('');

  const params  = new URLSearchParams();
  params.append('username', 'acr')
  params.append('password', '123')
  params.append('grant_type', 'password')

  async function getToken() {
    const response = await api.post('token',params, {
      headers: {
        ['Content-type'] : 'application/x-www-urlencoded'
      }
    })
    setUserToken(response.data.access_token);
  }

  useEffect(() => {
    setTimeout(() => {
      getToken();
      setIsLoading(false);
    }, 1000);
  },[]);

  const [business, setBusiness] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [keywords, setKeywords] = useState('');
  const [base, setBase] = useState('');

  const [image, setImage] = useState('');

  const [term_is_true, setTermIsTrue] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const title = "Confirmar E-mail"; 
  const message = "Confirmar E-mail";
  const content = "Teste para verificar E-mail: <a href=\"http:\/\/www.habilinformatica.com.br\/\">CompreMaisAki<\/a>";

  const navigation = useNavigation();

  async function handleCreateCompany() {
    if(password !== confirmPassword){
      Alert.alert(
        'Erro',
        'Credenciais inválidas.'
      );
      return;
    }

    if(term_is_true !== true){
      Alert.alert(
        'Erro',
        'Você deve aceitar os Termos de Uso.',
      );
      return;
    }

    if(business.length <= 3){
      Alert.alert(
        'Erro',
        'Ramo Inválido.',
      );
      return;
    }else if(business === undefined){
      Alert.alert(
        'Erro',
        'Ramo Inválido.',
      );
      return;
    }

    if(name.length <= 3){
      Alert.alert(
        'Erro',
        'Nome Inválido.',
      );
      return;
    }else if(name === undefined){
      Alert.alert(
        'Erro',
        'Nome Inválido.',
      );
      return;
    }

    if(cnpj.length < 18){
      Alert.alert(
        'Erro',
        'CNPJ Inválido.',
      );
      return;
    }

    if(phone.length < 13){
      Alert.alert(
        'Erro',
        'Telefone Inválido.',
      );
      return;
    }

    if(email.length < 7){
      Alert.alert(
        'Erro',
        'E-mail Inválido.',
      );
      return;
    }

    if(address.length < 3){
      Alert.alert(
        'Erro',
        'Endereço Incorreto.',
      );
      return;
    }else if(address === undefined){
      Alert.alert(
        'Erro',
        'Endereço Incorreto.',
      );
      return;
    }

    if(district.length < 2){
      Alert.alert(
        'Erro',
        'Bairro Inválido.',
      );
      return;
    }else if(district === undefined){
      Alert.alert(
        'Erro',
        'Bairro Inválido.',
      );
      return;
    }else if(city.length < 3){
      Alert.alert(
        'Erro',
        'Cidade Incorreta.',
      );
      return;
    }else if(uf.length < 2){
      Alert.alert(
        'Erro',
        'Unidade Federal Incorreta.',
      );
      return;
    }

    if(keywords.length <= 0){
      Alert.alert(
        'Erro',
        'Inserir Palavras-Chaves.',
      );
      return;
    }else if(keywords === undefined){
      Alert.alert(
        'Erro',
        'Inserir Palavras-Chaves Válidas',
      );
      return;
    }

    

    try {
      await mailgun.post('/',{
        host: host,
        port: port,
        fromEmail: fromEmail,
        pass: pass,
        toEmail: email,
        title: title,
        message: message,
        content: content
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        api.post('companies',{
          business: business,
          cnpj: cnpj,
          name: name,
          phone: phone,
          email: email,
          address: address,
          district: district,
          city: city,
          uf: uf,
          password: password,
          image: base,
          keywords: keywords,
          is_active: 0
        },{
          headers: {'Authorization': 'Bearer '+userToken}
        }).then(() => {
          Alert.alert(
            "Sucesso!",
            "Confirme seu E-mail (Verifique a sua caixa de Spam) e aguarde a confirmação do Administrador."
          );
          navigation.navigate("Início");
        })
      }).catch(err => {
        Alert.alert(
          "Ops!",
          "Tivemos um Erro, entre em contato com o Suporte.",
        )
      })
    }catch(err){
      Alert.alert(
        'Ops!',
        'Tivemos um erro de servidor, entre em contato com o suporte.'
      );
      console.log(err);
      return;
    }

  }

  async function handleSelectImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Precisamos de acesso a images');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }else{
      const { uri: image } = result;
      setImage(image);

      const manipulatedImage = await ImageManipulator.manipulateAsync(
        image,
        [{ resize: {width: 251,height: 251} }],
        { compress: 1, base64: true }
      );

      setBase(manipulatedImage.base64!);
    }
  }

  async function handleRemoveItem(){
    setImage('');
  }

  if(isLoading){
    return (
      <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size='large' color='#ff6600'/>
      </View>
    )
  }
  return (
    <ScrollView>

    <View style={styles.background}>
      <View style={styles.container}>
        <Image 
          source={require('../../../assets/cmalogo.png')}
          style={styles.headImage}
        />

        <TextInput
        style={styles.input}
        placeholder="Nome Fantasia"
        autoCorrect={false}
        value={name}
        onChangeText={setName}
        />

        <TextInputMask
        type={'cnpj'}
        style={styles.input}
        placeholder="CNPJ"
        autoCorrect={false}
        value={cnpj}
        onChangeText={setCnpj}
        />

        <TextInput
        style={styles.input}
        placeholder="Ramo"
        autoCorrect={false}
        value={business}
        onChangeText={setBusiness}
        />

        <TextInputMask
        type={'cel-phone'}
        options={{
          maskType: 'BRL',
          withDDD: true,
        }}
        style={styles.input}
        placeholder="Adicionar Telefone"
        autoCorrect={false}
        value={phone}
        onChangeText={setPhone}
        />

        <TextInput
        keyboardType='email-address'
        style={styles.input}
        placeholder="Email"
        autoCorrect={false}
        autoCompleteType="email"
        value={email}
        onChangeText={setEmail}
        />

        <TextInput
        style={styles.input}
        placeholder="Endereço"
        autoCorrect={false}
        value={address}
        onChangeText={setAddress}
        />

        <TextInput
        style={styles.input}
        placeholder="Bairro"
        autoCorrect={false}
        value={district}
        onChangeText={setDistrict}
        />

        <TextInput
        style={styles.input}
        placeholder="Cidade"
        autoCorrect={false}
        value={city}
        onChangeText={setCity}
        />

        <TextInput
        style={styles.input}
        placeholder="UF"
        autoCorrect={false}
        value={uf}
        onChangeText={setUf}
        />

        <View style={styles.keywordsContainer}>
        <Text style={styles.termText}>Insira as palavras-chaves separadas por vírgula</Text>
        <TextInput
          style={[styles.input, styles.keywords]}
          value={keywords}
          onChangeText={setKeywords}
          autoCorrect={true}
          placeholder="Palavras-Chaves"
          multiline
          numberOfLines={4}
        />
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
          style={styles.passwordInput}
          secureTextEntry={true}
          placeholder="Senha"
          autoCorrect={false}
          value={password}
          caretHidden={true}
          onChangeText={setPassword} 
          />

          <TextInput
          style={styles.passwordInput}
          secureTextEntry={true}
          placeholder="Confirme Senha"
          autoCorrect={false}
          caretHidden={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          />
        </View>

        <View style={styles.uploadedImagesContainer}>
    
          <TouchableWithoutFeedback onPress={handleRemoveItem}>
            <View style={styles.imageContainer}>  
                <Image 
                  source={{uri: image !== ""? image : undefined}}
                  style={styles.uploadedImage}
                />
              <Text style={[styles.uploadedImageText, styles.termText]}>Toque na imagem para remover.</Text>
            </View>
          </TouchableWithoutFeedback>

        </View>
        
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnSubmit} onPress={handleSelectImage}>
            <Text style={styles.submitText}>Selecionar Foto</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.termText}>Concordo com os </Text>
          <TouchableOpacity onPress={() => {
            setModalVisible(true);
            }}>
            <Text style={[styles.termText, styles.termTextButton]}>Termos de Uso</Text>
          </TouchableOpacity>
          <Switch
            style={{marginBottom: 8}} 
            thumbColor="#fff"
            trackColor={{ false: '#ccc', true: '#39CC83' }}
            value={term_is_true}
            onValueChange={setTermIsTrue}
          />
        </View>

        {/*TERM MODAL*/}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            
              <View style={styles.modalView}>

                {/* MODAL CONTENT */}
                <Text style={styles.modalTitle}>Termos de uso.</Text>
                  
                  <Userterm />

                {/* MODAL CLOSE BUTTON */}
                <TouchableOpacity
                style={styles.hideBtn}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                >
                  <Text style={styles.hidebtnText}>Voltar</Text>
                </TouchableOpacity>
              </View>
            
          </Modal>
        

          <TouchableOpacity 
            style={styles.btnSubmit}
            onPress={handleCreateCompany}
          >
            <Text style={styles.submitText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    
    </ScrollView>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  background:{
    backgroundColor: '#FFF',
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
  headImage: {
    height: 40,
    width: 100,
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom: 20
  },
  containerLogo:{
    flex:1,
    justifyContent:'center',
    padding: 20
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
  keywords: {
    marginTop: 5
  },
  keywordsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: 30
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
    backgroundColor:'#a9acb1',
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
    color: '#ff6600',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10
  },
  termTextButton:{
    color:'#35AAFF',
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
  btnContainer:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 0
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 1,
    marginBottom: 16
  },

  modalView:{
    height: height * .9,
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
    alignSelf: 'center',
    color: '#017895'
  },
  hideBtn: {
    backgroundColor: '#fa690a',
    width: '90%',
    height: 45,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7
  },
  hidebtnText: {
    color: 'white'
  },

  uploadedImagesContainer: {
    flexDirection: 'row',
  },

  imageContainer:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  uploadedImage: {
    width: 101,
    height: 101,
    borderRadius: 20,
    marginBottom: 10,
    marginRight: 8,
  },
  uploadedImageText: {
    color: '#191919',
    marginBottom: 2
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 64,
    width: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

});