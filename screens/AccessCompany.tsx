import * as React from 'react';
import { View, Text, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function AccessCompany({ navigation }){

  const viewPromotionHandler = () => {
    navigation.navigate('ViewPromotions');
  }

  const registerPromotionHandler = () => {
    navigation.navigate('RegisterPromotion');
  }

  const [logo] = useState(new Animated.ValueXY({x: 60, y: 60}));

  return(
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-Vindo user</Text>
        <Text style={styles.about}>Cadastro de Promoções</Text>
        <View style={styles.containerLogo}>
          <Animated.Image
          style={{
            width: logo.x,
            height: logo.y
          }}
          source={require('../assets/snack-icon.png')}
          />
        </View>

        <TouchableOpacity style={styles.btnSubmit} onPress={viewPromotionHandler}>
          <Text style={styles.submitText}>Visualizar minhas Promoções</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSubmit} onPress={registerPromotionHandler}>
          <Text style={styles.submitText}>Cadastrar Promoções</Text>
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
    paddingTop: 50
  },
  title:{
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    alignItems:'center',
    justifyContent: 'center'
  },
  about:{
    color: '#FFF',
    fontSize: 16,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerLogo:{
    flex:1,
    justifyContent:'center',
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
  submitText:{
    color: '#FFF',
    fontSize: 18
  }
});