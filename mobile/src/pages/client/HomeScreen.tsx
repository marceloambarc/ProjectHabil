import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ImageZoom from 'react-native-image-pan-zoom';
import Constants from "expo-constants";
import api from '../../services/api';

interface CompanyDataRouteParams {
  name: string,
  id: number,
  image: string,
  cnpj: string,
  userToken: string,
}

export default function HomeScreen(){
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as CompanyDataRouteParams;

  const companyName = params.name;
  const companyId = params.id;
  const companyImage = params.image;
  const companyCnpj = params.cnpj;
  const userToken = params.userToken;

  const [productsLength, setProductsLength] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [business, setBusiness] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [keywords, setKeywords] = useState('');
  const [max_prom, setMax_prom] = useState('');


  async function getParams(){
    api.post('companies/cnpj',{
      cnpj: companyCnpj
    },{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(res => {
      setName(res.data.name)
      setImage(res.data.image)
      setBusiness(res.data.business)
      setPhone(res.data.phone)
      setEmail(res.data.email)
      setAddress(res.data.address)
      setDistrict(res.data.district)
      setCity(res.data.city)
      setUf(res.data.uf)
      setKeywords(res.data.keywords)
      setMax_prom(res.data.max_prom)
    }).catch(err => {
      Alert.alert(
        'Ops!',
        'Erro ao acessar sua conta, tente novamente.'
      );
      navigation.navigate('Início');
    })
  }

  async function getProductsLenght(){
    api.get(`companies/products/company_id/${companyId}`).then(res => {
      setProductsLength(res.data.length);
    }).catch(err => {
      Alert.alert(
        'Ops!',
        'Erro de Conexão, Por favor, tente novamente mais tarde.'
      )
    })
  }

  useEffect(() => {
    if(!isLoading) return;
    getParams();
    getProductsLenght();
    setIsLoading(false);
  },[]);

  async function handleNewPromotion(){
    navigation.navigate('NewPromotion',{
      companyId,
      companyEmail: email,
      companyName: name,
      userToken,
      max_prom,
      productsLength
    })
  }

  async function handleViewSupplierPromotion(){
    navigation.navigate('SupplierPromotion',{
      companyName,
      companyId,
      companyImage,
      userToken,
      max_prom
    });
  }

  async function handleEditCompanyNavigation(){
    navigation.navigate('EditCompany',{
      id: companyId,
      name: name,
      image: image,
      cnpj: companyCnpj,
      business: business,
      phone: phone,
      email: email,
      address: address,
      district: district,
      city: city,
      uf: uf,
      keywords: keywords,
      userToken: userToken
    });
  }

  async function handleCancelSecondStep(){
    api.put(`companies/${companyId}`,{
      is_active: 2
    },{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(() => {
      Alert.alert(
        'Obrigado',
        'Sua conta foi cancelada com sucesso! Esperamos que breve volte para o CompreMaisAki.'
      );
      navigation.navigate('Home');
    }).catch(err => {
      Alert.alert(
        'Ops!',
        'Tivemos um erro, entre em contato com o Suporte'
      );
      navigation.navigate('Home');
    })
  }

  async function handleCancelAccount() {
    Alert.alert(
      "Deseja Inativar sua conta?",
      "Voce deseja realmente inativar sua conta CompreMaisAki?",
      [
        {
          text: "OK",
          onPress: () => handleCancelSecondStep()
        },
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel"
        }
      ]
    );
  }

  async function handleChangePassword(){
    navigation.navigate('ChangePassword',{
      userToken,
      companyCnpj,
      companyId
    });
  }

  return(
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo {companyName}</Text>

        <View style={styles.companyImageContainer}>

        <ImageZoom  
          cropWidth={Dimensions.get('window').width * .47}
          cropHeight={Dimensions.get('window').height * .20}
          imageWidth={Dimensions.get('window').width * .47}
          imageHeight={Dimensions.get('window').height * .20}
        >
        
          <Image
            style={styles.companyImage}
            source={{uri: `data:image/jpeg;base64,${companyImage}`}}
          />

        </ImageZoom>
          
        </View>

        <TouchableOpacity style={styles.btnSubmit} onPress={handleViewSupplierPromotion}>
          <Text style={styles.submitText}>Visualizar minhas promoções</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnNew} onPress={handleNewPromotion}>
          <Text style={styles.submitText}>Cadastrar promoção</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSubmitEdit} onPress={handleEditCompanyNavigation}>
          <Text style={styles.submitText}>Editar Empresa</Text>
        </TouchableOpacity>

        <View style={styles.dangerRowBtn}>
          <View style={styles.dangerRowBtnCol}>
            <TouchableOpacity style={styles.btnCancelAccount} onPress={handleCancelAccount}>
              <Text style={styles.cancelText}>Cancelar Conta</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dangerRowBtnCol}>
            <TouchableOpacity style={styles.btnChange} onPress={handleChangePassword}>
              <Text style={styles.submitText}>Mudar Senha</Text>
            </TouchableOpacity>
          </View>
        </View>


        <TouchableOpacity style={styles.btnLogout} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.outText}>Sair</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background:{
    backgroundColor: '#191919',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    height: Constants.statusBarHeight + 20
  },
  companyImageContainer:{
    flex: 1,
    justifyContent:'center',
  },
  companyImage: {
    width: Dimensions.get('window').width * .47,
    height: Dimensions.get('window').height * .20,
    borderRadius: 20,
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width: '90%',
    paddingTop: Dimensions.get('window').height * 0.01
  },
  title:{
    fontSize: Dimensions.get('window').height * 0.025,
    color: '#FFF',
    marginTop: Dimensions.get('window').height * 0.023,
    textAlign: 'center'
  },
  containerLogo:{
    flex:1,
    justifyContent:'center',
  },
  btnSubmit:{
    backgroundColor: '#35AAFF',
    width: '90%',
    height: Dimensions.get('window').height * 0.062,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: 20
  },
  btnSubmitEdit:{
    backgroundColor: '#35AAFF',
    width: '90%',
    height: Dimensions.get('window').height * 0.062,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: Dimensions.get('window').height * 0.025,
  },
  submitText:{
    color: '#FFF',
    fontSize: 18
  },
  btnNew:{
    backgroundColor: '#52D984',
    width: '90%',
    height: Dimensions.get('window').height * 0.062,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: Dimensions.get('window').height * 0.045
  },
  btnLogout:{
    backgroundColor: '#f1f1f1',
    width: '70%',
    height: Dimensions.get('window').height * 0.062,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: Dimensions.get('window').height * 0.022
  },
  outText:{
    color: '#191919'
  },

  dangerRowBtn: {
    flexDirection: 'row',
  },
  dangerRowBtnCol: {
    width: '45%'
  },
  btnCancelAccount:{
    backgroundColor: '#fa690a',
    color: 'white',
    width: '50%',
    height: Dimensions.get('window').height * 0.062,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: Dimensions.get('window').height * 0.02,
  },
  btnChange: {
    backgroundColor: '#fa690a',
    width: Dimensions.get('window').width * .4,
    height: Dimensions.get('window').height * 0.062,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: Dimensions.get('window').height * 0.027,
  },
  cancelText: {
    color: 'white',
    textAlign: 'center'
  },
});