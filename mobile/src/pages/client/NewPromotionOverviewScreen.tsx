import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

interface ProductDataRouteParams {
  name: string,
  price: string,
  description: string,
  protoDate: string,
  company_id: string,
  images: string[];
}

export default function NewPromotionOverviewScreen(){
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as ProductDataRouteParams;

  const productName = params.name;
  const productPrice = params.price;
  const productDescription = params.description;
  const productDate = params.protoDate;
  const companyId = params.company_id;
  const productImages = params.images;


  async function handleCreateProduct(){
    const data = new FormData();

    data.append('name', productName);
    data.append('price', productPrice);
    data.append('description', productDescription);
    data.append('company_id', companyId);
    data.append('date', productDate);
    
    productImages.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: `image/jpg`,
        uri: image,
      } as any)
    })

    try {
      await api.post('products', data)
      navigation.navigate('CompanyProducts');
    }catch(err){
      alert(err);
    }
  }

  return(
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.productTitle}>{productName}</Text>
            <Text style={styles.productTitle}>Valor: R$ {productPrice}</Text>
          </View>
          <Text style={styles.productText}>Descrição: {productDescription}
          </Text>
          <Text style={styles.productText}>Vencimento: {productDate}
          </Text>
        </View>

        <View style={styles.productImageContainer}>
          {productImages.map(image => {
            return(
              <Image
                key={image}
                style={styles.productImage}
                source={{ uri: image }}
              />
            );
          })}
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
    width: 100,
    height: 100,
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