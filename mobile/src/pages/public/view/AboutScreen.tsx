import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity,
Linking, StyleSheet, Dimensions } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


function handleWhatsLucas() {
  Linking.openURL(`https://api.whatsapp.com/send?phone=555196215684&text=Olá%20Lucas!%20Venho%20Através%20do%20Aplicativo%20CompreMaisAki`)
}

function handleWhatsMarcio() {
  Linking.openURL(`https://api.whatsapp.com/send?phone=555196156020&text=Olá%20Márcio!%20Venho%20Através%20do%20Aplicativo%20CompreMaisAki`)
}

function handleHabilSite() {
  Linking.openURL(`http://www.habilinformatica.com.br/`)
}

export default function About({navigation}:{navigation:any}) {
    return (
      <SafeAreaView>
        <View style={styles.headerBackground}>
          <View style={styles.headerContainer}>
            <Image
              style={styles.cmaLogo}
              source={require("../../../../assets/cmatextlogo.png")}
            />
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Feather style={styles.icon} name="menu" size={28} color="#191919" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.aboutContainer}>
          <View style={styles.habilLogoContainer}>
            <Image 
              source={require("../../../../assets/habillogo.png")}
              style={styles.habilImage}
            />
          </View>
          <View style={styles.aboutTextContainer}>
            <View style={styles.habilContactRow}>

              <View style={styles.habilContactCol}>
                <Text style={styles.contactName}>Lucas</Text>
                <TouchableOpacity style={styles.btnSupplierContact} onPress={handleWhatsLucas}>
                  <Ionicons name="logo-whatsapp" size={30} color="#FFF" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.habilContactCol}>
                <Text style={styles.contactName}>Márcio</Text>
                <TouchableOpacity style={styles.btnSupplierContact} onPress={handleWhatsMarcio}>
                  <Ionicons name="logo-whatsapp" size={30} color="#FFF" />
                </TouchableOpacity>
              </View>
  
            </View>
            <View style={styles.habilSiteContainer}>
                <Text style={styles.contactName}>Visite nosso Site</Text>
                <TouchableOpacity style={styles.btnSupplierSite} onPress={handleHabilSite}>
                  <MaterialCommunityIcons name="web" size={24} color="#FFF" />
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  /*HEADER*/
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

  /*ABOUT*/
  aboutContainer:{
    padding: 10,
    alignItems: 'center'
  },
  habilLogoContainer: {
    paddingTop: 100
  },
  habilImage: {
    height: 200,
    width: 180
  },
  aboutTextContainer: {
    paddingLeft: 70,
    paddingRight: 70,
    marginTop: 70,
    flex: 1
  },
  visitText: {
    marginTop: 70,
    fontSize: Dimensions.get('window').width * .053,
    color: 'black'
  },
  habilContactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 31,
    paddingLeft: 31,
    marginBottom: '40%'
  },
  habilContactCol: {
    alignItems: 'center',
    paddingHorizontal: Dimensions.get('window').width * 0.07,
    paddingVertical: Dimensions.get('window').height * 0.001
  },
  habilSiteContainer: {
    alignItems: 'center',
    paddingTop: Dimensions.get('window').height * 0.03
  },
  contactName: {
    fontSize: 20,
    marginBottom: 5,
    color: '#017895'
  },  
  btnSupplierContact:{
    borderRadius: 40,
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25d366'
  },
  btnSupplierSite:{
    borderRadius: 40,
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D42E26'
  },
  buttonSite: {
    backgroundColor: "black"
  }
});