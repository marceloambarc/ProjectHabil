import React, { useEffect, useState } from 'react';
import { View, TouchableWithoutFeedback, Text, StyleSheet, Image, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ImageZoom from 'react-native-image-pan-zoom';
import api from '../../services/api';

const splashBackgroundImage = '../../../assets/content_id.png';

import tokenCredentials from '../../services/token.json';

export default function SplashScreen(){
  const [isLoading, setIsLoading] = useState(true);
  const [img1, setImage1] = useState('');
  const [userToken, setUserToken] = useState('');
  const navigation = useNavigation();

  const params  = new URLSearchParams();

  const username = tokenCredentials.username;
  const tokenPassword = tokenCredentials.password;
  const grant_type = tokenCredentials.grant_type;

  params.append('username', `${username}`)
  params.append('password', `${tokenPassword}`)
  params.append('grant_type', `${grant_type}`)

  async function getToken() {
    const response = await api.post('token',params, {
      headers: {
        ['Content-type'] : 'application/x-www-urlencoded'
      }
    })
    setUserToken(response.data.access_token);
  }

  async function getBackgroundImage(){
    await api.get('backgrounds/9').then(response => {
      setImage1(response.data.background_image1);
      setIsLoading(false);
    }).catch(err => {
      Alert.alert(
        'Ops!',
        'Tivemos um Erro ao Carregar a Imagem.'
      );
    });
  }

  useEffect(() => {
    if(!isLoading) return;
    getToken();
    getBackgroundImage();
  },[]);

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
            source={{ uri: `data:image/jpeg;base64,${img1}`}}
            resizeMode='contain'
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