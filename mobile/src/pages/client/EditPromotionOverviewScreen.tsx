import * as React from 'react';
import { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, 
Modal, TouchableHighlight } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

interface ProductDataRouteParams {
  id: number,
  name: string,
  price: string,
  description: string,
  discount: string,
  company_id: number,
  image: string;
  userToken: string,
}

export default function EditPromotionOverviewScreen(){
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as ProductDataRouteParams;

  const productId = params.id;
  const productName = params.name;

  const productPrice = params.price;
  const [finalPrice, setFinalPrice] = useState('');

  const productDescription = params.description;
  const productImage = params.image;
  const productDiscount = params.discount;
  const userToken = params.userToken;
  const date = Date.now().toString();

  const companyId = params.company_id;

  const [modalVisible, setModalVisible] = useState(false);

  async function getFinalPrice(){
    var unmaskeredPrice = productPrice.replace('R$', '')
    setFinalPrice(unmaskeredPrice);
  }

  async function handleEditPromotion(){
    getFinalPrice();
      api.put(`products/${productId}`,{
        id: productId,
        name: productName,
        price: finalPrice,
        description: productDescription,
        date: date,
        company_id: companyId,
        image: productImage,
        validate: date,
        discount: productDiscount,
        is_active: 0,
      },{
        headers: {
          'Authorization': 'Bearer '+userToken
        }
      }).catch(err => {
        console.log(err);
        alert(err)
      }).then(() => {
        navigation.navigate('Home');
        alert("Concluído!");
      });
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
          <Text style={styles.productText}>Desconto: {productDiscount}%</Text>
        </View>

        
        <View style={styles.productImageContainer}>
          <TouchableOpacity onPress={() => {
            setModalVisible(true);
          }}>
            <Image
              style={styles.productImage}
              source={{uri: `data:image/jpeg;base64,${productImage}`}}
            />
             
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnEdit} onPress={() => navigation.navigate('EditPromotion')}>
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSubmit} onPress={handleEditPromotion}>
          <Text style={styles.btnText}>Enviar</Text>
        </TouchableOpacity>

        {/* IMAGE MODAL */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.modalView}>
            
            <Image
              style={styles.modalImg}
              source={{uri: `data:image/jpeg;base64,${productImage}`}}
            />
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
    width: 160,
    height: 160,
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