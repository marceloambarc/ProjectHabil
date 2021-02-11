import * as React from 'react';
import { useState } from 'react';

import { View, Text, ScrollView, TextInput, 
Image, TouchableOpacity, StyleSheet,
Modal, TouchableHighlight, Switch, Dimensions, 
TouchableWithoutFeedback } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export default function Register(){
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
  const [company_images, setCompanyImages] = useState<string[]>([]);

  const [term_is_true, setTermIsTrue] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  async function handleCreateCompany() {
    if(password !== confirmPassword){
      alert("Senha não confere.")
      return;
    }

    if(term_is_true !== true){
      alert("Você deve aceitar os Termos de Uso")
      return;
    }
    
    const data = new FormData();

    data.append('business', business);
    data.append('cnpj', cnpj);
    data.append('name', name);
    data.append('phone', phone);
    data.append('email', email);
    data.append('address', address);
    data.append('district', district);
    data.append('city', city);
    data.append('uf', uf);
    data.append('password', password);
    
    company_images.forEach((company_image, index) => {
      data.append('company_images', {
        name: `company_image_${index}.jpg`,
        type: 'image/jpg',
        uri: company_image,
      } as any)
    })

    try {
      await api.post('companies', data);
      navigation.navigate('Login');
    }catch(err){
      alert("Credenciais Inválidas!");
      return;
    }
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.getCameraPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Precisamos de acesso a images');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri: company_image } = result;

    setCompanyImages([...company_images, company_image]);
  }

  async function handleRemoveItem(){
    setCompanyImages([]);
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

        <View style={styles.passwordContainer}>
          <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          autoCorrect={false}
          value={password}
          caretHidden={true}
          onChangeText={setPassword} 
          />

          <TextInput
          style={styles.passwordInput}
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
              {company_images.map(company_image => {
                return (
                  <Image 
                    key={company_image}
                    source={{ uri: company_image }}
                    style={styles.uploadedImage}
                  />
                );
              })}
              <Text style={styles.uploadedImageText}>Toque para remover.</Text>
            </View>
          </TouchableWithoutFeedback>

        </View>
        
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnSubmit} onPress={handleSelectImages}>
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
          >
            
              <View style={styles.modalView}>

                {/* MODAL CONTENT */}
                <Text style={styles.modalTitle}>Termos de uso.</Text>
                <ScrollView style={styles.tcContainer}>
                  
                  <Text style={styles.tcP}>
                    LoreLorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  </Text>
                  <Text style={styles.tcP}>
                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                    remaining essentially unchanged. It was popularised in the 1960s with the release of 
                    Letraset sheets containing Lorem Ipsum passages.
                  </Text>
                    <Text style={styles.tcL}>{'\u2022'}</Text>
                  <Text style={styles.tcP}>
                    It is a long established fact that a reader will be distracted by the readable content 
                    of a page when looking at its layout.
                  </Text>

                </ScrollView>

                {/* MODAL CLOSE BUTTON */}
                <TouchableHighlight
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.hideBtn}>Fechar</Text>
                </TouchableHighlight>
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
    color:'#35AAFF'
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
    marginBottom: 30
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 16
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
    alignSelf: 'center',
    color: '#017895'
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
  },
  hideBtn: {
    color: '#ff6600'
  },

  uploadedImagesContainer: {
    flexDirection: 'row',
  },

  imageContainer:{
    justifyContent: 'center',
    alignItems: 'center'
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 10,
    marginRight: 8,
  },

  uploadedImageText: {
    color: '#191919',
    marginBottom: 7
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