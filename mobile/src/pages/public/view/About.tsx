import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity,
TouchableWithoutFeedback, Linking, StyleSheet } from 'react-native';
import { Feather, Ionicons, Entypo } from '@expo/vector-icons';


function handleWhatsLucas() {
  Linking.openURL("https://api.whatsapp.com/send?phone=555196215684&text=%20Olá%20Lucas!%20")
}

function handleWhtasMarcio() {
  Linking.openURL("https://api.whatsapp.com/send?phone=555196156020&text=%20Olá%20Márcio!%20")
}

function handleHabilSite() {
  Linking.openURL("http://www.habilinformatica.com.br")
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
                <TouchableOpacity style={styles.btnSupplierContact} onPress={handleWhtasMarcio}>
                  <Ionicons name="logo-whatsapp" size={30} color="#FFF" />
                </TouchableOpacity>
              </View>
  
            </View>
            <TouchableWithoutFeedback onPress={handleHabilSite}>
              <Text style={styles.visitText}>Visite nosso Site <Entypo name="controller-next" size={24} color="black" /></Text>
            </TouchableWithoutFeedback>
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
  aboutText: {
    fontSize: 18,
    color: "grey"
  },
  visitText: {
    marginTop: 70,
    fontSize: 25,
    color: '#191919'
  },
  habilContactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 31,
    paddingLeft: 31,
    marginBottom: '40%'
  },
  habilContactCol: {
    alignItems: 'center'
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
});