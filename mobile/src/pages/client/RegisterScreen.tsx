import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { View, Text, ScrollView, TextInput, 
Image, TouchableOpacity, StyleSheet,
Modal, Switch, Dimensions, 
TouchableWithoutFeedback, Alert, 
ActivityIndicator} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import tokenCredentials from '../../services/token.json'

import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import Userterm from '../../components/Userterm';

export default function Register(){
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState('');

  const params  = new URLSearchParams();
  const username = tokenCredentials.username;
  const tokenPassword = tokenCredentials.password;
  const grant_type = tokenCredentials.grant_type;

  params.append('username', `${username}`)
  params.append('password', `${tokenPassword}`)
  params.append('grant_type', `${grant_type}`)

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
  let ref_business = useRef<TextInput>(null);

  const [cnpj, setCnpj] = useState('');
  let ref_cnpj = React.createRef<any>();

  const [name, setName] = useState('');
  let ref_name = useRef<TextInput>(null);

  const [phone, setPhone] = useState('');
  let ref_phone = React.createRef<any>();

  const [email, setEmail] = useState('');
  let ref_email = useRef<TextInput>(null);

  const [address, setAddress] = useState('');
  let ref_address = useRef<TextInput>(null);

  const [district, setDistrict] = useState('');
  let ref_district = useRef<TextInput>(null);

  const [city, setCity] = useState('Nova Santa Rita');
  let ref_city = useRef<TextInput>(null);

  const [uf, setUf] = useState('RS');
  let ref_uf = useRef<TextInput>(null);

  const [password, setPassword] = useState('');
  const [isPasswordSecure, setPasswordSecure] = useState(true);
  let ref_password = useRef<TextInput>(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmPasswordSecure, setConfirmPasswordSecure] = useState(true);
  let ref_confirmPassword = useRef<TextInput>(null);

  const [keywords, setKeywords] = useState('');
  let ref_keywords = useRef<TextInput>(null);

  const [base, setBase] = useState('');
  const [image, setImage] = useState('');

  const [term_is_true, setTermIsTrue] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


  const navigation = useNavigation();

  async function handleCreateCompany() {
    if(password.length <= 3){
      if(password.length > 24){
        Alert.alert(
          'Erro',
          'Senha não pode ser maior que 24 caracteres'
        );
      }
      Alert.alert(
        'Erro',
        'Senha deve ser maior que 3 caracteres'
      );
      setPassword('');
      setConfirmPassword('');
      const wrongPass = () => {
        ref_password.current?.focus();
      }
      wrongPass();
      return;
    }
    if(password !== confirmPassword){
      Alert.alert(
        'Erro',
        'Senha não confere.'
      );
      setPassword('');
      setConfirmPassword('');
      const wrongPass = () => {
        ref_password.current?.focus();
      }
      wrongPass();
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
      if(business.length > 24)
      Alert.alert(
        'Erro',
        'Ramo Inválido.',
      );
      setBusiness('');
      const wrongBusiness = () => {
        ref_business.current?.focus();
      }
      wrongBusiness();
      return;
    }else if(business === undefined){
      Alert.alert(
        'Erro',
        'Ramo Inválido.',
      );
      setBusiness('');
      return;
    }

    if(name.length <= 3){
      if(name.length > 24){
        Alert.alert(
          'Erro',
          'Nome muito extenso.'
        )
      }
      Alert.alert(
        'Erro',
        'Nome Inválido.',
      );
      setName('');
      const wrongName = () => {
        ref_name.current?.focus();
      }
      wrongName();
      return;
    }else if(name === undefined){
      Alert.alert(
        'Erro',
        'Nome Inválido.',
      );
      setName('');
      const wrongName = () => {
        ref_name.current?.focus();
      }
      wrongName();
      return;
    }

    if(cnpj.length < 18){
      Alert.alert(
        'Erro',
        'CNPJ Inválido.',
      );
      setCnpj('');
      const wrongCnpj = () => {
        ref_cnpj.current?._inputElement.focus();
      }
      wrongCnpj();
      return;
    }

    if(phone.length < 13){
      Alert.alert(
        'Erro',
        'Telefone Inválido.',
      );
      setPhone('');
      const wrongPhone = () => {
        ref_phone.current?._inputElement.focus();
      }
      wrongPhone();
      return;
    }

    if(email.length < 7){
      Alert.alert(
        'Erro',
        'E-mail Inválido.',
      );
      setEmail('');
      const wrongEmail = () => {
        ref_email.current?.focus();
      }
      wrongEmail();
      return;
    }

    if(address.length < 3){
      if(address.length > 24){
        Alert.alert(
          'Erro',
          'Endereço muito extenso'
        );
      }
      Alert.alert(
        'Erro',
        'Endereço Incorreto.',
      );
      setAddress('');
      const wrongAddress = () => {
        ref_address.current?.focus();
      }
      wrongAddress();
      return;
    }else if(address === undefined){
      Alert.alert(
        'Erro',
        'Endereço Incorreto.',
      );
      setAddress('');
      const wrongAddress = () => {
        ref_address.current?.focus();
      }
      wrongAddress();
      return;
    }

    if(district.length < 2){
      if(district.length > 24){
        Alert.alert(
          'Erro',
          'Bairro muito extenso'
        );
      }
      Alert.alert(
        'Erro',
        'Bairro Inválido.',
      );
      setDistrict('');
      const wrongDistrict = () => {
        ref_district.current?.focus();
      }
      wrongDistrict();
      return;
    }else if(district === undefined){
      Alert.alert(
        'Erro',
        'Bairro Inválido.',
      );
      setDistrict('');
      const wrongDistrict = () => {
        ref_district.current?.focus();
      }
      wrongDistrict();
      return;
    }else if(city.length < 3){
      Alert.alert(
        'Erro',
        'Cidade Incorreta.',
      );
      setCity('');
      const wrongCity = () => {
        ref_city.current?.focus();
      }
      wrongCity();
      return;
    }else if(uf.length < 2){
      Alert.alert(
        'Erro',
        'Unidade Federal Incorreta.',
      );
      setUf('');
      const wrongUf = () => {
        ref_uf.current?.focus();
      }
      wrongUf();
      return;
    }

    if(keywords.length <= 0){
      if(keywords.length > 255){
        Alert.alert(
          'Erro',
          'Palavras-chaves muito extensas'
        );
      }
      Alert.alert(
        'Erro',
        'Inserir Palavras-Chaves.',
      );
      setKeywords('');
      const wrongKeywords = () => {
        ref_keywords.current?.focus();
      }
      wrongKeywords();
      return;
    }else if(keywords === undefined){
      Alert.alert(
        'Erro',
        'Inserir Palavras-Chaves Válidas',
      );
      setKeywords('');
      const wrongKeywords = () => {
        ref_keywords.current?.focus();
      }
      wrongKeywords();
      return;
    }

    if(!image){
      Alert.alert(
        'Erro',
        'Inserir Imagem para sua empresa',
      );
    }

    api.post('companies/cnpj',{
      cnpj: cnpj
    },{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(res => {
      Alert.alert(
        'Erro',
        'Empresa já Cadastrada'
      );
    }).catch(err => {

      
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
        is_active: 0,
        max_prom: 5
      },{
          headers: {'Authorization': 'Bearer '+userToken}
      }).then(res => {
        Alert.alert(
          'Sucesso',
          'Aguarde a confirmação do Administrador'
        );
        setBusiness('');
        setCnpj('');
        setName('');
        setPhone('');
        setEmail('');
        setAddress('');
        setDistrict('');
        setCity('');
        setUf('');
        setPassword('');
        setImage('');
        setBase('');
        setKeywords('');
        navigation.navigate("Início");
      }).catch(err => {
        Alert.alert(
          'Ops!',
          'Tivemos um Erro, entre em contato com o Suporte.'
          );
      });


    });
  }

  async function handleSelectImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Precisamos de acesso a images');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }else{
      const { uri: image } = result;
      setImage(image);

      const manipulatedImage = await ImageManipulator.manipulateAsync(
        image,
        [{ resize: {width: 250} }],
        { compress: 1, base64: true }
      );

      setBase(manipulatedImage.base64!);
    }
  }

  async function handleRemoveItem(){
    setImage('');
  }

  async function handleHomeNavigation(){
    navigation.navigate('Início');
  }

  function eyeView1(){
    if(isPasswordSecure){
      return(
        <TouchableOpacity style={styles.passwordView} onPress={() => setPasswordSecure(false)}>
          <Feather name="eye" size={24} color="black" />
        </TouchableOpacity>
      );
    }else{
      return(
        <TouchableOpacity style={styles.passwordView} onPress={() => setPasswordSecure(true)}>
          <Feather name="eye-off" size={24} color="black" />
        </TouchableOpacity>
      );
    }
  }

  function eyeView2(){
    if(isConfirmPasswordSecure){
      return(
        <TouchableOpacity style={styles.passwordView} onPress={() => setConfirmPasswordSecure(false)}>
          <Feather name="eye" size={24} color="black" />
        </TouchableOpacity>
      );
    }else{
      return(
        <TouchableOpacity style={styles.passwordView} onPress={() => setConfirmPasswordSecure(true)}>
          <Feather name="eye-off" size={24} color="black" />
        </TouchableOpacity>
      );
    }
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
        <TouchableWithoutFeedback onPress={handleHomeNavigation}>
        <Image 
          source={require('../../../assets/cmalogo.png')}
          style={styles.headImage}
        />
        </TouchableWithoutFeedback>

        <TextInput
        style={styles.input}
        placeholder="Nome Fantasia"
        autoCorrect={false}
        value={name}
        onChangeText={setName}
        ref={ref_name}
        returnKeyType='next'
        onSubmitEditing={() => ref_cnpj.current?._inputElement.focus()}
        />

        <TextInputMask
        type={'cnpj'}
        style={styles.input}
        placeholder="CNPJ"
        autoCorrect={false}
        value={cnpj}
        onChangeText={setCnpj}
        ref={ref_cnpj}
        returnKeyType='next'
        onSubmitEditing={() => ref_business.current?.focus()}
        />

        <TextInput
        style={styles.input}
        placeholder="Ramo"
        autoCorrect={false}
        value={business}
        onChangeText={setBusiness}
        ref={ref_business}
        returnKeyType='next'
        onSubmitEditing={() => ref_phone.current?._inputElement.focus()}
        />

        <TextInputMask
        type={'cel-phone'}
        options={{
          maskType: 'BRL',
          withDDD: true,
        }}
        style={styles.input}
        placeholder="Adicionar Telefone / Whatsapp"
        autoCorrect={false}
        value={phone}
        onChangeText={setPhone}
        ref={ref_phone}
        returnKeyType='next'
        onSubmitEditing={() => ref_email.current?.focus()}
        />

        <TextInput
        keyboardType='email-address'
        style={styles.input}
        placeholder="Email"
        autoCorrect={false}
        autoCompleteType="email"
        value={email}
        onChangeText={setEmail}
        ref={ref_email}
        returnKeyType='next'
        onSubmitEditing={() => ref_address.current?.focus()}
        />

        <TextInput
        style={styles.input}
        placeholder="Endereço"
        autoCorrect={false}
        value={address}
        onChangeText={setAddress}
        ref={ref_address}
        returnKeyType='next'
        onSubmitEditing={() => ref_district.current?.focus()}
        />

        <TextInput
        style={styles.input}
        placeholder="Bairro"
        autoCorrect={false}
        value={district}
        onChangeText={setDistrict}
        ref={ref_district}
        returnKeyType='next'
        onSubmitEditing={() => ref_city.current?.focus()}
        />

        <TextInput
        style={styles.input}
        placeholder="Cidade"
        autoCorrect={false}
        value={city}
        onChangeText={setCity}
        ref={ref_city}
        returnKeyType='next'
        onSubmitEditing={() => ref_uf.current?.focus()}
        />

        <TextInput
        style={styles.input}
        placeholder="UF"
        autoCorrect={false}
        value={uf}
        onChangeText={setUf}
        ref={ref_uf}
        returnKeyType='next'
        onSubmitEditing={() => ref_keywords.current?.focus()}
        />

        <View style={styles.keywordsContainer}>
        <Text style={styles.termText}>Insira as palavras-chaves separadas por vírgula</Text>
        <TextInput
          style={[styles.input, styles.keywords]}
          value={keywords}
          onChangeText={setKeywords}
          autoCorrect={true}
          placeholder="Palavras-Chaves"
          ref={ref_keywords}
          returnKeyType='next'
          onSubmitEditing={() => ref_password.current?.focus()}
        />
        </View>

        <View style={styles.passwordContainer}>
          <View style={styles.passwordSecureContainer}>
            <TextInput
            style={styles.passwordInput}
            secureTextEntry={isPasswordSecure}
            placeholder="Senha"
            autoCorrect={false}
            value={password}
            onChangeText={setPassword}
            ref={ref_password}
            returnKeyType='next'
            onSubmitEditing={() => ref_confirmPassword.current?.focus()}
            />
            {eyeView1()}
          </View>

          <View style={styles.passwordSecureContainer}>
            <TextInput
            style={styles.passwordInput}
            secureTextEntry={isConfirmPasswordSecure}
            placeholder="Confirme Senha"
            autoCorrect={false}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            ref={ref_confirmPassword}
            returnKeyType='send'
            />
            {eyeView2()}
          </View>
          
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
    width:'75%',
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

   /*VIEW PASSWORD*/
   passwordSecureContainer: {
     flexDirection: 'row',
     justifyContent: 'space-around'
   },
   passwordView: {
     padding: 10,
     paddingTop: 20,
     marginVertical: 10
   }
});

function useFocus(): [any, any] {
  throw new Error('Function not implemented.');
}
