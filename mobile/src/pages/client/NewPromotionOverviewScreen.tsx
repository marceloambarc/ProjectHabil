import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

interface ProductDataRouteParams {
  name: string,
  price: string,
  description: string,
  company_id: number,
  company_name: string,
  company_cnpj: string,
  company_image: string,
  company_business: string,
  company_phone: string,
  company_email: string,
  company_address: string,
  company_district: string,
  company_city: string,
  company_uf: string,
  company_keywords: string,
  image: string,
  base: string,
  discount: string,
  userToken: string,
  max_prom: number,
}

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  date: string;
  company_id: number;
  image: string;
  validade: string;
  discount: string;
  is_active: number;
}

export default function NewPromotionOverviewScreen(){
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [count, setCount] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as ProductDataRouteParams;

  const companyId = params.company_id;
  const companyCnpj = params.company_cnpj;
  const companyName = params.company_name;
  const companyImage = params.company_image;
  const maxProm = params.max_prom;
  const companyBusiness = params.company_business;
  const companyPhone = params.company_phone;
  const companyEmail = params.company_email;
  const companyAddress = params.company_address;
  const companyDistrict = params.company_district;
  const companyCity = params.company_city;
  const companyUf = params.company_uf;
  const companyKeywords = params.company_keywords;

  const productName = params.name;
  const productPrice = params.price;
  const productDescription = params.description;
  const productImage = params.base;
  const productValidate = '';
  const productDiscount = params.discount;
  const userToken = params.userToken;
  const [date, setDate] = useState('');

  async function getDate(){
    var data = new Date(),
      dia  = data.getDate().toString().padStart(2, '0'),
      mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
      ano  = data.getFullYear();
      const dateBrPattern = `${dia}/${mes}/${ano}`;
      setDate(dateBrPattern);
  }

  useEffect(() => {
    setTimeout(() => {
      getDate();
      setIsLoading(false);
    }, 1000);
  },[]);

  async function handleCreateProduct(){
    var finalPrice = productPrice.replace('R$', '');
    
    await api.get('companies/all').then(res => {
      setProducts(res.data);
    }).catch(err => {
      Alert.alert(
        'Ops!',
        'Tivemos um erro, Verifique sua Conexão.'
      )
    })

    products.map(product => {
      if(product.company_id == companyId){
        setCount(count + 1);
      }
    });

    if(count >= maxProm){
      Alert.alert(
        'Ops!',
        'Máximo de promoções atingida'
      );
    }else{
      api.post('products',{
        name: productName,
        price: finalPrice,
        description: productDescription,
        date: date,
        company_id: companyId,
        image: productImage,
        validate: productValidate,
        discount: productDiscount,
        is_active: 0,
      },{
        headers: {
          'Authorization': 'Bearer '+userToken
        }
      }).then(() => {
        Alert.alert(
          'Sucesso!',
          'Promoção Cadastrada, aguarde o E-mail do Administrador.'
        )
        navigation.dispatch(StackActions.push('Home',{
          name: companyName,
          id: companyId,
          image: companyImage,
          cnpj: companyCnpj,
          max_prom: maxProm,
          business: companyBusiness,
          phone: companyPhone,
          userToken: userToken,
          email: companyEmail,
          address: companyAddress,
          disctrict: companyDistrict,
          city: companyCity,
          uf: companyUf,
          keywords: companyKeywords
        }));
      }).catch(err => {
        Alert.alert(
          'Ops!',
          'Erro ao Cadastrar sua Promoção, Entre em contato com o Suporte.'
        );
      })
    }
    return;
  }

  if(isLoading){
    return (
      <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size='large' color='#ff6600'/>
      </View>
    ) 
  }
  return(
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.productTitle}>{productName}</Text>
            <Text style={styles.productTitle}>Valor: {productPrice}</Text>
          </View>
          <Text style={styles.productText}>Descrição: {productDescription}</Text>
          <Text style={styles.productText}>Desconto: {productDiscount}% </Text>
        </View>

        <View style={styles.productImageContainer}>
        <Image
            source={{uri: `data:image/jpeg;base64,${productImage}`}}
            style={{width: 200, height: 200}}
          />
        </View>

        <TouchableOpacity style={styles.btnEdit} onPress={() => navigation.navigate('NewPromotion')}>
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSubmit} onPress={handleCreateProduct}>
          <Text style={styles.btnText}>Enviar</Text>
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
    paddingTop: 20
  },
  titleContainer:{
    marginBottom: 30
  },
  textContainer:{
    padding: 30,
    alignContent: 'flex-start'
  },
  productTitle:{
    color: '#FFF',
    fontSize:20,
  },
  productText: {
    color: '#D3D3D3',
    fontSize:18
  },
  productImageContainer:{
    flex:1,
    justifyContent:'center',
  },
  productImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
    marginBottom: 32,
  },
  btnEdit:{
    backgroundColor: 'gold',
    width:'90%',
    marginBottom: 20,
    color:'#222',
    fontSize: 17,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:7,
    padding:10
  },
  btnSubmit:{
    backgroundColor: '#35AAFF',
    width:'90%',
    marginBottom: 20,
    color:'#222',
    fontSize: 17,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:7,
    padding:10
  },
  btnText:{
    color: '#FFF',
    fontSize: 20
  },
})