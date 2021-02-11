import * as React from 'react';
import { useState  } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, 
Image, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

interface PromotiosDetailsRoutePrams {
  id: string,
  name: string,
  price: string,
  description: string,
  company_id: string,
  images: string[];

  phone: string,
  email: string,
}

function PromotionsDetailsHeader() {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('SupplierView')}>
        <Feather name="arrow-left" size={28} color="#e82041" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Retornar</Text>
    </View>
  );
}

export default function PromotionDetailsScreen(){
  const route = useRoute();
  const params = route.params as PromotiosDetailsRoutePrams;

  const promotionName = params.name;
  const promotionPrice = params.price;
  const promotionDescription = params.description;
  const promotionImages = params.images;
  const companyId = params.company_id;

  const [modalVisible, setModalVisible] = useState(false);

  async function handleWhatsapp() {
    try{
      const result = await api.get(`products/${companyId}`)
      const companyPhone = result.data.phone;
      Linking.openURL(`https://api.whatsapp.com/send?phone=55${companyPhone}&text=%20Estou%20interessado%20no%20produto:%20${promotionName}%20+`)
    }catch(err){
      alert(err);
    }
  }

  async function handleEmail() {
    try{
      const result = await api.get(`companies/${companyId}`)
      const companyEmail = result.data.email;
      Linking.openURL(`mailto:${companyEmail}?subject=Interesse em: ${promotionName}&body=
        Aqui é um modelo de template Literal, qualquer formato é adaptável para o envio de Email.
        Variável 1: ${promotionPrice}, Variável 2: ${promotionDescription}
      `)
    }catch(err){
      alert(err);
    }
  }

  async function handlePhoneCall() {
    try{
      const result = await api.get(`companies/${companyId}`)
      const companyPhone = result.data.phone;
      Linking.openURL(`tel:0${companyPhone}`);
    }catch(err){
      alert(err);
    }
  }

  return (
    <View style={styles.background}>
      <PromotionsDetailsHeader />
      <View style={styles.container}>
        <ScrollView>
          <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
            <TouchableOpacity onPress={() => {
              setModalVisible(true);
            }}>
              {promotionImages.map((image:any) => {
                return (
                  <Image 
                    source={{ uri: image.url }} 
                    key={image.id.toString()} 
                    style={styles.productImg} 
                  />
                );
              })}
            </TouchableOpacity>

            <Text style={styles.name}>{promotionName}</Text>
            <Text style={styles.price}>Valor R$ {promotionPrice}</Text>
            <Text style={styles.description}>Descrição: {promotionDescription}</Text>
            <View style={styles.separator}></View>
            <View style={styles.contactsBtnContainer}>
              <View style={styles.padding}>
                <TouchableOpacity 
                  style={[styles.contactsBtn, styles.btnColor1]} 
                  onPress={handleEmail}
                >
                  <Text style={styles.contactsBtnText}>Email</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.padding}>
                <TouchableOpacity 
                  style={[styles.contactsBtn, styles.btnColor2]} 
                  onPress={handlePhoneCall}
                >
                  <Text style={styles.contactsBtnText}>Phone</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={[styles.contactsBtn, styles.btnColor3]}
                  onPress={handleWhatsapp}
                >
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
          {promotionImages.map((image:any) => {
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

    /* BODY */
    background:{
      flex:1
    },
    container:{
      flex:1,
      alignItems:'center',
      paddingTop: 70
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
    padding: {
      padding: 5
    },

    /* CONTACTS BTN */
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

    /* MODAL VIEW */
    modalView:{
      width: '100%',
      flex: 1,
      backgroundColor: '#191919',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
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
});