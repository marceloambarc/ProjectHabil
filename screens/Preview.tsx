import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

export default function Preview({ navigation }){

  const [logo] = useState(new Animated.ValueXY({x: 90, y: 90}));

  const promotionHandler = () => {
    navigation.navigate('RegisterPromotion');
  }

  const viewPromotions = () => {
    navigation.navigate('ViewPromotions');
  }

  return(
    <View style={styles.background}>
      <View style={styles.container}>

        <View style={styles.textContainer}>
          <Text style={styles.preview}>Produto: XXXXX</Text>
          <Text style={styles.preview}>Valor: R$ XX,XX</Text>
          <Text style={styles.preview}>
            Descrição: XXXXXXX
                      XXXXXXX
                      XXXXXXXX
          </Text>
        </View>
        
        <View style={styles.containerLogo}>
          <Animated.Image
          style={{
            width: logo.x,
            height: logo.y
          }}
          source={require('../assets/snack-icon.png')}
          />
        </View>

        <TouchableOpacity style={styles.btnSubmit} onPress={promotionHandler}>
          <Text style={styles.submitText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnComplete} onPress={viewPromotions}>
          <Text style={styles.submitText}>Enviar</Text>
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
  textContainer:{
    alignItems: 'flex-start',
    width:'80%'
  },
  containerLogo:{
    flex:1,
    justifyContent:'center',
  },
  preview:{
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    alignItems:'center',
    justifyContent: 'center'
  },
  submitText:{
    color: '#FFF',
    fontSize: 18
  },
  btnSubmit:{
    backgroundColor: '#35AAFF',
    width:'90%',
    marginBottom: 15,
    color:'#222',
    fontSize: 17,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:7,
    padding:10
  },
  btnComplete:{
    backgroundColor: '#28a745',
    width:'90%',
    marginBottom: 15,
    color:'#222',
    fontSize: 17,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:7,
    padding:10
  }
});s