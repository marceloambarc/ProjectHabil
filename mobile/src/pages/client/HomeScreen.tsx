import * as React from 'react';
import { useState } from 'react';

import { View, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function HomeScreen(){
  const navigation = useNavigation();
  const [logo] = useState(new Animated.ValueXY({x: 90, y: 90}));

  return(
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo "USUÁRIO"</Text>

        <View style={styles.containerLogo}>
          <Animated.Image
              style={{
              width: logo.x,
              height: logo.y
            }}
            source={require('../../assets/icons/adaptive-icon.png')}
          />
        </View>

        <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.navigate('CompanyProducts')}>
          <Text style={styles.submitText}>Visualizar minhas promoções</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnNew} onPress={() => navigation.navigate('NewPromotion')}>
          <Text style={styles.submitText}>Cadastrar promoções</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background:{
    backgroundColor: '#191919',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width: '90%',
    paddingTop: 20
  },
  title:{
    fontSize: 20,
    color: '#FFF',
    marginTop: 20
  },
  containerLogo:{
    flex:1,
    justifyContent:'center',
  },
  btnSubmit:{
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: 20
  },
  submitText:{
    color: '#FFF',
    fontSize: 18
  },
  btnNew:{
    backgroundColor: '#52D984',
    width: '90%',
    height: 45,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: 70
  }
});