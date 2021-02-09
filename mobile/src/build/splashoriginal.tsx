import React from 'react';
import { View, TouchableWithoutFeedback, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

export default function SplashScreen(){
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback style={styles.background} onPress={() => navigation.navigate('Welcome')}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            style={styles.companyImage}
            source={require('../../../assets/adaptive-icon.png')}
          />
          <Image 
            style={styles.textImageLogo}
            source={require('../../../assets/cmatextlogo.png')}
          />
        </View>
        <View style={styles.splashTextContainer}>
          <Text style={styles.splashTitle}>Bem-Vindo,</Text>
          <Text style={styles.splashText}>O app que leva as promoções de Nova Santa Rita até você.</Text>
        </View>
        <View style={styles.footer}>
          <Ionicons name="enter-outline" size={40} color="#017895" />
          <Text style={styles.iconText}>Entrar</Text>
        </View>
        <View style={styles.advise}>
          <Text style={styles.splashAdvise}>Digite na pesquisa os termos que você deseja.</Text>
          <Text style={styles.splashAdvise2}>Se deseja anunciar produtos/serviço entre no menu superior.</Text>
        </View>
      </View>

    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'whitesmoke',
    flex: 1
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 70,
  },
  companyImage: {
    height: 124,
    width: 124,
  },
  textImageLogo: {
    height: 50,
    width: 300,
  },
  splashTextContainer: {
    width: '70%',
    marginBottom: 25
  },
  splashTitle: {
    fontSize: 40
  },
  splashText: {
    fontSize: 25
  },
  footer: {
    alignItems: 'center',
    marginTop: 30
  },
  iconText: {
    color: '#017895'
  },
  advise: {
    marginTop:50,
    maxWidth: '70%',
  },
  splashAdvise: {
    color: '#ff6600',
    fontSize: 12
  },
  splashAdvise2: {
    color: '#CC5200',
    fontSize: 12
  }
});