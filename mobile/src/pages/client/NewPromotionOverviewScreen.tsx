import * as React from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function NewPromotionOverviewScreen(){
  const navigation = useNavigation();

  return(
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.productTitle}>Produto: Motorola One</Text>
            <Text style={styles.productTitle}>Valor: R$ 1614,15</Text>
          </View>
          <Text style={styles.productText}>Descrição: A família Motorola One possui 
                recursos inovadores, bateria para todo o dia, 
                tela com experiência imersiva, design exclusivo, 
                câmeras para fotos incríveis e armazenamento rápido 
                para guardar fotos, vídeos, músicas e muito mais. 
                Com os smartphones da linha Motorola One você desfruta 
                de experiências incríveis e não perde nenhum momento.
          </Text>
        </View>

        <View style={styles.productImageContainer}>
          <Image
            style={styles.productImage}
            source={require('../../assets/images/one-fusion-branco.jpg')}
          />
        </View>

        <TouchableOpacity style={styles.btnEdit} onPress={() => navigation.navigate('NewPromotion')}>
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.navigate('Main')}>
          <Text style={styles.btnText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#191919'
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width: '90%',
    paddingTop: 20
  },
  titleContainer:{
    marginBottom: 30
  },
  textContainer:{
    padding: 30,
    alignContent: 'flex-start'
  },
  productTitle:{
    color: '#FFF',
    fontSize:20,
  },
  productText: {
    color: '#D3D3D3',
    fontSize:18
  },
  productImageContainer:{
    flex:1,
    justifyContent:'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 32,
  },
  btnEdit:{
    backgroundColor: 'gold',
    width:'90%',
    marginBottom: 20,
    color:'#222',
    fontSize: 17,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:7,
    padding:10
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
  btnText:{
    color: '#FFF',
    fontSize: 20
  },
})