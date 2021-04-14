import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity,
ScrollView, Modal, Dimensions, Linking, Alert } from 'react-native';
import { Feather, Fontisto, Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ImageZoom from 'react-native-image-pan-zoom';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface handleCompanyParams {
  companyName: any,
  searchTerm: any,
}

function PromotionDetailsHeader(){
  const route = useRoute();
  const params = route.params as handleCompanyParams;

  const navigation = useNavigation();
  const companyName = params.companyName;
  const searchTerm = params.searchTerm;

  return (
    <SafeAreaView>
      <View style={styles.headerBackground}>
        <View style={styles.headerContainer}>
          <Image
            style={styles.cmaLogo}
            source={require("../../../assets/cmatextlogo.png")}
          />
          <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Welcome')}>
            <Ionicons name="home-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Promotions')}>
            <AntDesign style={styles.icon} name="back" size={24} color="#191919" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.foundContainer}>
        <Text style={styles.foundText}>Resultados: { searchTerm }</Text>
      </View>
      <Text style={styles.companyTitle}>{ companyName }</Text>
    </SafeAreaView>
  );
}

interface handlePromotionDetailParams {
  id: number,
  name: any,
  price: any,
  discount: any,
  image: any,
  description: any,

  companyName: any,
  companyEmail: any,
  companyPhone: any,
}

export default function PromotionDetailsScreen(){
  const [font, setFont] = useState(0);
  async function handleIncreaseFont(){
    setFont(7);
  }

  async function handleDecreaseFont(){
    setFont(-1);
  }

  const route = useRoute();
  const params = route.params as handlePromotionDetailParams;

  const productName = params.name;
  const productPrice = params.price;
  const productDiscount = params.discount;
  const productImage = params.image;
  const productDescription = params.description;

  const companyName = params.companyName;
  const companyEmail = params.companyEmail;
  const companyPhone = params.companyPhone;

  async function handleSendProductEmail(){
    try{
      Linking.openURL(`mailto:${ companyEmail }?subject=Mensagem vinda do App CompreMaisAki&body=
      Produto: ${ productName };
      Preço sem Desconto: R$ ${ productPrice };
      Validade da Promoção: Validade;
      Desconto: ${ productDiscount } por cento;

      Com essa mensagem pelo Aplicativo 
      CompreMaisAki, 
      ganhe desconto de: ${ productDiscount } por cento.
    `)
    }catch(err){
      Alert.alert(
        'Ops!',
        'Tivemos um erro, entre em contato com o suporte.',
      );
    }
  }
  
  async function handleCallProduct(){
   try{
     Linking.openURL(`tel:0${companyPhone}`);
   }catch(err){
     Alert.alert(
        'Ops!',
        'Tivemos um erro, entre em contato com o suporte.',
      );
   }
  }
  
  async function handleSendProductWhatsapp(){
    let companyPhoneSplit = companyPhone.split('(51) 9').join('5551');
    let companyWhatsapp = companyPhoneSplit.split('-').join('');
    try{
      Linking.openURL(`https://api.whatsapp.com/send?phone=${companyWhatsapp}&text=%20Mensagem%20vinda%20do%20App%20CompreMaisAki:%20Produto:%20${productName}%20;%20Preço%20sem%20Desconto:%20${productPrice};%20Validade%20Promoção:%20Validade;%20Desconto:%20${productDiscount}%20por%20cento;%20Com%20essa%20mensagem%20pelo%20Aplicativo%20CompreMaisAki%20,%20ganhe%20Desconto%20de%20:%20${productDiscount}%20por%20cento+`);
    }catch(err){
      Alert.alert(
        'Ops!',
        'Tivemos um erro, entre em contato.'
      );
    }
  }

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={{flex:1}}>
      <PromotionDetailsHeader />
      <View style={styles.container}>
        <View style={styles.borderContainer}>
          <View>

          <ImageZoom 
            cropWidth={350}
            cropHeight={370}
            imageWidth={330}
            imageHeight={350}
          >
            
            <Image
              style={{width:'100%', height: '100%', borderRadius: 20}}
              source={{ uri: `data:image/jpeg;base64,${productImage}` }}
            />
            
          </ImageZoom>
          </View>
          <ScrollView contentContainerStyle={styles.productDescription}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={{flexDirection: 'column', paddingHorizontal: 20}}>
                  <Text style={styles.productTextPriceTitle}>
                    Preço sem Desconto:
                  </Text>
                  <Text style={styles.productTextPrice}> 
                    R$ {productPrice}
                  </Text>
                  <Text style={styles.productTextName}>{productName}</Text>
              </View>
              <View style={{flexDirection: 'column', paddingHorizontal: 20}}>
                <TouchableOpacity style={styles.moreContainer} onPress={() => {
                    setModalVisible(true);
                  }}>
                    <View style={styles.moreCol}>
                      <Text style={styles.moreText}>Saiba Mais </Text>
                      <Text style={styles.moreText}>Como Solicitar</Text>
                      <Text style={styles.moreText}>Desconto: { productDiscount }%</Text>
                    </View>
                  </TouchableOpacity>
              </View>
            </View>
            
            <ScrollView style={{maxHeight: '90%', maxWidth: '90%', marginTop: '16%'}}>
              <Text style={styles.productTextDescription}>{productDescription}</Text>
            </ScrollView>
          </ScrollView>
        </View>

        {/*TERM MODAL*/}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
            
          <View style={styles.modalView}>

            {/* MODAL CONTENT */}
            <Text style={styles.modalTitle}>Como Solicitar o Desconto</Text>
            <ScrollView style={styles.tcContainer}>
                  
              <Text style={[styles.tcP, {fontSize: 12 + font}]}>
                  A Promoção do aplicativo CompreMaisAki para este produto vai 
                  acontecer pelo click nos seguintes botoes: email na cor 
                  vermelha com image de carta, ligacao na cor verde escura 
                  e com imagem de telefone tocando e whatsapp na cor verde clara 
                  com o ícone do Whatsapp.
              </Text>
              <Text style={[styles.tcP, {fontSize: 12 + font}]}>
                  Ao clicar no botão do Whatsapp, irá gerar a tela do aplicativo 
                  do Whatsapp, para enviar uma mensagem pré-determinada 
                  onde o fornecedor irá liberar o desconto anunciado.
              </Text>
              <Text style={[styles.tcP, {fontSize: 12 + font}]}>
                  Ao clicar no botão ligação, irá carregar o número do fornecedor para realizar
                   a ligacao que deverá ser efetuado. Ao falar com o fornecedor solicitar o desconto para
                  este produto visualizado, e solicitar o desconto.
              </Text>
              <Text style={[styles.tcP, {fontSize: 12 + font}]}>
                  Ao clicar no e-mail, irá gerar uma mensagem pré-determinada que será encaminhada 
                  ao e-mail 
                  do fornecedor e a negociação será feita diretamente por e-mail.
              </Text>

              <View style={styles.btnRow}>
                <TouchableOpacity style={styles.btnSupplierContact} onPress={handleSendProductEmail}>
                  <Fontisto name="email" size={25} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnSupplierContact1} onPress={handleCallProduct}>
                  <Feather name="phone-call" size={27} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnSupplierContact4} onPress={handleSendProductWhatsapp}>
                  <Ionicons name="logo-whatsapp" size={25} color="#FFF" />
                </TouchableOpacity>
              </View>

              </ScrollView>
              <View style={styles.fontbtnRow}>
                <View style={styles.fontbtnCol}>
                  <TouchableOpacity style={styles.fontBtn} onPress={handleDecreaseFont} >
                    <MaterialCommunityIcons name="format-font-size-decrease" size={24} color="white" />
                  </TouchableOpacity>
                </View>
                <View style={styles.fontbtnCol}>
                  <TouchableOpacity style={styles.fontBtn} onPress={handleIncreaseFont}>
                    <MaterialCommunityIcons name="format-font-size-increase" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* MODAL CLOSE BUTTON */}
              <TouchableOpacity
                style={styles.hideBtn}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.hidebtnText}>Voltar</Text>
              </TouchableOpacity>
            </View>
            
          </Modal>

      </View>
    </SafeAreaView>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  /* Header */
  headerBackground: {
    backgroundColor: '#FFF'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  headerText: {
    marginLeft: 10,
  },
  icon: {
    marginRight: 10
  },
  cmaLogo: {
    height: 20,
    width: 100,
    marginLeft: 10
  },
  companyTitle: {
    marginLeft: '10%',
    paddingVertical: 10,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#017895',
  },
  homeButton: {
    marginRight: 40,
  },

  /* SEARCH */
  searchRow: {
    flexDirection: 'row',
    width: '100%',
  },
  searchBarContainer: {
    width: '80%'
  },
  searchBar: {
    width: '100%'
  },
  searchBtnContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchBtn: {
    width: 90,
    padding: 10,
    paddingRight: 7,
    backgroundColor: '#ff6600',
    borderRadius: 10
  },
  searchBtnText: {
    fontSize: 10,
    color: '#FFF'
  },
  
  /* FOUND BANNER */
  foundContainer: {
    backgroundColor: '#bdc6cf',
    height: 25,
  },
  foundText: {
    fontSize: 12,
    color: '#8f98a1',
    paddingLeft: '12%',
    paddingRight: '20%',
    paddingTop: 2
  },

    /*BODY*/
    container: {
      alignItems: 'center',
      height: '100%',
      flex: 1,
      paddingHorizontal: 5
    },
    borderContainer: {
      backgroundColor: '#FFF',
      width: '100%',
      height: '100%',
      borderRadius: 20,
      alignItems: 'center',
    },

    /*PRODUCT*/
    productDescription: {
      paddingTop: 2,
      paddingHorizontal: '2%',
      maxWidth: '90%',
      alignItems: 'center'
    },
    productTextPrice: {
      fontSize: 26,
      marginBottom: 4,
      textAlign: 'left'
    },
    productTextPriceTitle: {
      fontSize: 10,
      marginBottom: 4,
    },
    productTextName: {
      fontSize: 26,
      marginBottom: 4,
    },
    productTextDescription: {
      fontSize: 16,
      marginBottom: 4,
      textAlign: 'center'
    },

  /*MODAL BUTTON*/
  moreContainer: {
    backgroundColor: '#ff6600',
    alignItems: 'center',
    borderRadius: 7,
    padding: 7,
    marginRight: 30,
  },
  moreCol: {
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center',
  },
  moreText: {
    textAlign: 'center',
    alignItems:'center',
    justifyContent: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFF'
  },

  /*MODAL*/
  modalView:{
    height: height * .9,
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
  },
  tcL:{
    marginLeft:10,
    marginTop:10,
    marginBottom:10,
    fontSize:12
  },
  tcContainer:{
    marginTop:15,
  },
  
  hideBtn: {
    backgroundColor: '#fa690a',
    width: '90%',
    height: 45,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7,
    paddingTop: 7
  },
  hidebtnText: {
    color: 'white'
  },

  /*MODAL BUTTONS */
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 20
  },
  btnSupplierContact:{
    borderRadius: 40,
    height: 40,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cb4113'
  },
  btnSupplierContact1:{
    borderRadius: 40,
    height: 40,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#099463'
  },
  btnSupplierContact4:{
    borderRadius: 40,
    height: 40,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25d366'
  },
  fontbtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5
  },
  fontbtnCol: {
    width: '50%',
    paddingHorizontal: 10,
  },
  fontBtn: {
    backgroundColor: '#119999',
    height: 45,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7
  },
});