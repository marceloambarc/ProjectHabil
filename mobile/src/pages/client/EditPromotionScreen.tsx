import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, 
TouchableOpacity, StyleSheet, ScrollView, Image,
TouchableWithoutFeedback, Alert} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { TextInputMask } from 'react-native-masked-text';

interface EditPromotionParams {
  id: number,
  name: string,
  price: string,
  description: string,
  company_id: number,
  discount: string;
  image: string,
  userToken: string,
}

export default function EditProductScreen(){
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as EditPromotionParams;

  const editId = params.id;
  const editName = params.name;
  const editPrice = params.price;
  const editDescription = params.description;
  const editImage = params.image;
  const editDiscount = params.discount;
  const editUserToken = params.userToken;

  const company_id = params.company_id;

  const [id] = useState(`${editId}`);
  const [name, setName] = useState(`${editName}`);
  const [price, setPrice] = useState(`${editPrice}`);
  const [description, setDescription] = useState(`${editDescription}`);

  const [discountPrototype, setDiscountPrototype] = useState(`${editDiscount}`);
  const discount = parseInt(discountPrototype);
  const checkIsNan = isNaN(discount);

  const [userToken] = useState(`${editUserToken}`);

  const [image, setImage] = useState('');
  const [base, setBase] = useState(`${editImage}`)

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
        `${discount}`
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
    navigation.navigate('EditPromotionOverview', {
      id,
      name,
      price,
      discount,
      description,
      company_id,
      image: base,
      userToken
    });
  }

  function ProductsHeader(){
    const navigation = useNavigation();
  
    return(
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('SupplierPromotion')}>
            <Feather name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Promoção</Text>
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
      [{ resize: {width: 251,height: 251} }],
      { compress: 1, base64: true }
    );

    setBase(manipulatedImage.base64!);
  }
}

async function handleTakePicture() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();

  if(status !== 'granted'){
    alert('Precisamos de acesso');
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 0.4,
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
      [{ resize: {width: 150,height: 150} }],
      { compress: 1, base64: true }
    );

  setBase(manipulatedImage.base64!);
  }
}

  async function handleRemoveItem(){
    setImage('');
  }

  return(
    <ScrollView style={{ backgroundColor: '#191919' }}>
    <ProductsHeader />
    <View style={styles.background}>
      <View style={styles.container}>

        <TextInput
          style={styles.input}
          placeholder="Produto"
          autoCorrect={false}
          value={name}
          onChangeText={setName}
        />

        <TextInputMask
          type={'money'}
          style={styles.input}
          placeholder="Preço"
          autoCorrect={false}
          keyboardType='number-pad'
          value={price}
          onChangeText={setPrice}
        />

        <TextInput
          style={styles.inputDescription}
          textAlignVertical='top'
          multiline={true}
          autoCapitalize='sentences'
          placeholder="Descrição"
          autoCorrect={false}
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          style={styles.input}
          placeholder={"Desconto"}
          keyboardType='number-pad'
          autoCorrect={false}
          value={discountPrototype}
          onChangeText={setDiscountPrototype}
        />

          <View style={styles.uploadedImagesContainer}>
            <TouchableWithoutFeedback onPress={handleRemoveItem}>
              <View style={styles.imageContainer}>
                
                    <Image
                      source={{uri: `data:image/jpeg;base64,${base}`}}
                      style={styles.uploadedImage}
                    />
              </View>
            </TouchableWithoutFeedback>
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
    marginTop: 30,
    marginBottom: 30
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
  submitText:{
    color: '#FFF',
    fontSize: 20
  },
  uploadedImagesContainer: {
    flex:1,
    justifyContent:'center',
  },
  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 7,
    marginRight: 8,
  },
  uploadedImageText: {
    color: '#FFF',
    marginBottom: 7
  },
  imageContainer:{
    justifyContent: 'center',
    alignItems: 'center'
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
  }
});