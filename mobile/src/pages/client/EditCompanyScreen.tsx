import React, { useState } from 'react';
import { Text, View ,Image ,TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import api from '../../services/api';

interface Props {
  id: number,
  name: any,
  image: any,
  cnpj: string,
  business: string,
  phone: string,
  email: string,
  address: string,
  district: string,
  city: string,
  uf: string,
  keywords: string;
  userToken: string,
  navigation: any
}

export default function SupplierAboutScreen(){
  const route = useRoute();
  const params = route.params as Props;

  const navigation = useNavigation();

  const companyId = params.id;
  const companyName = params.name;
  const companyImage = params.image;
  const companyCnpj = params.cnpj;
  const companyBusiness = params.business;
  const companyPhone = params.phone;
  const companyEmail = params.email;
  const companyAddress = params.address;
  const companyDistrict = params.district;
  const companyCity = params.city;
  const companyUf = params.uf;
  const companyKeywords = params.keywords;
  const userToken = params.userToken;

  const [name, setName] = useState(`${companyName}`);
  const [cnpj] = useState(`${companyCnpj}`);
  const [business, setBusiness] = useState(`${companyBusiness}`);
  const [phone, setPhone] = useState(`${companyPhone}`);
  const [email, setEmail] = useState(`${companyEmail}`);
  const [address, setAddress] = useState(`${companyAddress}`);
  const [district, setDistrict] = useState(`${companyDistrict}`);
  const [city, setCity] = useState(`${companyCity}`);
  const [uf, setUf] = useState(`${companyUf}`);
  const [keywords, setKeywords] = useState(`${companyKeywords}`)

  async function handleConfirmEdit(){
      api.put(`companies/${companyId}`,{
        name,
        business,
        phone,
        email,
        address,
        district,
        city,
        uf,
        keywords
      },{
        headers: {'Authorization': 'Bearer '+userToken}
      }).then(() => {
        Alert.alert(
          'Sucesso!',
          'Aguarde a verificação do Aministrador para acessar novamente.'
        )
        navigation.navigate('Início');
      }).catch(err => {
        Alert.alert(
          'Ops!',
          'Erro ao se comunicar com o Servidor, Verifique sua conexão'
        );
      });
  }

  async function handleSubmitEdit(){
    if(!name){
      Alert.alert(
        'Erro',
        'Nome Inválido'
      );
      return;
    }
    if(name.length > 25){
      Alert.alert(
        'Ops!',
        'Nome Muito extenso'
      );
      return;
    }
    if(!business && business.length > 100){
      Alert.alert(
        'Erro',
        'Ramo Inválido'
      );
      return;
    }
    if(!phone && phone.length < 13){
      Alert.alert(
        'Erro',
        'Telefone Inválido'
      );
      return;
    }
    if(!email && email.length < 7 && email.length > 50){
      Alert.alert(
        'Erro',
        'E-mail inválido'
      );
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
      return;
    }else if(address === undefined){
      Alert.alert(
        'Erro',
        'Endereço Incorreto.',
      );
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
      return;
    }else if(keywords === undefined){
      Alert.alert(
        'Erro',
        'Inserir Palavras-Chaves Válidas',
      );
      return;
    }
    Alert.alert(
      'Editar Empresa',
      'Você realmente deseja editar os Dados? Ao confirmar deverá aguardar a aprovação do Administrador.',
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK", onPress: () => handleConfirmEdit()
        }
      ]
    )
  }

  return (
    <ScrollView>
      <View style={styles.background}>
        <View style={styles.container}>
          <Image
              style={styles.cmaLogo}
              source={require("../../../assets/cmatextlogo.png")}
            />
            <Text style={styles.editText}>
              Edite os Dados Necessários,
              Confirme no Botão no fim da página.
            </Text>
          <Image
            source={{ uri: `data:image/jpeg;base64,${companyImage}` }}
            style={{width: 250, height: 170, marginBottom: 20, borderRadius: 20}}
          />

          <TextInput
          style={styles.input}
          placeholder="Nome Fantasia"
          autoCorrect={false}
          value={name}
          onChangeText={setName}
          />

          <TextInput
          style={styles.inputStatic}
          placeholder="CNPJ"
          autoCorrect={false}
          value={cnpj}
          editable={false}
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
          returnKeyType='next'
          />

          <TextInput
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
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

          <TextInput
          style={styles.input}
          placeholder="Palavras-Chaves"
          autoCorrect={false}
          value={keywords}
          onChangeText={setKeywords}
          />
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmitEdit}>
            <Text style={styles.submitText}>Confirmar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFF',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    paddingTop: 20
  },

  editText: {
    paddingHorizontal: 20,
    fontSize: 18,
    color: 'darkgrey',
    paddingBottom: 20,
    textAlign: 'center'
  },

  container:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%'
  },
  cmaLogo: {
    height: 25,
    width: 150,
    marginVertical: 7,
    marginBottom: 10
  },
  input:{
    backgroundColor:'#a9acb1',
    textAlign: 'center',
    width:'90%',
    marginBottom: 15,
    color:'#222',
    fontSize: 17,
    borderRadius:7,
    padding:10
  },
  inputStatic:{
    backgroundColor:'#f1f1f1',
    textAlign: 'center',
    width:'90%',
    marginBottom: 15,
    color:'#119999',
    fontSize: 17,
    borderRadius:7,
    padding:10
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
});