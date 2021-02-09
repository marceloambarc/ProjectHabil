import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, 
Linking, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Feather, Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from '../client/LoginScreen';
import RegisterScreen from '../client/RegisterScreen';

function About({ navigation }:{ navigation:any }) {
  return (
    <SafeAreaView>
      <View style={styles.headerBackground}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>CompreMaisAki</Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Feather style={styles.icon} name="menu" size={28} color="#191919" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.aboutContainer}>
        <View style={styles.habilLogoContainer}>
          <Image 
            source={require("../../../assets/habillogo.png")}
            style={styles.habilImage}
          />
        </View>
        <View style={styles.aboutTextContainer}>
          <Text style={styles.aboutText}>Oferecemos as facilidades e de toda segurança e confiabilidade de uma empresa que está há mais de 30 anos no mercado.</Text>
          <TouchableOpacity onPress={() => Linking.openURL("http://www.habilinformatica.com.br")}>
            <Text style={styles.visitText}>Visite nosso Site <Entypo name="controller-next" size={24} color="black" /></Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function WelcomeScreen({ navigation }:{ navigation:any }){
  const [search, setSearch] = useState('');
  return (
    <SafeAreaView>
      <View style={styles.headerBackground}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>CompreMaisAki</Text>
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
          <TouchableOpacity style={styles.searchBtn}>
            <Feather name="search" size={20} color="white" />
            <Text style={styles.searchBtnText}>Procurar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.background}>
        <View style={styles.container}>
            <TouchableHighlight style={styles.companyImageContainer} onPress={() => Linking.openURL("https://www.google.com/search?rlz=1C1CHBF_enBR866BR866&sxsrf=ALeKk030DPJvg9DthHm-93J6dOGCTrPIKg%3A1612875174528&ei=poUiYIfVH6Kf5OUPtu-0sAU&q=Compre+mais+Aki&oq=Compre+mais+Aki&gs_lcp=CgZwc3ktYWIQAzIICAAQCBANEB4yCAgAEA0QBRAeMggIABAIEA0QHjIKCAAQCBANEAoQHjoECCMQJzoFCAAQkQI6AggAOggILhDHARCjAjoECAAQQzoCCC46BAgAEAo6BQgAEMsBOgsILhDHARCvARDLAToHCAAQChDLAToNCC4QxwEQrwEQChDLAToFCCEQoAE6BAghEBVQ-KABWOTAAWCtyQFoAXAAeACAAc0CiAGQGJIBCDAuMTMuMy4xmAEAoAEBqgEHZ3dzLXdpesABAQ&sclient=psy-ab&ved=0ahUKEwiHwOCe7NzuAhWiD7kGHbY3DVYQ4dUDCA0&uact=5")}>
              <Image 
              style={styles.companyImage}
              source={require('../../../assets/cmalogo.png')}
              />
            </TouchableHighlight>
          <View style={styles.footerRow}>
            <View style={styles.footerIcons}>
              <View style={styles.footerIconsRow}>
                <TouchableWithoutFeedback onPress={() => Linking.openURL("https://www.google.com/search?rlz=1C1CHBF_enBR866BR866&sxsrf=ALeKk039WUtwOM42f2y26VlRa-yYm09X7Q%3A1612875125305&ei=dYUiYM6mEte35OUP89Wr6Ac&q=Nova+Santa+Rita&oq=Nova+Santa+Rita&gs_lcp=CgZwc3ktYWIQAzIECCMQJzIECCMQJzIFCC4QywEyBQgAEMsBMgUIABDLATIFCAAQywEyBQgAEMsBMgUIABDLATIFCAAQywEyBQgAEMsBOgcIIxCwAxAnOggILhCwAxDLAToICAAQsAMQywE6BwgjELACECc6BAguEA06BggAEA0QHlDBCljNH2CqImgBcAB4AIAB2AKIAdIIkgEHMC4zLjAuMpgBAKABAaoBB2d3cy13aXrIAQrAAQE&sclient=psy-ab&ved=0ahUKEwiOtaSH7NzuAhXXG7kGHfPqCn0Q4dUDCA0&uact=5")}>
                  <Image 
                  style={styles.footerImg1} 
                  source={require('../../../assets/nsrlogo.png')}
                  />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => Linking.openURL("https://www.google.com/search?rlz=1C1CHBF_enBR866BR866&sxsrf=ALeKk01NyYXGF_oGFpqRuWpf8EpIOLZgoA%3A1612875201703&ei=wYUiYMmsKt675OUPsPmCuA0&q=Sala+do+Empreeendedor+Nova+Santa+Rita&oq=Sala+do+Empreeendedor+Nova+Santa+Rita&gs_lcp=CgZwc3ktYWIQAzIHCCMQsAIQJzIGCAAQFhAeOgsIABCwAxAIEA0QHjoLCAAQsAMQDRAFEB46DQgAELADEAgQDRAKEB46BAgjECc6BQguEJECOgUIABCRAjoCCAA6CAguEMcBEKMCOgoILhDHARCvARAnOgoILhDHARCjAhBDOgQILhBDOgIILjoHCCMQ6gIQJzoFCAAQyQM6BQgAEMsBOgsILhDHARCvARDLAToFCC4QywE6BAgAEA06CgguEMcBEK8BEA06BggAEA0QHlDK8wFY8-sCYLLtAmgJcAB4AIAB2AGIAYQ7kgEGMC4zNy43mAEAoAEBqgEHZ3dzLXdperABCsgBBMABAQ&sclient=psy-ab&ved=0ahUKEwiJkdur7NzuAhXeHbkGHbC8ANcQ4dUDCA0&uact=5")}>
                  <Image 
                  style={styles.footerImg1} 
                  source={require('../../../assets/sdelogo.png')}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
            <TouchableWithoutFeedback style={styles.footerIcons} onPress={() => Linking.openURL("https://www.google.com/search?rlz=1C1CHBF_enBR866BR866&sxsrf=ALeKk02s-QyUrqw94FNDss2vmX01tlVekA%3A1612875132271&ei=fIUiYID2D_2_5OUPko-p-AQ&q=CDL+Nova+Santa+Rita&oq=CDL+Nova+Santa+Rita&gs_lcp=CgZwc3ktYWIQAzIECCMQJzoHCCMQsAMQJzoICC4QsAMQywE6CAgAELADEMsBOgcIIxCwAhAnOgQILhANOgYIABAHEB46BggAEA0QHlDdnwJYyboCYLS-AmgFcAB4AIABtQSIAbAQkgELMC41LjIuMS4wLjGYAQCgAQGqAQdnd3Mtd2l6yAEKwAEB&sclient=psy-ab&ved=0ahUKEwiApM2K7NzuAhX9H7kGHZJHCk8Q4dUDCA0&uact=5")}>
              <Image 
                style={styles.footerImg2} 
                source={require('../../../assets/cdlicon.png')}
              />
            </TouchableWithoutFeedback>
          </View>
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
      overlayColor="#017895 ">
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
  headerText: {
    marginLeft: 10,
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
    height: '100%',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
  },
  companyImageContainer: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  companyImage: {
    height: 130,
    width: 320
  },

  /* FOOTER */
  footerRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 40
  },
  footerIcons: {
    marginBottom: 200,
  },
  footerImg1: {
    width: 90,
    height: 90
  },
  footerImg2: {
    width: 90,
    height: 90
  },
  footerIconsRow: {
    flexDirection: 'row',
    paddingRight: 20
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
  }
});