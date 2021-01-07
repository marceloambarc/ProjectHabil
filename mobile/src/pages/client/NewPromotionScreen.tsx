import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, 
TouchableOpacity, StyleSheet, ScrollView, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';

export default function NewPromotionScreen(){
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const navigation = useNavigation();

  async function handleCreateProduct() {
    const data = new FormData();

    data.append('name', name);
    data.append('price', price);
    data.append('description', description);
    data.append('date', date);

    images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: `image/jpg`,
        uri: image,
      } as any)
    })

    await api.post('products', data)

    navigation.navigate('CompanyProducts');
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Precisamos de acesso a images');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri: image } = result;

    setImages([...images, image]);
  }

  return(
    <ScrollView style={{ backgroundColor: '#191919' }}>
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo "USER"</Text>
        <Text style={styles.subTitle}>Cadastrar Promoção</Text>

        <TextInput
          style={styles.input}
          placeholder="Produto"
          autoCorrect={false}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Valor"
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

        <TextInput
          style={styles.input}
          placeholder="Data"
          autoCorrect={false}
          onChangeText={setDate}
        />

        <View style={styles.uploadedImagesContainer}>
          {images.map(image => {
            return (
              <Image 
                key={image}
                source={{ uri: image }}
                style={styles.uploadedImage}
              />
            );
          })}
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnSubmit} onPress={handleSelectImages}>
            <Text style={styles.submitText}>Selecionar Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSubmit} onPress={handleCreateProduct}>
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
    marginBottom: 32,
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
});