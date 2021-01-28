import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, 
TouchableOpacity, StyleSheet, ScrollView, Image,
Platform, 
TouchableWithoutFeedback} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

interface EditPromotionParams {
  id: number,
  name: string,
  price: string,
  description: string,
  date: string,
  company_id: string,
  images: Array <{
    id: number;
    url: string;
  }>;
}

export default function EditProductScreen(){
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as EditPromotionParams;

  const editId = params.id;
  const editName = params.name;
  const editPrice = params.price;
  const editDescription = params.description;
  const company_id = params.company_id;
  const editImages = params.images;

  const [id, setId] = useState(`${editId}`);
  const [name, setName] = useState(`${editName}`);
  const [price, setPrice] = useState(`${editPrice}`);
  const [description, setDescription] = useState(`${editDescription}`);
  const [images, setImages] = useState<string[]>([editImages[0].url]);
  
  const today = new Date().setDate(50);
  const [date, setDate] = useState(new Date(today));

  const currentDayOfMonth = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [text] = useState('text');
  const [to] = useState('to');
  const [v] = useState('v');

  async function handleNextStepProduct() {
    const currentDayOfMonth = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    const protoDate = `${currentDayOfMonth}/${currentMonth}/${currentYear}`;
    navigation.navigate('EditProductOverview', {
      id,
      name,
      price,
      description,
      protoDate,
      company_id,
      images
    });
  }

  function ProductsHeader(){
    const navigation = useNavigation();
  
    return(
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('CompanyProducts')}>
            <Feather name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Promoção</Text>
      </View>
    );
}

  const onChange = (event: Event, selectedDate:any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode:any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

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

  async function handleRemoveItem(){
    setImages([]);
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

        <TextInput
          style={styles.input}
          placeholder={"Valor"}
          autoCorrect={false}
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

        <Text style={styles.dateSelected}>
          Vencimento: {`${currentDayOfMonth}/${currentMonth}/${currentYear}`}
        </Text>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnSubmit} onPress={showDatepicker}>
            <Text style={styles.submitText}>Selecionar Vencimento</Text>
          </TouchableOpacity>
        </View>
        <View>
          {show && (
            <DateTimePicker
            defaultDate={today}
            testID="dateTimePicker"
            value={today}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            />
          )}
        </View>

        {/*<TextInput
          style={styles.input}
          placeholder="Validade Promoção DD/MM/AAAA"
          autoCorrect={false}
          onChangeText={setDate}
        />*/}

          <View style={styles.uploadedImagesContainer}>
          {images.map(image => {
            return (
              <>
              
              
                <TouchableWithoutFeedback key={to} onPress={handleRemoveItem}>
                <View style={styles.imageContainer} key={v}>
                  <Image
                    key={image.toString()}
                    source={{ uri: image }}
                    style={styles.uploadedImage}
                  />
                  <Text style={styles.uploadedImageText} key={text}>Toque para remover.</Text>
                  </View>
                </TouchableWithoutFeedback>
              

              </>
            );
          })}
          </View>

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
  dateSelected:{
    color: '#FFF',
    fontSize: 20
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