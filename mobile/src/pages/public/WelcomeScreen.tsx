import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, 
Linking, TouchableHighlight } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ImageZoom from 'react-native-image-pan-zoom';

import LoginScreen from '../client/LoginScreen';
import RegisterScreen from '../client/RegisterScreen';
import About from './view/About';

const welcomeBackgroundImage = "../../../assets/content_id.png";

function WelcomeScreen({ navigation }:{ navigation:any }){
  const [search, setSearch] = useState('');
  return (
    <SafeAreaView>
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
      <View style={styles.searchRow}>
        <View style={styles.searchBarContainer}>
          <SearchBar 
            style={styles.searchBar}
            placeholder="Procure Aki as promoções..."
            lightTheme
            round
            autoCorrect={true}
            onChangeText={setSearch}
            value={search}
          />
        </View>
        <View style={styles.searchBtnContainer}>
          <TouchableOpacity style={styles.searchBtn} onPress={() => navigation.navigate('Supplier')}>
            <Feather name="search" size={20} color="white" />
            <Text style={styles.searchBtnText}>Procurar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.background}>
        <View style={styles.container}>
            <TouchableHighlight style={styles.companyImageContainer} onPress={() => Linking.openURL("https://www.google.com/search?rlz=1C1CHBF_enBR866BR866&sxsrf=ALeKk030DPJvg9DthHm-93J6dOGCTrPIKg%3A1612875174528&ei=poUiYIfVH6Kf5OUPtu-0sAU&q=Compre+mais+Aki&oq=Compre+mais+Aki&gs_lcp=CgZwc3ktYWIQAzIICAAQCBANEB4yCAgAEA0QBRAeMggIABAIEA0QHjIKCAAQCBANEAoQHjoECCMQJzoFCAAQkQI6AggAOggILhDHARCjAjoECAAQQzoCCC46BAgAEAo6BQgAEMsBOgsILhDHARCvARDLAToHCAAQChDLAToNCC4QxwEQrwEQChDLAToFCCEQoAE6BAghEBVQ-KABWOTAAWCtyQFoAXAAeACAAc0CiAGQGJIBCDAuMTMuMy4xmAEAoAEBqgEHZ3dzLXdpesABAQ&sclient=psy-ab&ved=0ahUKEwiHwOCe7NzuAhWiD7kGHbY3DVYQ4dUDCA0&uact=5")}>
              <ImageZoom cropWidth={420}
                        cropHeight={390}
                        imageWidth={420}
                        imageHeight={390}>
                <Image 
                  style={styles.companyImage}
                  source={require(welcomeBackgroundImage)}
                />       
              </ImageZoom>
            </TouchableHighlight>
          </View>
        </View>
    </SafeAreaView>
  );
}


export default function SplashScreen() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Início"
      overlayColor="#017895">
      <Drawer.Screen name="Início" component={WelcomeScreen} />
      <Drawer.Screen name="Fornecedores" component={LoginScreen} />
      <Drawer.Screen name="Cadastre-se" component={RegisterScreen} />
      <Drawer.Screen name="Desenvolvido por" component={About} />
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
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  cmaLogo: {
    height: 20,
    width: 100,
    marginLeft: 10
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
    marginTop: '25%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  companyImageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  companyImage: {
    height: 420,
    width: '100%',
  },
});