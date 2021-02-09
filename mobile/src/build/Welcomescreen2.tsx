import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';

function WelcomeHeader(){
  const navigation = useNavigation();
  return (
    <View style={styles.headerBackground}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>CompreMaisAki</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Supplier')}>
          <Feather style={styles.icon} name="menu" size={28} color="#191919" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function WelcomeScreen(){
  return (
    <SafeAreaView>
      <WelcomeHeader />
      <SearchBar 
        placeholder="Procure..."
        lightTheme
        round
        autoCorrect={true}
      />
      <View style={styles.background}>
        <View style={styles.container}>
          <View style={styles.companyImageContainer}>
            <Image 
            style={styles.companyImage}
            source={require('../../../assets/adaptive-icon.png')}
            />
          </View>
          <View style={styles.footerRow}>
            <View style={styles.footerIcons}>
              <Image 
                style={styles.footerImg1} 
                source={require('../../../assets/nsrlogo.png')}
              />
            </View>
            <View style={styles.footerIcons}>
              <Image 
                style={styles.footerImg2} 
                source={require('../../../assets/cdlicon.png')}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
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

  /* BODY */
  background: {
    backgroundColor: '#119999',
    height: '100%'
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
    width: 160,
    height: 160,
  },

  /* FOOTER */
  footerRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 90
  },
  footerIcons: {
    marginBottom: 200,
  },
  footerImg1: {
    width: 80,
    height: 80
  },
  footerImg2: {
    width: 80,
    height: 80
  }
});