import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, 
TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface NewPromotionParams {
  companyId: string,
}

export default function NewPromotionScreen(){
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [base, setBase] = useState('');

  const [image, setImage] = useState<string>('');

  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as NewPromotionParams;

  const company_id = params.companyId;

  async function handleNextStepProduct() {
    navigation.navigate('NewPromotionOverview', {
      name,
      price,
      description,
      company_id,
      image,
      discount,
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

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Precisamos de acesso a images');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });

    if (result.cancelled) {
      return;
    }

    const { uri: image } = result;
    const { base64: imageBase } = result;

    setBase(imageBase!);
    setImage(image);
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
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder={"Valor"}
          autoCorrect={false}
          onChangeText={setPrice}
        />

        <TextInput
          style={styles.inputDescription}
          textAlignVertical='top'
          multiline={true}
          autoCapitalize='sentences'
          placeholder="Descrição"
          autoCorrect={false}
          onChangeText={setDescription}
        />

        <View style={styles.uploadedImagesContainer}>
      
              <Image
                source={{uri: image !== ""? image : undefined}}
                style={styles.uploadedImage}
              />
  
        </View>

        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder={"Desconto"}
          autoCorrect={false}
          onChangeText={setDiscount}
        />

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnSubmit} onPress={handleSelectImages}>
            <Text style={styles.submitText}>Selecionar Foto</Text>
          </TouchableOpacity>

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
    flexDirection: 'row',
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