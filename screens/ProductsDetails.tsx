import * as React from 'react';
import { View, Text, Image, StyleSheet, Animated, Switch, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

export default function ProductDetails() {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [logo] = useState(new Animated.ValueXY({x: 90, y: 90}));

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.textContainer}>

          <Text style={styles.productEspecifications}>Produto: XXXXX</Text>
          <Text style={styles.productEspecifications}>Valor: R$ XX,XX</Text>
          <Text style={styles.productEspecifications}>
            Descrição: XXXXXXX XXXXXXX XXXXXXXX
          </Text>

        </View>

        <View style={styles.containerLogo}>
          <Animated.Image
            style={{
              width: logo.x,
              height: logo.y,
            }}
            source={require('../assets/snack-icon.png')}
          />
        </View>

        <View style={styles.textContainer}>

          <Text style={styles.title}>Dados para Contato com Anunciante</Text>
          <Text style={styles.productEspecifications}>Empresa: XXXXXXX</Text>
          <Text style={styles.productEspecifications}>Endereço: XXXXXXX</Text>
          <Text style={styles.productEspecifications}>Telefones: XXXXX-XXXX</Text>
          <Text style={styles.productEspecifications}>XXXXX-XXXXX</Text>
          <Text style={styles.productEspecifications}>Email: XXXX@XXXX.COM</Text>

          <Text style={styles.switchStyles}>
            Status da Promoção: 
            <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            />
          </Text>

          <Text style={styles.productEspecifications}>Prazo de Promoção: XX/XX/XXXX</Text>

          <View style={styles.btnSided}>
            <TouchableOpacity style={styles.btnSubmit}>
              <Text style={styles.submitText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnDelete}>
              <Text style={styles.deleteText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  productEspecifications:{
    color: '#FFF',
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
    alignItems:'center',
    justifyContent: 'center'
  },
  containerLogo:{
    flex:1,
    justifyContent:'center',
    padding: 20
  },
  title:{
    color: '#FFF',
    fontSize: 20,
  },
  switchStyles:{
    color: '#FFF',
    marginBottom: 10,
    marginTop: 15
  },
  btnSided:{
    flex: 1,
    width:'90%'
  },
  btnSubmit:{
    backgroundColor: '#35AAFF',
    width: '30%',
    height: 45,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7
  },
  submitText:{
    color: '#FFF',
    fontSize: 18
  },
  btnDelete:{
    backgroundColor: '#dc3545',
    width: '50%',
    height: 45,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7
  },
  deleteText:{
    color: '#FFF',
    fontSize: 18
  }
});