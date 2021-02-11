import React from 'react';
import { View, TouchableWithoutFeedback, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ImageZoom from 'react-native-image-pan-zoom';

const splashBackgroundImage = '../../../assets/content_id.png';

export default function SplashScreen(){
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback style={styles.background} onPress={() => navigation.navigate('Welcome')}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          
        <ImageZoom cropWidth={420}
                    cropHeight={390}
                   imageWidth={420}
                   imageHeight={390}>
          <Image 
            style={styles.companyImage}
            source={require(splashBackgroundImage)}
          />       
        </ImageZoom>
        </View>
        <View style={styles.splashRow}>
          <View style={styles.splashTextContainer}>
              <Image 
              style={styles.welcomeLogo}
              source={require('../../../assets/cmatextlogo.png')}
            />
            <Text style={styles.splashTitle}>Bem-Vindo,</Text>
            <Text style={styles.splashText}>O app que leva as promoções de Nova Santa Rita até você.</Text>
          </View>
          <View style={styles.footer}>
            <Ionicons name="enter-outline" size={40} color="#017895" />
            <Text style={styles.iconText}>Entrar</Text>
          </View>
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
  },
  companyImage: {
    height: 420,
    width: '100%',
  },
  textImageLogo: {
    height: 50,
    width: 300,
  },
  splashTextContainer: {
    width: '70%',
    marginBottom: 10
  },
  splashTitle: {
    fontSize: 20,
    color:'darkgrey'
  },
  splashText: {
    fontSize: 18,
    color: 'silver',
    paddingBottom: 10
  },
  footer: {
    alignItems: 'center',
  },
  iconText: {
    color: '#017895'
  },
  advise: {
    alignItems: 'flex-start',
    paddingHorizontal: 40
  },
  splashAdvise: {
    color: '#ff6600',
    fontSize: 12
  },
  splashAdvise2: {
    color: '#CC5200',
    fontSize: 12
  },
  splashRow: {
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  welcomeLogo: {
    height: 40,
    width: 200
  }
});