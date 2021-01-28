import * as React from 'react';
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, 
Linking, Modal, TouchableHighlight } from 'react-native';
import { useNavigation ,useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

interface ProductDetailsRouteParams {
  id: string,
  name: string,
  price: string,
  description: string,
  date: string,
  company_id: string,
  images: string[];
}

interface Company {
  id: number;
  name: string,
  phone: string,
  email: string,
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
  const companyId = params.company_id; /*GET COMPANY OVER COMPANYID*/

  const [modalVisible,setModalVisible] = useState(false);

  async function handleWhatsapp(){
    const result = await api.get(`companies/${companyId}`)
    const companyPhone = result.data.phone;
    Linking.openURL(`https://api.whatsapp.com/send?phone=55${companyPhone}&text=%20Estou%20interessado%20no%20produto:%20${productName}%20+`)
  }

  async function handleEmail(){
    const result = await api.get(`companies/${companyId}`)
    const companyEmail = result.data.email;
    Linking.openURL(`mailto:${companyEmail}?subject=Interesse em: ${productName}&body=
      Aqui é um modelo de template Literal, qualquer formato é adaptável para o envio de Email.
      Variável 1: ${productPrice}, Variável 2: ${productDescription}
    `)
  }

  async function handlePhoneCall(){
    const result = await api.get(`companies/${companyId}`)
    const companyPhone = result.data.phone;
    Linking.openURL(`tel:0${companyPhone}`)
  }

  return(
    <View style={styles.background}>
       
      <ProductsDetailsHeader />

      <View style={styles.container}>

        <ScrollView>
          <View style={{alignItems: 'center', marginHorizontal:30}}>
            <TouchableOpacity onPress={() => {
              setModalVisible(true);
            }}>
              {productImages.map((image:any) => {
                return(
                  <Image source={{uri: image.url}} key={image.id.toString()} style={styles.productImg} />
                );
              })}
            </TouchableOpacity>
            
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
                <TouchableOpacity style={[styles.contactsBtn, styles.btnColor2]} onPress={handlePhoneCall}>
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

        {/* IMAGE MODAL */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.modalView}>
          {productImages.map((image:any) => {
            return(
              <Image source={{uri: image.url}} key={image.id.toString()} style={styles.modalImg} />
            );
          })}
            <TouchableHighlight onPress={() => {
              setModalVisible(!modalVisible);
              }}
            >
            <Text style={styles.modalText}>Fechar</Text>
            </TouchableHighlight>
          </View>
        </Modal>

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
  },

    /* MODAL VIEW */
    modalView:{
      width: '100%',
      flex:1,
      backgroundColor: "#191919",
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
    modalImg:{
      height: '40%',
      width: '80%',
      borderRadius: 20,
    },
    modalText:{
      color: '#FFF',
      marginTop: 70
    }
})