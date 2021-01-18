import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
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
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('ProductList')}>
          <Feather name="arrow-left" size={28} color="#e82041" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Retornar</Text>
    </View>
  );
}

export default function UserProductDetailsScreen(){
  const route = useRoute();
  const params = route.params as ProductDetailsRouteParams;

  const productName = params.name;
  const productPrice = params.price;
  const productDescription = params.description;
  const productDate = params.date;
  const productImages = params.images;

  const companyWhatsapp = "5551992381616";
  const companyEmail = "marcelo_reto7@hotmail.com"

  function handleWhatsapp(){
    Linking.openURL(`https://api.whatsapp.com/send?phone=${companyWhatsapp}&text=%20Gostaria%20de%20Informações%20sobre%20o%20Produto%20${productName}%20+`)
  }

  function handleEmail(){
    Linking.openURL(`mailto:${companyEmail}?subject=SendMail&body=Isto é um template literal!`)
  }

  return(
    <View style={styles.background}>
       
      <ProductsDetailsHeader />

      <View style={styles.container}>

        <ScrollView>
          <View style={{alignItems: 'center', marginHorizontal:30}}>
            
            {productImages.map((image:any) => {
              return(
                <Image source={{uri: image.url}} key={image.id.toString()} style={styles.productImg} />
              );
            })}
            
            <Text style={styles.name}>{productName}</Text>
            <Text style={styles.price}>Valor R$ {productPrice}</Text>
            <Text style={styles.description}>Descrição: {productDescription}</Text>
            <Text style={styles.date}>Validade: {productDate}</Text>
            <View style={styles.separator}></View>
            <View style={styles.contactsBtnContainer}>
              <View style={styles.padding}>
                <TouchableOpacity  style={[styles.contactsBtn, styles.btnColor1]} onPress={handleEmail}>
                  <Text style={styles.contactsBtnText}>Email</Text>  
                </TouchableOpacity>
              </View>

              <View style={styles.padding}>
                <TouchableOpacity style={[styles.contactsBtn, styles.btnColor2]} onPress={()=> {}}>
                  <Text style={styles.contactsBtnText}>Telefone</Text>  
                </TouchableOpacity>
              </View>

              <View style={styles.padding}>
                <TouchableOpacity style={[styles.contactsBtn, styles.btnColor3]} onPress={handleWhatsapp}>
                  <Text style={styles.contactsBtnText}>Whatsapp</Text>  
                </TouchableOpacity>
              </View>

            </View> 
          </View>
        </ScrollView>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1
  },
  container:{
    flex:1,
    alignItems:'center',
    paddingTop: 70
  },

  /*HEADER*/
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '61%'
  },
  headerTitle: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'center',
    color: '#191919',
  },
  backBtn:{
    marginTop:20,
    flex: 1, 
    flexDirection: 'row',
    paddingLeft: 40
  },

  imageContainer:{
    flex: 1,
    alignContent: 'center',
    width: '50%',
    height: '50%'
  },
  productImg:{
    width:200,
    height:200,
    borderRadius: 20
  },

  name:{
    fontSize:28,
    color:"#696969",
    fontWeight:'bold',
    marginTop: 50
  },
  price:{
    marginTop:10,
    fontSize:18,
    color:"green",
    fontWeight:'bold'
  },
  description:{
    textAlign:'center',
    marginTop:10,
    color:"#696969",
  },
  date: {
    textAlign: 'center',
    marginTop: 10,
    color: '#696969'
  },
  separator:{
    height:2,
    backgroundColor:"#eeeeee",
    marginTop:20,
    marginHorizontal:30
  },
  contactsBtnContainer:{
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactsBtn: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:30,
    width: 100
  },
  contactsBtnText:{
    padding: 10,
    color: "#FFFFFF",
    fontSize: 12,
    textAlign: 'center'
  },
  btnColor1:{
    backgroundColor: "#e97200",
  },
  btnColor2:{
    backgroundColor: "#203f51",
  },
  btnColor3:{
    backgroundColor: "#24cc63",
  },
  padding: {
    padding: 5
  }
})