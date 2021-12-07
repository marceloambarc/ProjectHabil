import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image,
TouchableWithoutFeedback, Alert, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ImageZoom from 'react-native-image-pan-zoom';
import api from '../../services/api';

import MainPath from '../../../src/pages/client/routes';

import RegisterScreen from '../client/RegisterScreen';
import SuportScreen from './view/SupportScreen';
import About from './view/AboutScreen';

function WelcomeScreen({ navigation }:{ navigation:any }){
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [base] = useState('data:image/png;base64');
  const [img2, setImage2] = useState('');

  async function getBackgroundImage(){
    await api.get('backgrounds/9').then(response => {
      setImage2(response.data.background_image2);
      setIsLoading(false);
    }).catch(err => {
      Alert.alert(
        'Ops!',
        'Tivemos um erro ao carregar a Imagem'
      );
    });
  }

  useEffect(() => {
    if(isLoading) return;
    setIsLoading(true);

    getBackgroundImage();
  },[])

  async function handleSearchTerm(){
    const searchTerm = search;
    navigation.navigate('Supplier',{
      searchTerm
    });
  }

  function WelcomeHeader(){
    return(
      <View style={styles.headerBackground}>
        <View style={styles.headerContainer}>
          <Image
          style={styles.cmaLogo}
            source={require("../../../assets/cmatextlogo.png")}
          />
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Feather style={styles.icon} name="menu" size={28} color="#191919" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
 
  return (
    <SafeAreaView>
      <WelcomeHeader />
      <View style={styles.searchRow}>
        <View style={styles.searchBarContainer}>
          <SearchBar 
            style={styles.searchBar}
            placeholder="Procure Aki as promoções..."
            lightTheme
            round
            onChangeText={(text) => setSearch(text)}
            value={search}
          />
        </View>
        <View style={styles.searchBtnContainer}>
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearchTerm}>
            <Feather name="search" size={20} color="white" />
            <Text style={styles.searchBtnText}>Procurar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.background}>
        <View style={styles.container}>
          <TouchableWithoutFeedback style={styles.companyImageContainer}>
            <ImageZoom cropWidth={420}
                      cropHeight={390}
                      imageWidth={420}
                      imageHeight={390}>
              <Image 
                style={styles.companyImage}
                source={{ uri: `${base},${img2}` }}
                resizeMode='contain'
              />       
            </ImageZoom>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function DrawerRoute() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Início"
      overlayColor="#017895">
      <Drawer.Screen name="Início" component={WelcomeScreen} />
      <Drawer.Screen name="Fornecedores" component={MainPath} />
      <Drawer.Screen name="Cadastre-se" component={RegisterScreen} />
      <Drawer.Screen name="Desenvolvido por" component={About} />
      <Drawer.Screen name="Suporte" component={SuportScreen} />
    </Drawer.Navigator>
  );
}

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
  cmaLogo: {
    height: 20,
    width: 100,
    marginLeft: 10,
    marginTop: 5,
  },
  icon: {
    marginRight: 10
  },
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

  /* BODY */
  background: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  container: {
    marginBottom: Dimensions.get('window').height * .7,
    height: Dimensions.get('window').height * 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  companyImageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  companyImage: {
    height: Dimensions.get('window').height * 0.4,
    width: '100%',
  },
});