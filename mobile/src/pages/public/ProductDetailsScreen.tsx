import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation ,useRoute } from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';

interface ProductDetailsRouteParams {
  id: string,
  name: string,
  price: string,
  description: string,
  date: string,
  images: string[];
}

function ProductsDetailsHeader(){
  const navigation = useNavigation();

  return(
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Home')}>
          <Feather name="arrow-left" size={28} color="#e82041" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Meus Produtos</Text>
    </View>
  );
}

export default function UserProductDetailsScreen(){
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as ProductDetailsRouteParams;

  const productName = params.name;
  const productPrice = params.price;
  const productDescription = params.description;
  const productDate = params.date;
  const productImages = params.images;

  return(
    <View style={styles.background}>
       
      <ProductsDetailsHeader />

      <View style={styles.container}>

        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/icons/adaptive-icon.png')} style={styles.image}/>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>{productName}</Text>
          <Text style={styles.text}>Valor R$ {productPrice}</Text>
          <Text style={styles.text}>Descrição: {productDescription}</Text>
          <Text style={styles.text}>Validade: {productDate}</Text>
        </View>

        <View style={styles.footer}>

          <TouchableOpacity style={styles.detailsBtn}>
            <Text>Email</Text>
          </TouchableOpacity>
            
          <TouchableOpacity style={styles.detailsBtn}>
            <Text>Ligar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.detailsBtn}>
            <Text>Whatsapp</Text>
          </TouchableOpacity>
        </View>
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

  /*HEADER*/
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '61%'
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'center'
  },
  backBtn:{
    marginTop:20,
    marginLeft:20,
    flex:1,
    padding:10
  },

  imageContainer:{
    flex: 1,
    alignContent: 'center',
    width: '50%',
    height: '50%'
  },
  image:{
    width:'80%',
    height:'80%',
    borderRadius:30
  },

  textContainer:{
    color: '#FFF',
    flex: 1
  },
  text:{
    color: '#FFF'
  },

  footer:{
    flex:1
  },
  detailsBtn:{
    backgroundColor: 'gold'
  }
})