import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, 
TouchableOpacity, StyleSheet, ScrollView, Image, Alert, Keyboard, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Feather, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { TextInputMask } from 'react-native-masked-text';

interface NewPromotionParams {
  companyId: string,
  userToken: string,
  max_prom: number;
  productsLength: number;
}

export default function NewPromotionScreen(){
  const [name, setName] = useState('');

  const [price, setPrice] = useState('000');
  let ref_price = React.useRef<any>();

  const [discountPrototype, setDiscountPrototype] = useState('0');
  let ref_discount = useRef<TextInput>(null);

  const [description, setDescription] = useState('');
  let ref_discription = useRef<TextInput>(null)

  const [base, setBase] = useState('');
  const [image, setImage] = useState('');
  

  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as NewPromotionParams;

  const company_id = params.companyId;
  const userToken = params.userToken;
  const max_prom = params.max_prom;
  const products_length = params.productsLength
  const discount = parseInt(discountPrototype);

  const checkIsNan = isNaN(discount);

  async function handleNextStepProduct() {
    if(!description){
      Alert.alert(
        'Ops!',
        'Descrição Inválida'
      );
    }
    if(description.length > 100){
      Alert.alert(
        'Ops!',
        'A Descrição não pode ser maior que 100 caracteres'
      );
      return;
    }
    if(!price){
      Alert.alert(
        'Ops!',
        'É necessário preencher o Valor'
      );
      return;
    }
    if(price.length > 20){
      Alert.alert(
        'Preço',
        'Valor inválido'
      );
      return;
    }
    if(!image){
      Alert.alert(
        'Image',
        'Selecione uma Image'
      );
      return;
    }
    if(discount > 100){
      Alert.alert(
        'Erro',
        'Desconto inválido'
      );
      return;
    }
    if(discount < 0){
      Alert.alert(
        'Erro',
        'Desconto inválido'
      );
      return;
    }
    if(checkIsNan){
      Alert.alert(
        'Erro',
        'Desconto Inválido'
      );
      return;
    }
    if(products_length >= max_prom){
      Alert.alert(
        'Ops!',
        'Você alcançou o máximo de Promoções, Contate o Administrador pela página de Suporte na barra lateral inicial.'
      );
      return;
    }
    navigation.navigate('NewPromotionOverview', {
      name,
      price,
      description,
      company_id,
      base,
      discount,
      userToken,
    });
  }

  function ProductsHeader(){
    const navigation = useNavigation();
  
    return(
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Home')}>
            <Feather name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastrar Promoção</Text>
      </View>
    );
  }

  function MaxPromoHeader(){
    return (
      <View style={styles.maxPromoContainer}> 
        <Text style={styles.maxPromoHeader}>Máximo de promoções Autorizadas</Text>
        <Text style={styles.maxPromoSubtitle}>{products_length}/{max_prom}</Text>
      </View>
    );
  }

  async function handleSelectImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Precisamos de acesso');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
    });

    if (result.cancelled) {
      return;
    }else{
      const { uri: image } = result;
      setImage(image);

      const manipulatedImage = await ImageManipulator.manipulateAsync(
        image,
        [{ resize: {width: 200} }],
        { compress: 1, base64: true }
      );

      setBase(manipulatedImage.base64!);
    }
  }

  async function handleTakePicture() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if(status !== 'granted'){
      Alert.alert(
        'Ops!',
        'Precisamos do acesso.',
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
    });

    if (result.cancelled) {
      return;
    }else{
      const { uri: image } = result;
      setImage(image);

      const manipulatedImage = await ImageManipulator.manipulateAsync(
        image,
        [{ resize: {width: 251,height: 251} }],
        { compress: 1, base64: true }
      );

    setBase(manipulatedImage.base64!);
    }
  }

  return(
    <ScrollView style={{ backgroundColor: '#191919' }}>
    <ProductsHeader />
    <MaxPromoHeader />
    <View style={styles.background}>
      <View style={styles.container}>

        <TextInput
          style={styles.input}
          placeholder="Produto"
          autoCorrect={false}
          onChangeText={setName}
          returnKeyType='next'
        />

        <TextInputMask
          type={'money'}
          style={styles.input}
          placeholder="Preço"
          value={price}
          autoCorrect={false}
          onChangeText={setPrice}
          returnKeyType='next'
        />

        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder={"Desconto"}
          autoCorrect={false}
          value={discountPrototype}
          onChangeText={setDiscountPrototype}
          returnKeyType='next'
        />

        <TextInput
          style={styles.inputDescription}
          textAlignVertical='top'
          multiline={true}
          autoCapitalize='sentences'
          placeholder="Descrição"
          autoCorrect={false}
          onChangeText={setDescription}
          returnKeyType='next'
        />

        <View style={styles.uploadedImagesContainer}>
      
              <Image
                source={{
                  uri: image !== ""? 
                  image : undefined
                }}
                style={styles.uploadedImage}
              />
  
        </View>

        <View style={styles.btnContainer}>
          
          <View style={styles.galleryButtonsRow}>
            <View style={styles.galleryButtonsCol}>
              <TouchableOpacity style={styles.btnSubmit} onPress={handleTakePicture}>
                <Feather name="camera" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.galleryButtonsCol}>
              <TouchableOpacity style={styles.btnSubmit} onPress={handleSelectImage}>
                <Ionicons name="albums-outline" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.btnSubmit} onPress={handleNextStepProduct}>
            <Text style={styles.submitText}>Visualizar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background:{
    backgroundColor: '#191919',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    paddingTop: 20
  },
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%'
  },
  title:{
    color: '#FFF',
    fontSize: 18,
    marginTop: 20
  },
  subTitle:{
    color: '#D3D3D3',
    fontSize: 20,
    marginBottom: 50,
    marginTop: 5
  },
  input:{
    backgroundColor:'#FFF',
    width:'90%',
    marginBottom: 15,
    color:'#222',
    fontSize: 17,
    borderRadius:7,
    padding:10
  },
  inputDescription:{
    backgroundColor:'#FFF',
    width:'90%',
    height: 170,
    marginBottom: 15,
    color:'#222',
    fontSize: 17,
    borderRadius:7,
    padding:10
  },
  btnContainer:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('window').height * 0.04,
    marginBottom: Dimensions.get('window').height * 0.01
  },
  btnSubmit:{
    backgroundColor: '#35AAFF',
    width:'90%',
    marginBottom: Dimensions.get('window').height * 0.001,
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
  uploadedImagesContainer: {
    flexDirection: 'row',
    marginBottom: Dimensions.get('window').height * 0.001
  },
  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 7,
    marginRight: 8,
  },
  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  /*BUTTONS*/
  galleryButtonsRow: {
    display:'flex',
    flexDirection: 'row',
    width: '60%'
  },
  galleryButtonsCol: {
    flexDirection: 'column',
    width: '50%',
    height: 100,
  },

  /*HEADER*/
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '73%'
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'center',
    color: '#FFF'
  },
  backBtn:{
    marginTop:20,
    marginLeft:25,
    flex:1,
    padding:10
  },

  /*MAX PROMO HEADER*/
  maxPromoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  maxPromoHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    justifyContent: 'center',
    textAlign: 'center'
  },
  maxPromoSubtitle:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  }
});